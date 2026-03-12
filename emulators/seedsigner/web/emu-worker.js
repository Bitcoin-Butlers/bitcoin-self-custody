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
    const resp = await fetch('seedsigner-bundle.zip');
    const data = await resp.arrayBuffer();
    pyodide.unpackArchive(data, 'zip', { extractDir: '/home/pyodide' });

    sendProgress('Patching for browser...', 75);

    // Make key queue and frame sender accessible from Python
    pyodide.globals.set('_js_key_queue', keyQueue);
    pyodide.globals.set('_js_send_frame', sendFrame);

    await pyodide.runPythonAsync(`
import sys, os, types, io, base64

# Paths — bundle root has embit/, qrcode/, urtypes/ alongside seedsigner/
sys.path.insert(0, '/home/pyodide')
sys.path.insert(0, '/home/pyodide/seedsigner')

# Set locale
os.environ['LANGUAGE'] = 'en'
os.environ['LANG'] = 'en_US.UTF-8'
print(f"Set LANGUAGE locale to {os.environ.get('LANGUAGE', 'unknown')}")

# Stub RPi.GPIO
gpio_mod = types.ModuleType('RPi')
gpio_sub = types.ModuleType('RPi.GPIO')
gpio_mod.GPIO = gpio_sub
sys.modules['RPi'] = gpio_mod
sys.modules['RPi.GPIO'] = gpio_sub

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

# Create emulator display driver
os.makedirs('/home/pyodide/seedsigner/emulator', exist_ok=True)
with open('/home/pyodide/seedsigner/emulator/__init__.py', 'w') as f:
    f.write('')

with open('/home/pyodide/seedsigner/emulator/desktopDisplay.py', 'w') as f:
    f.write('''
import io, base64
from PIL import Image

class DesktopDisplay:
    def __init__(self):
        self.width = 240
        self.height = 240
        self.current_frame = None

    def ShowImage(self, image):
        imwidth, imheight = image.size
        if imwidth != self.width or imheight != self.height:
            image = image.resize((self.width, self.height))
        buf = io.BytesIO()
        image.save(buf, format="PNG")
        self.current_frame = base64.b64encode(buf.getvalue()).decode("ascii")
        import _js_bridge
        _js_bridge.send_frame(self.current_frame)

    show_image = ShowImage
    def update_geometry(self): pass
    def invert(self, enabled=True): pass
    def clear(self): pass
    def get_frame(self): return self.current_frame

    @staticmethod
    def handle_key(key):
        from seedsigner.hardware.buttons import HardwareButtons
        from seedsigner.emulator.virtualGPIO import GPIO
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
            GPIO.set_input(pin, GPIO.HIGH)
            import time; time.sleep(0.15)
            GPIO.set_input(pin, GPIO.LOW)
''')

# Virtual GPIO
with open('/home/pyodide/seedsigner/emulator/virtualGPIO.py', 'w') as f:
    f.write('''
class GPIO:
    BCM = 11
    IN = 0
    OUT = 1
    PUD_UP = 22
    PUD_DOWN = 21
    HIGH = 1
    LOW = 0
    RISING = 31
    FALLING = 32

    _pins = {}
    _callbacks = {}

    @classmethod
    def setmode(cls, mode): pass

    @classmethod
    def setup(cls, pin, mode, pull_up_down=None, initial=None):
        if isinstance(pin, (list, tuple)):
            for p in pin: cls._pins[p] = cls.HIGH
        else:
            cls._pins[pin] = cls.HIGH

    @classmethod
    def input(cls, pin):
        return cls._pins.get(pin, cls.HIGH)

    @classmethod
    def output(cls, pin, value):
        cls._pins[pin] = value

    @classmethod
    def set_input(cls, pin, value):
        cls._pins[pin] = value

    @classmethod
    def add_event_detect(cls, pin, edge, callback=None, bouncetime=None):
        if callback: cls._callbacks[pin] = callback

    @classmethod
    def cleanup(cls): pass
''')

# Patch display module to use our emulator
with open('/home/pyodide/seedsigner/hardware/ST7789.py', 'w') as f:
    f.write('''
from seedsigner.emulator.desktopDisplay import DesktopDisplay
class ST7789:
    def __init__(self, *a, **k):
        self._display = DesktopDisplay()
        self.width = 240
        self.height = 240
    def Init(self): pass
    def ShowImage(self, img): self._display.ShowImage(img)
    def show_image(self, img): self._display.ShowImage(img)
    def clear(self): pass
    def module_exit(self): pass
''')

# Patch GPIO import in hardware
import importlib
sys.modules['RPi.GPIO'] = type(sys)('RPi.GPIO')
from seedsigner.emulator.virtualGPIO import GPIO
sys.modules['RPi.GPIO'].BCM = GPIO.BCM
sys.modules['RPi.GPIO'].IN = GPIO.IN
sys.modules['RPi.GPIO'].OUT = GPIO.OUT
sys.modules['RPi.GPIO'].PUD_UP = GPIO.PUD_UP
sys.modules['RPi.GPIO'].PUD_DOWN = GPIO.PUD_DOWN
sys.modules['RPi.GPIO'].HIGH = GPIO.HIGH
sys.modules['RPi.GPIO'].LOW = GPIO.LOW
sys.modules['RPi.GPIO'].RISING = GPIO.RISING
sys.modules['RPi.GPIO'].FALLING = GPIO.FALLING
sys.modules['RPi.GPIO'].setmode = GPIO.setmode
sys.modules['RPi.GPIO'].setup = GPIO.setup
sys.modules['RPi.GPIO'].input = GPIO.input
sys.modules['RPi.GPIO'].output = GPIO.output
sys.modules['RPi.GPIO'].add_event_detect = GPIO.add_event_detect
sys.modules['RPi.GPIO'].cleanup = GPIO.cleanup

# JS bridge module
js_bridge = types.ModuleType('_js_bridge')
def send_frame(b64):
    _js_send_frame(b64)
def get_key():
    if len(_js_key_queue) > 0:
        return _js_key_queue.pop(0)
    return None
js_bridge.send_frame = send_frame
js_bridge.get_key = get_key
sys.modules['_js_bridge'] = js_bridge

# Camera driver (stub)
with open('/home/pyodide/seedsigner/hardware/camera.py', 'w') as f:
    f.write("""
class Camera:
    _instance = None
    def __init__(self):
        self.is_active = False
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = Camera()
        return cls._instance
    def start(self): self.is_active = True
    def stop(self): self.is_active = False
    def capture_frame(self):
        import numpy as np
        return np.zeros((480, 640, 3), dtype=np.uint8)
""")

# Patch time.sleep to check keys (in worker, blocking is OK but we still need to process keys)
import time as _time
_original_sleep = _time.sleep
def _patched_sleep(seconds):
    import _js_bridge
    key = _js_bridge.get_key()
    if key:
        from seedsigner.emulator.desktopDisplay import DesktopDisplay
        DesktopDisplay().handle_key(key)
    _original_sleep(min(seconds, 0.05))  # Cap at 50ms for key responsiveness
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
