"""
Stub camera for Pyodide SeedSigner emulator.
"""
import numpy as np

class Camera:
    _instance = None

    def __init__(self):
        self.is_active = False

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = Camera()
        return cls._instance

    def start(self):
        self.is_active = True

    def stop(self):
        self.is_active = False

    def capture_frame(self):
        return np.zeros((480, 640, 3), dtype=np.uint8)
