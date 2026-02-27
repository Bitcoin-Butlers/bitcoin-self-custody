# Stub replacement for picamera-based PiVideoStream
# The web emulator uses browser webcam instead

from threading import Thread

class PiVideoStream:
    def __init__(self, resolution=(320, 240), framerate=32, format="bgr", **kwargs):
        self.frame = None
        self.stopped = False

    def start(self):
        return self

    def update(self):
        pass

    def read(self):
        return self.frame

    def stop(self):
        self.stopped = True
