"""
Virtual GPIO for Pyodide SeedSigner emulator.
Simulates RPi.GPIO pin states for button input.
"""

class GPIO:
    BCM = 11
    BOARD = 10
    IN = 0
    OUT = 1
    PUD_UP = 22
    PUD_DOWN = 21
    HIGH = 1
    LOW = 0
    RISING = 31
    FALLING = 32

    _pins = {}
    _callbacks = {}

    @classmethod
    def setmode(cls, mode):
        pass

    @classmethod
    def setup(cls, pin, mode, pull_up_down=None, initial=None):
        if isinstance(pin, (list, tuple)):
            for p in pin:
                cls._pins[p] = cls.HIGH
        else:
            cls._pins[pin] = cls.HIGH

    @classmethod
    def input(cls, pin):
        return cls._pins.get(pin, cls.HIGH)

    @classmethod
    def output(cls, pin, value):
        cls._pins[pin] = value

    @classmethod
    def set_input(cls, pin, value):
        cls._pins[pin] = value

    @classmethod
    def add_event_detect(cls, pin, edge, callback=None, bouncetime=None):
        if callback:
            cls._callbacks[pin] = callback

    @classmethod
    def cleanup(cls):
        pass
