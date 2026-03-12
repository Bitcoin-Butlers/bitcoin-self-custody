"""
Camera for Pyodide SeedSigner emulator.
Uses device camera via getUserMedia (bridged through JS).
"""
import numpy as np
from seedsigner.models.singleton import Singleton


class CameraConnectionError(Exception):
    pass


class WebVideoStream:
    def __init__(self, resolution=(512, 384), framerate=12, format="bgr"):
        self.resolution = resolution
        self.frame = np.zeros((resolution[1], resolution[0], 3), dtype=np.uint8)
        self.stopped = False

    def start(self):
        return self

    def stop(self):
        self.stopped = True

    def read(self):
        return self._get_camera_frame()

    def _get_camera_frame(self):
        try:
            import _js_bridge
            raw = _js_bridge.camera_frame()
            if raw is not None and hasattr(raw, 'data'):
                w = int(raw.width)
                h = int(raw.height)
                # raw.data is RGBA uint8 array from JS
                data = bytes(raw.data)
                rgba = np.frombuffer(data, dtype=np.uint8).reshape((h, w, 4))
                # Convert RGBA to RGB
                return rgba[:, :, :3]
        except Exception:
            pass
        return self.frame

    def hasCamera(self):
        return True


def set_camera_frame(frame_data):
    pass


def is_camera_active():
    return False


class Camera(Singleton):
    _instance = None

    def configure_instance(self):
        self.is_active = False
        self._video_stream = None
        self._camera_rotation = 0
        self._current_frame = None
        self.framerate = 6

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls.__new__(cls)
            cls._instance.configure_instance()
        return cls._instance

    def start(self):
        self.is_active = True

    def stop(self):
        self.is_active = False
        try:
            import _js_bridge
            _js_bridge.camera_stop()
        except Exception:
            pass
        if self._video_stream:
            self._video_stream.stop()
            self._video_stream = None

    def start_video_stream_mode(self, resolution=(512, 384), framerate=12, format="bgr"):
        try:
            import _js_bridge
            _js_bridge.camera_start(resolution[0], resolution[1])
        except Exception:
            pass
        self._video_stream = WebVideoStream(resolution=resolution, framerate=framerate, format=format)
        self._video_stream.start()
        self.is_active = True

    def read_video_stream(self, as_image=False):
        if self._video_stream:
            frame = self._video_stream.read()
        else:
            frame = np.zeros((384, 512, 3), dtype=np.uint8)
        if as_image:
            from PIL import Image
            return Image.fromarray(frame)
        return frame

    def stop_video_stream_mode(self):
        self.stop()

    def start_single_frame_mode(self, resolution=(720, 480)):
        try:
            import _js_bridge
            _js_bridge.camera_start(resolution[0], resolution[1])
        except Exception:
            pass
        self.is_active = True

    def capture_frame(self):
        try:
            import _js_bridge
            raw = _js_bridge.camera_frame()
            if raw is not None and hasattr(raw, 'data'):
                w = int(raw.width)
                h = int(raw.height)
                data = bytes(raw.data)
                rgba = np.frombuffer(data, dtype=np.uint8).reshape((h, w, 4))
                return rgba[:, :, :3]
        except Exception:
            pass
        return np.zeros((480, 720, 3), dtype=np.uint8)

    def stop_single_frame_mode(self):
        self.stop()

    @property
    def camera_rotation(self):
        return self._camera_rotation

    @camera_rotation.setter
    def camera_rotation(self, value):
        self._camera_rotation = value
