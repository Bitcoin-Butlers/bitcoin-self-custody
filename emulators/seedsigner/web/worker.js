/**
 * SeedSigner Pyodide Web Worker
 * Runs the SeedSigner firmware entirely in the browser via Python WASM.
 * No server needed.
 * 
 * Uses SharedArrayBuffer for key input from main thread.
 */

let pyodide = null;
let keyBuffer = null;  // SharedArrayBuffer for key input

function status(msg, progress) {
  self.postMessage({ type: 'status', message: msg, progress });
}

async function init() {
  try {
    status('Loading Python runtime...', 10);
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js');

    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/',
    });

    status('Installing Bitcoin libraries...', 30);
    await pyodide.loadPackage(['micropip', 'Pillow', 'numpy']);

    const micropip = pyodide.pyimport('micropip');
    await micropip.install('embit==0.8.0');
    await micropip.install('qrcode==7.3.1');
    await micropip.install('urtypes==1.0.1');

    status('Loading SeedSigner firmware...', 60);

    // Fetch the source bundle
    const resp = await fetch('seedsigner-bundle.zip');
    const zipData = await resp.arrayBuffer();
    pyodide.unpackArchive(zipData, 'zip', { extractDir: '/home/pyodide' });

    status('Patching for browser...', 75);

    // Apply all patches and setup
    await pyodide.runPythonAsync(SETUP_CODE);

    status('Starting emulator...', 90);

    // Start SeedSigner — this will block in the while True loop
    // Key input comes via SharedArrayBuffer, frames go out via postMessage
    pyodide.runPython(`
import sys, os, threading
os.chdir('/home/pyodide/seedsigner')
sys.path.insert(0, '/home/pyodide/seedsigner')

# Clear any cached modules
mods_to_remove = [k for k in list(sys.modules.keys()) if k.startswith('seedsigner')]
for k in mods_to_remove:
    del sys.modules[k]

# Patch threading — display driver inherits Thread but we don't need actual threads
_orig_init = threading.Thread.__init__
_orig_start = threading.Thread.start

def _patched_init(self, *args, **kwargs):
    kwargs.pop('daemon', None)
    _orig_init(self, *args, **kwargs)

def _patched_start(self):
    # Run the thread's target in-line if it has one, otherwise skip
    if hasattr(self, '_target') and self._target:
        self._target(*self._args, **self._kwargs)

threading.Thread.__init__ = _patched_init
threading.Thread.start = _patched_start

print("Starting SeedSigner...")
from seedsigner.controller import Controller
controller = Controller.get_instance()
print(f"SeedSigner v{controller.VERSION} loaded!")
`);

    status('Ready!', 100);

    // Now run the controller — this blocks
    await pyodide.runPythonAsync(`
from seedsigner.controller import Controller
controller = Controller.get_instance()
try:
    controller.start()
except Exception as e:
    print(f"Controller exited: {e}")
    import traceback
    traceback.print_exc()
`);

  } catch (err) {
    status('Error: ' + err.message, -1);
    console.error(err);
  }
}

// Handle messages from main thread
self.onmessage = function(e) {
  const data = e.data;
  if (data.type === 'init' && data.keyBuffer) {
    keyBuffer = new Int32Array(data.keyBuffer);
    // Store on self so Python can access it via js.self._keyArray
    self._keyArray = keyBuffer;
    // Start initialization after receiving the buffer
    init();
  }
};

// The big setup code block
const SETUP_CODE = `
import sys
import types
import os

# ============================================
# 1. Stub Pi-only hardware modules
# ============================================
for mod_name in ['picamera', 'picamera.array', 'spidev', 'RPi', 'RPi.GPIO']:
    sys.modules[mod_name] = types.ModuleType(mod_name)

sys.modules['picamera'].PiCamera = type('PiCamera', (), {'__init__': lambda *a, **k: None})
sys.modules['picamera.array'].PiRGBArray = type('PiRGBArray', (), {'__init__': lambda *a, **k: None})
sys.modules['picamera'].array = sys.modules['picamera.array']
sys.modules['spidev'].SpiDev = type('SpiDev', (), {
    '__init__': lambda *a, **k: None,
    'open': lambda *a, **k: None,
    'xfer2': lambda *a, **k: [],
    'close': lambda *a, **k: None,
})

# ============================================
# 2. Stub pyzbar
# ============================================
pyzbar_mod = types.ModuleType('pyzbar')
pyzbar_decode_mod = types.ModuleType('pyzbar.pyzbar')

class Decoded:
    def __init__(self, data):
        self.data = data
        self.type = 'QRCODE'
        self.rect = type('Rect', (), {'left': 0, 'top': 0, 'width': 100, 'height': 100})()

def decode(image, symbols=None):
    return []

pyzbar_decode_mod.decode = decode
pyzbar_mod.pyzbar = pyzbar_decode_mod
sys.modules['pyzbar'] = pyzbar_mod
sys.modules['pyzbar.pyzbar'] = pyzbar_decode_mod

# ============================================
# 3. Set up paths
# ============================================
sys.path.insert(0, '/home/pyodide/seedsigner')
sys.path.insert(0, '/home/pyodide')

# ============================================
# 4. Create browser bridge
# ============================================
bridge = types.ModuleType('_browser_bridge')
bridge._frame_data = None
bridge._key_queue = []
bridge._camera_active = False
sys.modules['_browser_bridge'] = bridge

# ============================================
# 5. Install virtualGPIO
# ============================================
emu_dir = '/home/pyodide/seedsigner/emulator'
os.makedirs(emu_dir, exist_ok=True)

with open(os.path.join(emu_dir, '__init__.py'), 'w') as f:
    f.write('')

with open(os.path.join(emu_dir, 'virtualGPIO.py'), 'w') as f:
    f.write("""
import time

dictionaryPins = {}
raisedPin = ""

class GPIO:
    LOW = 0
    HIGH = 1
    OUT = 2
    IN = 3
    PUD_OFF = 4
    PUD_DOWN = 5
    PUD_UP = 6
    BCM = 7
    BOARD = 101
    SLEEP_TIME_S = 0.1
    SLEEP_TIME_L = 1.5
    risecallback = None

    def setmode(mode):
        pass

    def setwarnings(flag):
        pass

    def setup(channel, state, initial=-1, pull_up_down=-1):
        global dictionaryPins
        if str(channel) in dictionaryPins:
            return
        if state == GPIO.OUT:
            objTemp = PIN("OUT")
            if initial == GPIO.HIGH:
                objTemp.Out = "1"
            dictionaryPins[str(channel)] = objTemp
        elif state == GPIO.IN:
            objTemp = PIN("IN")
            if pull_up_down == -1 or pull_up_down == GPIO.PUD_DOWN:
                objTemp.pull_up_down = "PUD_DOWN"
                objTemp.In = "0"
            elif pull_up_down == GPIO.PUD_UP:
                objTemp.pull_up_down = "PUD_UP"
                objTemp.In = "1"
            dictionaryPins[str(channel)] = objTemp

    def output(channel, outmode):
        global dictionaryPins
        channel = str(channel)
        if channel not in dictionaryPins:
            return
        objPin = dictionaryPins[channel]
        if outmode == GPIO.LOW:
            objPin.Out = "0"
        elif outmode == GPIO.HIGH:
            objPin.Out = "1"

    def input(channel):
        global dictionaryPins, raisedPin
        channel = str(channel)
        if channel not in dictionaryPins:
            return GPIO.HIGH
        if channel == raisedPin:
            raisedPin = ""
            return GPIO.LOW
        else:
            return GPIO.HIGH

    def cleanup():
        pass

    def add_event_detect(channel, edge, callback):
        GPIO.risecallback = callback

    def set_input(gpioID, state):
        global raisedPin
        if state == GPIO.HIGH:
            raisedPin = str(gpioID)
            if GPIO.risecallback:
                GPIO.risecallback(gpioID)
        else:
            raisedPin = ""

class PIN:
    SetMode = "None"
    Out = "0"
    pull_up_down = "PUD_OFF"
    In = "1"
    def __init__(self, SetMode):
        self.SetMode = SetMode
        self.Out = "0"
""")

# ============================================
# 6. Install browser display driver
# ============================================
with open(os.path.join(emu_dir, 'desktopDisplay.py'), 'w') as f:
    f.write("""
import io
import base64
from js import postMessage
import json as _json

EMULATOR_VERSION = '2.0-wasm'
DISPLAY_TYPE__ST7789 = "st7789"
DISPLAY_TYPE__ILI9341 = "ili9341"
DISPLAY_TYPE__ILI9486 = "ili9486"
ALL_DISPLAY_TYPES = [DISPLAY_TYPE__ST7789, DISPLAY_TYPE__ILI9341, DISPLAY_TYPE__ILI9486]

_instance = None

class desktopDisplay:
    def __init__(self, display_type=DISPLAY_TYPE__ST7789, width=240, height=240):
        global _instance
        self.width = width
        self.height = height
        self.display_type = display_type
        self.current_frame = None
        _instance = self

    def callback(self):
        pass

    def run(self):
        pass

    def start(self):
        pass

    def ShowImage(self, image, Xstart, Ystart):
        imwidth, imheight = image.size
        if imwidth != self.width or imheight != self.height:
            image = image.resize((self.width, self.height))
        buf = io.BytesIO()
        image.save(buf, format='PNG')
        frame_data = base64.b64encode(buf.getvalue()).decode('ascii')
        self.current_frame = frame_data
        # Send frame directly to main thread
        from pyodide.ffi import to_js
        postMessage(to_js({"type": "frame", "data": frame_data}))

    show_image = ShowImage

    def update_geometry(self):
        pass

    def invert(self, enabled=True):
        pass

    def clear(self):
        pass

    def get_frame(self):
        return self.current_frame

    @staticmethod
    def handle_key(key):
        from seedsigner.hardware.buttons import HardwareButtons
        from seedsigner.emulator.virtualGPIO import GPIO
        key_map = {
            'ArrowUp': HardwareButtons.KEY_UP_PIN,
            'ArrowDown': HardwareButtons.KEY_DOWN_PIN,
            'ArrowLeft': HardwareButtons.KEY_LEFT_PIN,
            'ArrowRight': HardwareButtons.KEY_RIGHT_PIN,
            'Enter': HardwareButtons.KEY_PRESS_PIN,
            '1': HardwareButtons.KEY1_PIN,
            '2': HardwareButtons.KEY2_PIN,
            '3': HardwareButtons.KEY3_PIN,
        }
        pin = key_map.get(key)
        if pin is not None:
            GPIO.set_input(pin, GPIO.HIGH)
            import time
            time.sleep(0.15)
            GPIO.set_input(pin, GPIO.LOW)
""")

# ============================================
# 7. Install browser camera driver
# ============================================
camera_path = '/home/pyodide/seedsigner/hardware/camera.py'
with open(camera_path, 'w') as f:
    f.write("""
import io
import numpy as np
from PIL import Image
from seedsigner.models.settings import Settings, SettingsConstants
from seedsigner.models.singleton import Singleton

class CameraConnectionError(Exception):
    pass

class WebVideoStream:
    def __init__(self, resolution=(512, 384), framerate=12, format="bgr"):
        self.resolution = resolution
        self.stopped = False

    def start(self):
        return self

    def read(self):
        return np.zeros((self.resolution[1], self.resolution[0], 3), dtype=np.uint8)

    def hasCamera(self):
        return True

    def stop(self):
        self.stopped = True

    @staticmethod
    def single_frame():
        return np.zeros((480, 640, 3), dtype=np.uint8)

class Camera(Singleton):
    _video_stream = None
    _camera_rotation = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls.__new__(cls)
        cls._instance._camera_rotation = int(
            Settings.get_instance().get_value(SettingsConstants.SETTING__CAMERA_ROTATION)
        )
        return cls._instance

    def start_video_stream_mode(self, resolution=(512, 384), framerate=12, format="bgr"):
        if self._video_stream is not None:
            self.stop_video_stream_mode()
        self._video_stream = WebVideoStream(resolution=resolution, framerate=framerate, format=format)
        self._video_stream.start()

    def read_video_stream(self, as_image=False):
        if not self._video_stream:
            raise Exception("Must call start_video_stream first.")
        frame = self._video_stream.read()
        if not as_image:
            return frame
        else:
            if frame is not None:
                return Image.fromarray(frame.astype('uint8'), 'RGB')
        return None

    def stop_video_stream_mode(self):
        if self._video_stream is not None:
            self._video_stream.stop()
            self._video_stream = None

    def start_single_frame_mode(self, resolution=(720, 480)):
        if self._video_stream is not None:
            self.stop_video_stream_mode()

    def capture_frame(self):
        frame = WebVideoStream.single_frame()
        return Image.fromarray(frame)

    def stop_single_frame_mode(self):
        pass
""")

# ============================================
# 8. Patch time.sleep to check for keys
# ============================================
import time as _time
_original_sleep = _time.sleep

def _patched_sleep(seconds):
    """Sleep that also checks for pending key input from JS."""
    from js import self as js_self
    import _browser_bridge as bridge
    
    # Check SharedArrayBuffer for pending keys
    try:
        key_array = js_self._keyArray
        if key_array:
            key_code = int(key_array[0])
            if key_code > 0:
                key_array[0] = 0  # Clear it
                key_names = {1: 'ArrowUp', 2: 'ArrowDown', 3: 'ArrowLeft', 4: 'ArrowRight', 5: 'Enter', 6: '1', 7: '2', 8: '3'}
                key_name = key_names.get(key_code)
                if key_name:
                    from seedsigner.emulator.desktopDisplay import desktopDisplay
                    desktopDisplay.handle_key(key_name)
    except:
        pass
    
    _original_sleep(seconds)

_time.sleep = _patched_sleep

print("All browser patches applied successfully!")
`;

// Worker waits for 'init' message with SharedArrayBuffer before starting
