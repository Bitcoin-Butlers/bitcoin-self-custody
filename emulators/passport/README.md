# Passport Simulator

Run Foundation Passport firmware on your desktop. Uses the official simulator from the [passport2](https://github.com/Foundation-Devices/passport2) repository.

## Requirements

- Ubuntu 20.04+ or macOS
- Rust 1.77.1
- Python 3.8+
- SDL2
- OpenCV (for webcam/camera simulation)
- `just` command runner

## Quick Start

```bash
# Automated setup (installs deps, clones passport2, builds simulator)
bash setup.sh

# Run the simulator
bash run.sh
```

## Manual Setup

### Ubuntu/Debian

```bash
# System dependencies
sudo apt install -y \
  gcc-arm-none-eabi \
  autotools-dev automake \
  libusb-1.0-0-dev libtool \
  python3-virtualenv \
  libsdl2-dev pkg-config curl \
  xterm

# Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default 1.77.1
rustup target add thumbv7em-none-eabihf
cargo install cbindgen
cargo install just

# Clone and build
git clone https://github.com/Foundation-Devices/passport2.git
cd passport2
make -C mpy-cross
pip install Pillow==8.4.0 opencv-python

# Run
cd simulator
just sim color    # Color display (Batch 2+)
# or
just sim mono     # Monochrome (Founder's Edition)
```

### macOS

```bash
# System dependencies
brew install sdl2 pkg-config automake libtool libusb just
brew install --cask gcc-arm-embedded

# Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup default 1.77.1
rustup target add aarch64-unknown-none   # Apple Silicon
rustup target add thumbv7em-none-eabihf
cargo install cbindgen

# Clone and build
git clone https://github.com/Foundation-Devices/passport2.git
cd passport2
make -C mpy-cross
pip install Pillow==8.4.0 opencv-python

# Run
cd simulator
just sim color
```

## Controls

| Input | Action |
|-------|--------|
| Arrow keys | D-pad navigation |
| Enter | Select |
| Escape | Back |
| 0-9 | Keypad digits |
| Webcam | Camera (auto-detected via OpenCV) |

## How It Works

The simulator runs the actual Passport firmware (MicroPython) on your desktop. Hardware components are replaced with software equivalents:

- **Display** — SDL2 window renders the framebuffer
- **Keypad** — keyboard input mapped to Passport buttons
- **Camera** — OpenCV captures webcam frames for QR scanning
- **Secure Element** — software stub (NOT secure, for testing only)
- **microSD** — reads/writes to `./work/microsd/` folder

## Display Modes

- **Color** (`just sim color`) — Passport Batch 2+ with 240x320 color display
- **Mono** (`just sim mono`) — Founder's Edition with monochrome display

## Limitations

- **Desktop only** — requires SDL2 window (no browser mode yet)
- **Heavy build** — needs Rust + C cross-compiler toolchain
- **Testnet only** — never enter a real seed phrase in a simulator
- **Fake secure element** — not cryptographically secure

## Credits

- [Foundation Devices](https://foundationdevices.com) — Passport firmware and simulator (GPL-3.0)
- Setup automation by [Bitcoin Butlers](https://bitcoinbutlers.com)
