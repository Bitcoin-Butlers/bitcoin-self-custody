# SeedSigner Web Emulator

Run SeedSigner in your browser. No Raspberry Pi needed.

## Requirements

- Python 3.9+
- macOS, Linux, or Windows
- A web browser

### macOS Setup

```bash
# Install system dependencies
brew install python-tk zbar

# Run setup
bash setup.sh

# Launch the emulator
bash run.sh
```

Then open **http://localhost:8888** in your browser.

### Ubuntu/Debian Setup

```bash
sudo apt install python3-tk libzbar0
bash setup.sh
bash run.sh
```

## Controls

| Input | Action |
|-------|--------|
| Arrow keys | Navigate menus (joystick) |
| Enter | Select |
| 1, 2, 3 | Side buttons |

On-screen buttons also work with mouse/touch.

## How It Works

The emulator runs the actual SeedSigner firmware (Python) on your desktop, with the hardware display replaced by a web-based canvas. A lightweight WebSocket server streams the display output to your browser at ~20fps, and sends button presses back.

This means you're interacting with the real SeedSigner code, not a simulation. Menu flows, seed generation, and signing logic are identical to the physical device.

## Limitations

- **No camera/QR scanning** — the emulator can't access your webcam for QR code input (yet)
- **Testnet only** — never enter a real seed phrase in an emulator
- **Display only** — no NFC, no MicroSD simulation

## Credits

- [SeedSigner](https://github.com/SeedSigner/seedsigner) — the original firmware (MIT license)
- [enteropositivo/seedsigner-emulator](https://github.com/enteropositivo/seedsigner-emulator) — desktop display driver concept
- Web adaptation by [Bitcoin Butlers](https://bitcoinbutlers.com)
