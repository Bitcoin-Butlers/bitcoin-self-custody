#!/usr/bin/env python3
"""
SeedSigner Web Emulator Server

Serves the emulator UI and streams display frames via WebSocket.
Run: python3 server.py
Open: http://localhost:8888
"""

import asyncio
import json
import os
import sys
import threading
import time
from pathlib import Path

# Add SeedSigner source to path
SCRIPT_DIR = Path(__file__).parent.resolve()
SEEDSIGNER_SRC = SCRIPT_DIR.parent / "seedsigner-emu" / "seedsigner" / "src"
sys.path.insert(0, str(SEEDSIGNER_SRC))

# Patches are applied by setup.sh via patches/apply.py
# If running directly, ensure patches were applied first

try:
    import websockets
    from websockets.asyncio.server import serve
except ImportError:
    print("Installing websockets...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "websockets"])
    import websockets
    from websockets.asyncio.server import serve

try:
    from aiohttp import web
except ImportError:
    print("Installing aiohttp...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "aiohttp"])
    from aiohttp import web


HTML_PAGE = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>SeedSigner Emulator</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0a;
    color: #f5f5f5;
    font-family: system-ui, -apple-system, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  h1 {
    font-size: 1.2rem;
    color: #FBDC7B;
    margin-bottom: 1rem;
    text-align: center;
  }
  .emulator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
  .device {
    background: #1a1a1a;
    border: 2px solid #333;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  #screen {
    border: 2px solid #444;
    border-radius: 4px;
    image-rendering: pixelated;
  }
  .controls {
    display: flex;
    gap: 2rem;
    align-items: center;
  }
  .dpad {
    display: grid;
    grid-template-columns: 40px 40px 40px;
    grid-template-rows: 40px 40px 40px;
    gap: 2px;
  }
  .dpad button {
    width: 40px;
    height: 40px;
    border: 1px solid #555;
    border-radius: 6px;
    background: #2a2a2a;
    color: #f5f5f5;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dpad button:hover { background: #3a3a3a; }
  .dpad button:active, .dpad button.pressed { background: #FBDC7B; color: #000; }
  .dpad .empty { border: none; background: transparent; cursor: default; pointer-events: none; }
  .side-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .side-buttons button {
    width: 50px;
    height: 36px;
    border: 1px solid #555;
    border-radius: 6px;
    background: #2a2a2a;
    color: #f5f5f5;
    font-size: 0.9rem;
    cursor: pointer;
  }
  .side-buttons button:hover { background: #3a3a3a; }
  .side-buttons button:active, .side-buttons button.pressed { background: #FBDC7B; color: #000; }
  .hint {
    color: #666;
    font-size: 0.8rem;
    text-align: center;
    max-width: 400px;
  }
  .status {
    font-size: 0.75rem;
    color: #444;
  }
  .status.connected { color: #10B981; }
  a { color: #FBDC7B; }
  .toolbar {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
  .toolbar button {
    background: #2a2a2a;
    border: 1px solid #444;
    border-radius: 6px;
    color: #999;
    font-size: 0.75rem;
    padding: 4px 10px;
    cursor: pointer;
  }
  .toolbar button:hover { background: #3a3a3a; color: #f5f5f5; }
  .overlay {
    position: absolute;
    top: 0; left: 0;
    width: 240px; height: 240px;
    background: rgba(0,0,0,0.88);
    display: none;
    flex-direction: column;
    justify-content: center;
    padding: 16px;
    font-size: 0.75rem;
    line-height: 1.8;
    z-index: 10;
    border-radius: 4px;
  }
  .overlay.visible { display: flex; }
  .overlay kbd {
    background: #333;
    border: 1px solid #555;
    border-radius: 3px;
    padding: 1px 5px;
    font-family: monospace;
    font-size: 0.7rem;
    color: #FBDC7B;
  }
  .device { position: relative; }
  .camera-container {
    position: relative;
    width: 240px;
    height: 180px;
    border: 1px solid #333;
    border-radius: 8px;
    overflow: hidden;
    display: none;
  }
  .camera-container.active { display: block; }
  .camera-container video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .camera-label {
    position: absolute;
    bottom: 4px;
    left: 8px;
    font-size: 0.65rem;
    color: #10B981;
    background: rgba(0,0,0,0.7);
    padding: 2px 6px;
    border-radius: 4px;
  }
</style>
</head>
<body>
<div class="emulator">
  <h1>SeedSigner Emulator</h1>
  <div class="device">
    <canvas id="screen" width="240" height="240"></canvas>
    <div class="overlay" id="help-overlay">
      <div><kbd>↑</kbd> <kbd>↓</kbd> <kbd>←</kbd> <kbd>→</kbd> Navigate</div>
      <div><kbd>Enter</kbd> Select</div>
      <div><kbd>1</kbd> Key 1 (top)</div>
      <div><kbd>2</kbd> Key 2 (middle)</div>
      <div><kbd>3</kbd> Key 3 (bottom)</div>
      <div style="margin-top:8px;color:#666">Press <kbd>?</kbd> to close</div>
    </div>
    <div class="controls">
      <div class="dpad">
        <div class="empty"></div>
        <button id="btn-up">&#9650;</button>
        <div class="empty"></div>
        <button id="btn-left">&#9664;</button>
        <button id="btn-enter">OK</button>
        <button id="btn-right">&#9654;</button>
        <div class="empty"></div>
        <button id="btn-down">&#9660;</button>
        <div class="empty"></div>
      </div>
      <div class="side-buttons">
        <button id="btn-1">1</button>
        <button id="btn-2">2</button>
        <button id="btn-3">3</button>
      </div>
    </div>
  </div>
  <div class="camera-container" id="camera-container">
    <video id="camera" autoplay playsinline muted></video>
    <canvas id="camera-canvas" style="display:none"></canvas>
    <span class="camera-label">📷 Camera active</span>
  </div>
  <div class="toolbar">
    <button id="btn-help" title="Keyboard shortcuts">? Help</button>
    <button id="btn-fullscreen" title="Fullscreen">⛶ Fullscreen</button>
  </div>
  <p class="status" id="status">Connecting...</p>
  <p class="hint" style="margin-top: 1rem;">
    <a href="https://github.com/Bitcoin-Butlers/bitcoin-self-custody" target="_blank">Bitcoin Self-Custody Docs</a>
    &middot; Powered by <a href="https://bitcoinbutlers.com" target="_blank">Bitcoin Butlers</a>
  </p>
</div>

<script>
const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
const status = document.getElementById('status');

let ws;
let reconnectTimer;

function connect() {
  ws = new WebSocket(`ws://${location.hostname}:8889`);

  ws.onopen = () => {
    status.textContent = 'Connected';
    status.className = 'status connected';
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'frame') {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, 240, 240);
      img.src = 'data:image/png;base64,' + data.data;
    } else if (data.type === 'camera_status') {
      if (data.active && !cameraWasActive) {
        cameraWasActive = true;
        startCamera();
      } else if (!data.active && cameraWasActive) {
        cameraWasActive = false;
        stopCamera();
      }
    }
  };

  ws.onclose = () => {
    status.textContent = 'Disconnected. Reconnecting...';
    status.className = 'status';
    reconnectTimer = setTimeout(connect, 2000);
  };

  ws.onerror = () => ws.close();
}

function sendKey(key) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'key', key }));
  }
}

// Help overlay
const helpOverlay = document.getElementById('help-overlay');
function toggleHelp() { helpOverlay.classList.toggle('visible'); }
document.getElementById('btn-help').addEventListener('click', toggleHelp);

// Fullscreen
document.getElementById('btn-fullscreen').addEventListener('click', () => {
  const el = document.querySelector('.emulator');
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  }
});
// Hide fullscreen button if not supported
if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled) {
  document.getElementById('btn-fullscreen').style.display = 'none';
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === '?') { toggleHelp(); return; }
  const validKeys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','1','2','3'];
  if (validKeys.includes(e.key)) {
    e.preventDefault();
    sendKey(e.key);
  }
});

// Button controls (mouse + touch)
const btnMap = {
  'btn-up': 'ArrowUp',
  'btn-down': 'ArrowDown',
  'btn-left': 'ArrowLeft',
  'btn-right': 'ArrowRight',
  'btn-enter': 'Enter',
  'btn-1': '1',
  'btn-2': '2',
  'btn-3': '3',
};
for (const [id, key] of Object.entries(btnMap)) {
  const btn = document.getElementById(id);
  btn.addEventListener('mousedown', () => sendKey(key));
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    btn.classList.add('pressed');
    sendKey(key);
  });
  btn.addEventListener('touchend', () => btn.classList.remove('pressed'));
}

// Loading state
ctx.fillStyle = '#1a1a1a';
ctx.fillRect(0, 0, 240, 240);
ctx.fillStyle = '#666';
ctx.font = '14px system-ui';
ctx.textAlign = 'center';
ctx.fillText('Waiting for SeedSigner...', 120, 120);

// Camera handling
const cameraVideo = document.getElementById('camera');
const cameraCanvas = document.getElementById('camera-canvas');
const cameraContainer = document.getElementById('camera-container');
const cameraCtx = cameraCanvas.getContext('2d');
let cameraStream = null;
let cameraInterval = null;
let cameraWasActive = false;

async function startCamera() {
  if (cameraStream) return;
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: 640, height: 480 },
      audio: false,
    });
    cameraVideo.srcObject = cameraStream;
    cameraContainer.classList.add('active');
    cameraCanvas.width = 640;
    cameraCanvas.height = 480;

    // Send frames at ~10fps
    cameraInterval = setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        cameraCtx.drawImage(cameraVideo, 0, 0, 640, 480);
        const dataUrl = cameraCanvas.toDataURL('image/jpeg', 0.7);
        const base64 = dataUrl.split(',')[1];
        ws.send(JSON.stringify({ type: 'camera_frame', data: base64 }));
      }
    }, 100);
  } catch (e) {
    console.warn('Camera access denied or unavailable:', e);
  }
}

function stopCamera() {
  if (cameraInterval) { clearInterval(cameraInterval); cameraInterval = null; }
  if (cameraStream) {
    cameraStream.getTracks().forEach(t => t.stop());
    cameraStream = null;
  }
  cameraContainer.classList.remove('active');
}

connect();
</script>
</body>
</html>"""


async def handle_websocket(websocket):
    """Handle WebSocket connections from the browser."""
    from seedsigner.emulator.desktopDisplay import _instance as display

    # Start frame streaming task
    async def stream_frames():
        last_frame = None
        while True:
            if display:
                frame = display.get_frame()
                if frame and frame != last_frame:
                    await websocket.send(json.dumps({
                        'type': 'frame',
                        'data': frame,
                    }))
                    last_frame = frame

                # Tell browser if SeedSigner wants camera
                from seedsigner.hardware.camera import is_camera_active
                await websocket.send(json.dumps({
                    'type': 'camera_status',
                    'active': is_camera_active(),
                }))
            await asyncio.sleep(0.05)  # 20fps max

    stream_task = asyncio.create_task(stream_frames())

    try:
        async for message in websocket:
            data = json.loads(message)
            if data['type'] == 'key':
                from seedsigner.emulator.desktopDisplay import desktopDisplay
                desktopDisplay.handle_key(data['key'])
            elif data['type'] == 'camera_frame':
                # Browser sending a webcam frame
                import base64
                from seedsigner.hardware.camera import set_camera_frame
                frame_bytes = base64.b64decode(data['data'])
                set_camera_frame(frame_bytes)
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        stream_task.cancel()


async def handle_index(request):
    return web.Response(text=HTML_PAGE, content_type='text/html')


def patch_seedsigner():
    """Patch SeedSigner runtime for desktop compatibility."""
    # Stub out Pi-only hardware modules
    import types
    for mod_name in ['picamera', 'picamera.array', 'spidev', 'RPi', 'RPi.GPIO']:
        sys.modules[mod_name] = types.ModuleType(mod_name)
    # picamera needs specific attributes
    sys.modules['picamera'].PiCamera = type('PiCamera', (), {'__init__': lambda *a, **k: None})
    sys.modules['picamera.array'].PiRGBArray = type('PiRGBArray', (), {'__init__': lambda *a, **k: None})
    sys.modules['picamera'].array = sys.modules['picamera.array']
    # spidev needs SpiDev class
    sys.modules['spidev'].SpiDev = type('SpiDev', (), {
        '__init__': lambda *a, **k: None,
        'open': lambda *a, **k: None,
        'xfer2': lambda *a, **k: [],
        'close': lambda *a, **k: None,
    })
    # File-level patches are handled by patches/apply.py during setup


def start_seedsigner():
    """Start the SeedSigner main loop in a background thread."""
    os.chdir(str(SEEDSIGNER_SRC))
    sys.path.insert(0, str(SEEDSIGNER_SRC))
    patch_seedsigner()
    # main.py is at src/ root, not inside seedsigner package
    import importlib.util
    spec = importlib.util.spec_from_file_location("main", str(SEEDSIGNER_SRC / "main.py"))
    main_module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(main_module)
    main_module.main()


async def main():
    print("Starting SeedSigner Web Emulator...")
    print("")

    # Start HTTP server FIRST
    app = web.Application()
    app.router.add_get('/', handle_index)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 8888)
    await site.start()
    print("Web UI at http://localhost:8888")

    # Start WebSocket server
    ws_server = await serve(handle_websocket, "0.0.0.0", 8889)
    print("WebSocket server on ws://localhost:8889")

    # NOW start SeedSigner in background (this blocks its thread)
    ss_thread = threading.Thread(target=start_seedsigner, daemon=True)
    ss_thread.start()

    print("")
    print("Open http://localhost:8888 in your browser!")
    print("")

    # Keep running
    await asyncio.Future()


if __name__ == '__main__':
    asyncio.run(main())
