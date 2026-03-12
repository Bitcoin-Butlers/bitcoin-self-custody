"""
Stub camera for Pyodide SeedSigner emulator.
"""
import numpy as np
from seedsigner.models.singleton import Singleton


class CameraConnectionError(Exception):
    pass


class WebVideoStream:
    def __init__(self):
        self.frame = np.zeros((480, 640, 3), dtype=np.uint8)
        self.stopped = False

    def start(self):
        return self

    def stop(self):
        self.stopped = True

    def read(self):
        return self.frame


class Camera(Singleton):
    _instance = None

    def configure_instance(self):
        self.is_active = False
        self._video_stream = None
        self._camera_rotation = 0

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls.__new__(cls)
            cls._instance.configure_instance()
        return cls._instance

    def start(self):
        self.is_active = True
        self._video_stream = WebVideoStream().start()

    def stop(self):
        self.is_active = False
        if self._video_stream:
            self._video_stream.stop()

    def start_video_stream_mode(self, resolution=(512, 512), framerate=12, format="rgb"):
        self.start()

    def stop_video_stream_mode(self):
        self.stop()

    def capture_frame(self):
        return np.zeros((480, 640, 3), dtype=np.uint8)

    def read_video_stream(self, as_image=False):
        frame = np.zeros((512, 512, 3), dtype=np.uint8)
        if as_image:
            from PIL import Image
            return Image.fromarray(frame)
        return frame

    @property
    def camera_rotation(self):
        return self._camera_rotation

    @camera_rotation.setter
    def camera_rotation(self, value):
        self._camera_rotation = value
