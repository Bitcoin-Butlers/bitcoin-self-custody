"""
SeedSigner Pyodide Display Driver
Sends frames to JavaScript via _js_bridge for canvas rendering.
"""
import io
import base64
from PIL import Image

class DesktopDisplay:
    def __init__(self, display_type=None, width=240, height=240, **kwargs):
        self.width = width
        self.height = height
        self.current_frame = None

    def ShowImage(self, image, *args):
        imwidth, imheight = image.size
        if imwidth != self.width or imheight != self.height:
            image = image.resize((self.width, self.height))
        buf = io.BytesIO()
        image.save(buf, format="PNG")
        self.current_frame = base64.b64encode(buf.getvalue()).decode("ascii")
        import _js_bridge
        _js_bridge.send_frame(self.current_frame)

    def show_image(self, image, *args):
        self.ShowImage(image)

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
            # Press (active LOW)
            GPIO.set_input(pin, GPIO.LOW)
            import time
            time.sleep(0.15)
            # Release (HIGH) and unlock for next press
            GPIO.set_input(pin, GPIO.HIGH)
            from seedsigner.hardware.buttons import HardwareButtonsConstants
            HardwareButtonsConstants.release_lock = True

# display_driver.py does `from ... import desktopDisplay` then calls desktopDisplay(display_type=..., width=..., height=...)
# So desktopDisplay must be the CLASS (used as constructor), not an instance
desktopDisplay = DesktopDisplay
