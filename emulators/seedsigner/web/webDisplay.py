######################################################################
#  SeedSigner Web Display Driver
#  Replaces tkinter with a WebSocket-based browser display
#
#  Based on enteropositivo's desktop emulator concept
#  Adapted for web by Bitcoin Butlers (bitcoinbutlers.com)

import time
import io
import base64
import json
import threading
import os

from seedsigner.emulator.virtualGPIO import GPIO
from seedsigner.hardware.buttons import HardwareButtons

EMULATOR_VERSION = '1.0-web'

DISPLAY_TYPE__ST7789 = "st7789"
DISPLAY_TYPE__ILI9341 = "ili9341"
DISPLAY_TYPE__ILI9486 = "ili9486"

ALL_DISPLAY_TYPES = [DISPLAY_TYPE__ST7789, DISPLAY_TYPE__ILI9341, DISPLAY_TYPE__ILI9486]

# Global reference for the web server to access
_instance = None


class desktopDisplay(threading.Thread):
    """Web-based display driver for SeedSigner emulator."""

    def __init__(self, display_type: str = DISPLAY_TYPE__ST7789, width: int = 240, height: int = 240):
        global _instance
        self.width = width
        self.height = height
        self.display_type = display_type
        self.current_frame = None
        self.frame_lock = threading.Lock()
        _instance = self

        threading.Thread.__init__(self)
        self.daemon = True
        self.start()

    def callback(self):
        pid = os.getpid()
        os.kill(pid, 9)

    def run(self):
        from seedsigner.controller import Controller
        controller = Controller.get_instance()
        title = f"SeedSigner Emulator v{EMULATOR_VERSION} / {controller.VERSION}"

        print("*****************************************************")
        print(title)
        print("Web-based emulator")
        print("Open http://localhost:8888 in your browser")
        print("*****************************************************")

        # Keep thread alive
        while True:
            time.sleep(1)

    def ShowImage(self, image, Xstart, Ystart):
        imwidth, imheight = image.size
        if imwidth != self.width or imheight != self.height:
            if self.display_type == DISPLAY_TYPE__ILI9341:
                image = image.rotate(90, expand=True)
                image = image.resize((self.width, self.height))
            else:
                raise ValueError(
                    f'Image must be same dimensions as display ({self.width}x{self.height}).'
                )

        # Convert PIL Image to base64 PNG
        buf = io.BytesIO()
        image.save(buf, format='PNG')
        frame_data = base64.b64encode(buf.getvalue()).decode('ascii')

        with self.frame_lock:
            self.current_frame = frame_data

    show_image = ShowImage

    def update_geometry(self):
        pass

    def invert(self, enabled: bool = True):
        pass

    def clear(self):
        pass

    def get_frame(self):
        with self.frame_lock:
            return self.current_frame

    @staticmethod
    def handle_key(key):
        """Handle a key press from the browser."""
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
        if pin:
            GPIO.set_input(pin, GPIO.HIGH)
            # Brief press
            threading.Timer(0.15, lambda: GPIO.set_input(pin, GPIO.LOW)).start()
