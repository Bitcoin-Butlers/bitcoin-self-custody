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


# Load HTML from external file
HTML_FILE = SCRIPT_DIR / "index.html"
HTML_PAGE = HTML_FILE.read_text()


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
