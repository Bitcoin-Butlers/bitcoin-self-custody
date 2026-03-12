"""
Stub ST7789 display driver for Pyodide.
Delegates to desktopDisplay singleton.
"""
from seedsigner.emulator.desktopDisplay import desktopDisplay

class ST7789:
    def __init__(self, *a, **k):
        self._display = desktopDisplay
        self.width = 240
        self.height = 240

    def Init(self):
        pass

    def ShowImage(self, img):
        self._display.ShowImage(img)

    def show_image(self, img):
        self._display.ShowImage(img)

    def clear(self):
        pass

    def module_exit(self):
        pass
