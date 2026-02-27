"""
Web Camera Driver for SeedSigner Emulator

Replaces PiCamera with a WebSocket-fed camera stream.
Browser sends webcam frames via WebSocket, this driver
provides them to SeedSigner's QR scanning pipeline.
"""

import io
import numpy as np
from PIL import Image
from threading import Lock

from seedsigner.models.settings import Settings, SettingsConstants
from seedsigner.models.singleton import Singleton


# Global frame buffer — the WebSocket server writes here,
# the camera driver reads from here
_camera_frame = None
_camera_lock = Lock()
_camera_active = False


def set_camera_frame(frame_data):
    """Called by the WebSocket server when a camera frame arrives."""
    global _camera_frame
    with _camera_lock:
        _camera_frame = frame_data


def is_camera_active():
    """Check if SeedSigner has requested camera access."""
    return _camera_active


class WebVideoStream:
    """Video stream backed by browser webcam via WebSocket."""

    def __init__(self, resolution=(512, 384), framerate=12, format="bgr"):
        self.resolution = resolution
        self.stopped = False

    def start(self):
        global _camera_active
        _camera_active = True
        return self

    def read(self):
        """Return the latest camera frame as a numpy array."""
        global _camera_frame
        with _camera_lock:
            data = _camera_frame
        if data is None:
            return None
        try:
            img = Image.open(io.BytesIO(data))
            img = img.resize(self.resolution)
            return np.array(img)
        except Exception:
            return None

    def hasCamera(self):
        return True

    def stop(self):
        global _camera_active
        _camera_active = False
        self.stopped = True

    @staticmethod
    def single_frame():
        """Capture a single frame."""
        global _camera_frame
        with _camera_lock:
            data = _camera_frame
        if data is None:
            # Return a blank frame
            return np.zeros((480, 640, 3), dtype=np.uint8)
        try:
            img = Image.open(io.BytesIO(data))
            return np.array(img)
        except Exception:
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
        if not self._video_stream.hasCamera():
            raise Exception("Camera not available")

        frame = self._video_stream.read()
        if not as_image:
            return frame
        else:
            if frame is not None:
                return Image.fromarray(frame.astype('uint8'), 'RGB').rotate(
                    90 + self._camera_rotation
                )
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
        return Image.fromarray(frame).rotate(90 + self._camera_rotation)

    def stop_single_frame_mode(self):
        pass
