# Hardware Wallet Emulators

Practice Bitcoin self-custody without owning the hardware. These emulators run actual device firmware on your desktop.

## Available Emulators

| Device | Type | Platform | Setup Effort |
|--------|------|----------|-------------|
| [SeedSigner](seedsigner/) | Desktop app (Python + tkinter) | macOS, Linux, Windows | **Easy** — run `setup.sh` |
| [Jade](jade/) | Docker + web UI | Linux (Docker) | Medium |
| [ColdCard](coldcard/) | Desktop app (SDL) | macOS, Linux | Hard (C toolchain required) |

## Quick Start: SeedSigner (Easiest)

```bash
cd emulators/seedsigner
bash setup.sh    # one-time setup
bash run.sh      # launch emulator
```

Arrow keys to navigate, Enter to select, 1/2/3 for physical buttons.

## Why Emulators?

- **Practice before you buy.** See exactly what the device experience is like.
- **Learn without risk.** Make mistakes on testnet, not with real Bitcoin.
- **Stay current.** Emulators run real firmware, so they update with the device.
- **Develop and test.** Build wallet integrations without physical hardware.

## What's NOT Here Yet

- **Passport** — no emulator exists for Foundation Passport. If you're interested in building one, open an issue.
- **Browser-based versions** — all current emulators are desktop apps. Web-based versions are on the roadmap.

## Contributing

We'd love help with:
- Dockerizing the ColdCard simulator for easier setup
- Building a Passport emulator (MicroPython on STM32, LVGL UI)
- Wrapping desktop emulators in web frontends (noVNC, WebSocket canvas)
- Testing on Windows

## Safety

These emulators are for **learning and testing only**. Never enter a real seed phrase or use mainnet with an emulator. Treat emulator environments as compromised by default.
