// SeedSigner Emulator Web Worker
// Runs Pyodide + SeedSigner firmware in a worker thread so blocking sleep doesn't freeze UI
importScripts('https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js');

let pyodide = null;
let keyQueue = [];

// Receive key events from main thread
self.onmessage = (e) => {
  if (e.data.type === 'key') {
    keyQueue.push(e.data.key);
  }
};

function sendFrame(b64) {
  self.postMessage({ type: 'frame', data: b64 });
}

function sendStatus(msg) {
  self.postMessage({ type: 'status', msg });
}

function sendError(msg) {
  self.postMessage({ type: 'error', msg });
}

function sendProgress(msg, pct) {
  self.postMessage({ type: 'progress', msg, pct });
}

async function main() {
  try {
    sendProgress('Loading Python runtime...', 10);
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/',
    });

    sendProgress('Installing packages...', 30);
    await pyodide.loadPackage(['Pillow', 'numpy']);

    sendProgress('Loading SeedSigner firmware...', 50);
    // Fetch and unpack the bundle
    const resp = await fetch('seedsigner-bundle.zip?v=' + Date.now());
    const data = await resp.arrayBuffer();
    pyodide.unpackArchive(data, 'zip', { extractDir: '/home/pyodide' });

    sendProgress('Patching for browser...', 75);

    // Make key queue and frame sender accessible from Python
    pyodide.globals.set('_js_send_frame', sendFrame);
    // Expose a function to get next key (avoids JS array proxy issues)
    pyodide.globals.set('_js_get_key', () => {
      if (keyQueue.length > 0) return keyQueue.shift();
      return null;
    });

    await pyodide.runPythonAsync(`
import sys, os, types, io, base64

# Paths — bundle root has embit/, qrcode/, urtypes/ alongside seedsigner/
sys.path.insert(0, '/home/pyodide')
sys.path.insert(0, '/home/pyodide/seedsigner')

# Set locale
os.environ['LANGUAGE'] = 'en'
os.environ['LANG'] = 'en_US.UTF-8'
print(f"Set LANGUAGE locale to {os.environ.get('LANGUAGE', 'unknown')}")

# Stub RPi module (GPIO mapped properly later after bundle loads)
gpio_mod = types.ModuleType('RPi')
sys.modules['RPi'] = gpio_mod

# Stub spidev
spidev_mod = types.ModuleType('spidev')
class FakeSpiDev:
    def __init__(self): self.max_speed_hz = 0; self.mode = 0
    def open(self, *a): pass
    def xfer2(self, data): return [0]*len(data)
    def close(self): pass
spidev_mod.SpiDev = FakeSpiDev
sys.modules['spidev'] = spidev_mod

# Stub picamera2
pc_mod = types.ModuleType('picamera2')
class FakePicamera2:
    def __init__(self, *a, **k): pass
    def configure(self, *a): pass
    def start(self, *a): pass
    def stop(self): pass
    def capture_array(self, *a):
        import numpy as np
        return np.zeros((480, 640, 3), dtype=np.uint8)
    def create_still_configuration(self, *a, **k): return {}
pc_mod.Picamera2 = FakePicamera2
sys.modules['picamera2'] = pc_mod

# Stub pyzbar
pyzbar_mod = types.ModuleType('pyzbar')
pyzbar_pyzbar = types.ModuleType('pyzbar.pyzbar')
pyzbar_pyzbar.decode = lambda *a, **k: []
pyzbar_mod.pyzbar = pyzbar_pyzbar
sys.modules['pyzbar'] = pyzbar_mod
sys.modules['pyzbar.pyzbar'] = pyzbar_pyzbar

# Stub libcamera
libcam = types.ModuleType('libcamera')
class FakeTransform:
    def __init__(self, hflip=0, vflip=0): pass
libcam.Transform = FakeTransform
sys.modules['libcamera'] = libcam

# Stub gettext properly
import builtins
builtins._ = lambda x: x

# Display, GPIO, camera, and ST7789 are pre-patched in the bundle (see patches/ dir)
# Just need to set up the RPi.GPIO module alias and JS bridge

# Map RPi.GPIO directly to our virtual GPIO class (has all pin constants + methods)
from seedsigner.emulator.virtualGPIO import GPIO
sys.modules['RPi.GPIO'] = GPIO
sys.modules['RPi'].GPIO = GPIO

# JS bridge module — connects Python to JS for frames and keys
js_bridge = types.ModuleType('_js_bridge')
def send_frame(b64):
    _js_send_frame(b64)
def get_key():
    result = _js_get_key()
    if result is not None:
        return str(result)
    return None
js_bridge.send_frame = send_frame
js_bridge.get_key = get_key
sys.modules['_js_bridge'] = js_bridge

# Patch time.sleep to check keys (in worker, blocking is OK but we still need to process keys)
import time as _time
_original_sleep = _time.sleep
_pending_pin_reset = []
def _patched_sleep(seconds):
    # Reset any pins that were pressed in the previous cycle
    from seedsigner.emulator.virtualGPIO import GPIO as _GPIO
    global _pending_pin_reset
    for pin in _pending_pin_reset:
        _GPIO._pins[pin] = _GPIO.HIGH
    _pending_pin_reset = []
    # Check for new key input
    import _js_bridge
    key = _js_bridge.get_key()
    if key:
        from seedsigner.emulator.desktopDisplay import desktopDisplay
        desktopDisplay.handle_key(key)
        # Track which pins need resetting next cycle
        from seedsigner.hardware.buttons import HardwareButtons
        key_map = {
            "ArrowUp": HardwareButtons.KEY_UP_PIN,
            "ArrowDown": HardwareButtons.KEY_DOWN_PIN,
            "ArrowLeft": HardwareButtons.KEY_LEFT_PIN,
            "ArrowRight": HardwareButtons.KEY_RIGHT_PIN,
            "Enter": HardwareButtons.KEY_PRESS_PIN,
            "1": HardwareButtons.KEY1_PIN,
            "2": HardwareButtons.KEY2_PIN,
            "3": HardwareButtons.KEY3_PIN,
        }
        pin = key_map.get(key)
        if pin is not None:
            _pending_pin_reset.append(pin)
    # Honor the requested sleep duration (important for animation timing)
    # Cap at 2s to prevent total lockup
    _original_sleep(min(seconds, 2.0))
_time.sleep = _patched_sleep

# Patch threading (no real threads in Pyodide)
import threading
_orig_init = threading.Thread.__init__
def _pi(self, *a, **k):
    k.pop('daemon', None)
    _orig_init(self, *a, **k)
threading.Thread.__init__ = _pi
threading.Thread.start = lambda self: None

print("All patches applied!")
`);

    sendProgress('Starting emulator...', 90);

    // Initialize and run
    await pyodide.runPythonAsync(`
import sys, os
os.chdir('/home/pyodide/seedsigner')

for k in list(sys.modules.keys()):
    if k.startswith('seedsigner'):
        del sys.modules[k]

from seedsigner.controller import Controller
controller = Controller.get_instance()
print(f"SeedSigner v{controller.VERSION} loaded!")
`);

    sendStatus('running');

    // Run main loop
    await pyodide.runPythonAsync(`
from seedsigner.controller import Controller
from seedsigner.views import MainMenuView, BackStackView
from seedsigner.views.screensaver import OpeningSplashView
from seedsigner.views.view import Destination
import traceback, time

controller = Controller.get_instance()

# Show splash
print("Showing splash...")
OpeningSplashView().run()
print("Splash done, entering main loop")

next_dest = Destination(MainMenuView)

while True:
    try:
        if next_dest.View_cls is None:
            next_dest = Destination(MainMenuView)

        if next_dest.View_cls == MainMenuView:
            controller.clear_back_stack()
            controller.resume_main_flow = None
            controller.psbt = None
            controller.psbt_parser = None
            controller.psbt_seed = None

        next_dest = next_dest.run()

        if not next_dest:
            from seedsigner.views.view import NotYetImplementedView
            next_dest = Destination(NotYetImplementedView)
            continue

        if next_dest.skip_current_view and controller.back_stack:
            controller.back_stack.pop()

        clear_history = next_dest.clear_history

        if next_dest.View_cls == BackStackView:
            next_dest = controller.pop_prev_from_back_stack()

        if clear_history:
            controller.clear_back_stack()

        if len(controller.back_stack) == 0 or controller.back_stack[-1] != next_dest:
            controller.back_stack.append(next_dest)

    except Exception as e:
        traceback.print_exc()
        try:
            next_dest = controller.handle_exception(e)
        except:
            next_dest = Destination(MainMenuView)
`);

  } catch (err) {
    sendError(err.message || String(err));
  }
}

main();
