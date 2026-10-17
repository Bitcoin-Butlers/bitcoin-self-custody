# Blockstream Jade Emulator

Blockstream provides an official emulator for Jade in their firmware repository. It runs in Docker and provides a web interface.

## Requirements

- Docker
- macOS, Linux or Windows. Docker is the only requirement.

## Setup

```bash
# Clone the Jade firmware repo
git clone --recursive https://github.com/Blockstream/Jade.git
cd Jade

# Build and run the emulator
./run.sh
```

## Usage

Once running, open a web browser and navigate to:

```
http://localhost:30122
```

This gives you a web-based interface to the emulated Jade device. You can:
- Generate seeds
- Navigate menus
- Sign transactions (testnet)
- Practice the full setup flow

## Controls

The web interface provides on-screen buttons that mirror the physical Jade device.

## Notes

- The emulator runs the actual Jade firmware, so it behaves identically to a real device
- Only use testnet for any transaction signing practice
- `run.sh` handles the Docker networking on every platform.
- Every Jade and Jade Plus screen in the lesson library was captured on macOS with this script, on 2026-10-01.

## Source

- [Blockstream/Jade on GitHub](https://github.com/Blockstream/Jade)
- License: MIT
