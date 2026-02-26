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

# Patch: replace the tkinter display with our web display BEFORE any imports
WEB_DISPLAY_DIR = str(SCRIPT_DIR)
EMULATOR_DIR = str(SEEDSIGNER_SRC / "seedsigner" / "emulator")

import shutil
shutil.copy(
    os.path.join(WEB_DISPLAY_DIR, "webDisplay.py"),
    os.path.join(EMULATOR_DIR, "desktopDisplay.py"),
)

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
<meta name="viewport" content="width=device-width, initial-scale=1">
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
  .dpad button:active { background: #FBDC7B; color: #000; }
  .dpad .empty { border: none; background: transparent; cursor: default; }
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
  .side-buttons button:active { background: #FBDC7B; color: #000; }
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
</style>
</head>
<body>
<div class="emulator">
  <h1>SeedSigner Emulator</h1>
  <div class="device">
    <canvas id="screen" width="240" height="240"></canvas>
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
  <p class="hint">
    Keyboard: Arrow keys to navigate, Enter to select, 1/2/3 for side buttons
  </p>
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

// Keyboard controls
document.addEventListener('keydown', (e) => {
  const validKeys = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter','1','2','3'];
  if (validKeys.includes(e.key)) {
    e.preventDefault();
    sendKey(e.key);
  }
});

// Button click controls
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
  document.getElementById(id).addEventListener('mousedown', () => sendKey(key));
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
            await asyncio.sleep(0.05)  # 20fps max

    stream_task = asyncio.create_task(stream_frames())

    try:
        async for message in websocket:
            data = json.loads(message)
            if data['type'] == 'key':
                from seedsigner.emulator.desktopDisplay import desktopDisplay
                desktopDisplay.handle_key(data['key'])
    except websockets.exceptions.ConnectionClosed:
        pass
    finally:
        stream_task.cancel()


async def handle_index(request):
    return web.Response(text=HTML_PAGE, content_type='text/html')


def patch_seedsigner():
    """Patch SeedSigner source for desktop compatibility."""
    # Stub out picamera (Pi-only hardware)
    import types
    picamera_mod = types.ModuleType('picamera')
    picamera_array = types.ModuleType('picamera.array')
    picamera_mod.PiCamera = type('PiCamera', (), {'__init__': lambda *a, **k: None})
    picamera_array.PiRGBArray = type('PiRGBArray', (), {'__init__': lambda *a, **k: None})
    picamera_mod.array = picamera_array
    sys.modules['picamera'] = picamera_mod
    sys.modules['picamera.array'] = picamera_array

    # Patch Renderer to add is_screenshot_generator attribute if missing
    renderer_path = SEEDSIGNER_SRC / "seedsigner" / "gui" / "renderer.py"
    if renderer_path.exists():
        content = renderer_path.read_text()
        if 'is_screenshot_generator' not in content:
            content = content.replace(
                'if self.display_type == DISPLAY_TYPE__ST7789:',
                'self.is_screenshot_generator = False\n        if self.display_type == DISPLAY_TYPE__ST7789:',
                1
            )
            renderer_path.write_text(content)


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
