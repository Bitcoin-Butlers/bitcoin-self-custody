# Blockstream Jade Emulator

Blockstream provides an official emulator for Jade in their firmware repository. It runs in Docker and provides a web interface.

## Requirements

- Docker
- Linux (the official emulator script uses Linux-specific Docker networking)

## Setup

```bash
# Clone the Jade firmware repo
git clone --recursive https://github.com/Blockstream/Jade.git
cd Jade

# Build and run the emulator
./run_emulator.sh
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
- macOS/Windows users will need to adjust Docker networking (the script assumes Linux)
- For macOS, you may need to modify `run_emulator.sh` to use `host.docker.internal` instead of `--network host`

## Source

- [Blockstream/Jade on GitHub](https://github.com/Blockstream/Jade)
- License: MIT
