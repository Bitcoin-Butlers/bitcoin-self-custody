"""
SeedSigner Pyodide Display Driver
Sends frames to JavaScript via _js_bridge for canvas rendering.
"""
import io
import base64
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
            GPIO.set_input(pin, GPIO.HIGH)
            import time
            time.sleep(0.15)
            GPIO.set_input(pin, GPIO.LOW)

# Singleton instance — display_driver.py imports this lowercase name
desktopDisplay = DesktopDisplay()
