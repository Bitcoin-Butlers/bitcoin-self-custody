# ColdCard Simulator

Coinkite provides an official simulator in the ColdCard firmware repository. It runs the actual firmware on your desktop with an SDL-based display.

## Requirements

- macOS or Linux
- Python 3
- C compiler (gcc/clang)
- ARM cross-compiler: `gcc-arm-none-eabi`
- SDL2 development libraries

## Setup (macOS)

Based on [this guide](https://medium.com/@yushantripleseven/running-coldcard-simulator-on-macos-apple-silicon-0a0abc13bc15):

```bash
# Install dependencies
brew install automake autogen virtualenv gcc-arm-none-eabi sdl2

# Clone the firmware (large repo, takes a while)
git clone --recursive https://github.com/Coldcard/firmware.git
cd firmware

# Create Python environment
virtualenv -p python3 ENV
source ENV/bin/activate
pip install -U pip
pip install -r requirements.txt

# Build MicroPython cross-compiler
make -C external/micropython/mpy-cross

# Build and run the simulator
cd unix
make setup && make ngu-setup && make
```

## Setup (Ubuntu/Debian)

```bash
# Install system dependencies
sudo apt install build-essential git python3 python3-pip python3-venv \
    libudev-dev gcc-arm-none-eabi libffi-dev xterm swig \
    libpcsclite-dev autoconf libtool libsdl2-dev

# Clone and build (same as macOS from the clone step)
git clone --recursive https://github.com/Coldcard/firmware.git
cd firmware
python3 -m venv ENV
source ENV/bin/activate
pip install -U pip
pip install -r requirements.txt
make -C external/micropython/mpy-cross
cd unix
make setup && make ngu-setup && make
```

## Running

```bash
cd firmware
source ENV/bin/activate
cd unix
./simulator.py
```

This opens an SDL window showing the ColdCard display. Use your keyboard to interact:
- Number keys for PIN entry
- Arrow keys for navigation
- Enter for select

## Supports Both Models

- Default: Mk4 simulator
- For ColdCard Q: check the Makefile for Q1 targets

## Notes

- The simulator runs actual ColdCard firmware, so behavior matches a real device
- Apple Silicon Macs may need Rosetta (`arch -x86_64`) for some build steps
- The build is complex. If you hit issues, check the [firmware repo issues](https://github.com/Coldcard/firmware/issues)
- Only use testnet for any transaction practice

## Source

- [Coldcard/firmware on GitHub](https://github.com/Coldcard/firmware)
- License: MIT (simulator code)
