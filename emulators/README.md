# Hardware Wallet Emulators

Practice Bitcoin self-custody without owning the hardware. These emulators run actual device firmware on your computer.

## Available Emulators

| Device | Type | Platform | Setup |
|--------|------|----------|-------|
| [SeedSigner](seedsigner/) | **Web (browser)** | macOS, Linux | **Easy** — `setup.sh` + open browser |
| [Passport](passport/) | Desktop (SDL) | macOS, Linux | Medium (Rust + C toolchain) |
| [ColdCard](coldcard/) | Desktop (SDL) | macOS, Linux | Hard (C toolchain) |
| [Jade](jade/) | Docker + web UI | Linux (Docker) | Medium |

## Quick Start: SeedSigner (Easiest)

```bash
cd emulators/seedsigner
bash setup.sh    # one-time setup
bash run.sh      # launch emulator
# Open http://localhost:8888
```

Arrow keys to navigate, Enter to select, 1/2/3 for side buttons. Webcam activates automatically for QR scanning.

## Why Emulators?

- **Practice before you buy.** See exactly what the device experience is like.
- **Learn without risk.** Make mistakes on testnet, not with real Bitcoin.
- **Stay current.** Emulators run real firmware, so they update with the device.
- **Develop and test.** Build wallet integrations without physical hardware.

## Contributing

We'd love help with:
- Testing emulators on different platforms
- Web-wrapping desktop emulators (Passport, ColdCard) for browser access
- Dockerizing build processes for easier setup
- Writing interactive tutorials

## Safety

These emulators are for **learning and testing only**. Never enter a real seed phrase or use mainnet with an emulator. Treat emulator environments as compromised by default.
