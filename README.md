# Bitcoin Self-Custody Tutorials

Free, open-source guides and device emulators for securing your own Bitcoin. Step by step, device in hand.

[![License: CC BY-SA 4.0](https://img.shields.io/badge/Docs-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Emulator Test](https://github.com/Bitcoin-Butlers/bitcoin-self-custody/actions/workflows/emulator-test.yml/badge.svg)](https://github.com/Bitcoin-Butlers/bitcoin-self-custody/actions/workflows/emulator-test.yml)

## What This Is

A complete, beginner-friendly tutorial site for Bitcoin self-custody. Covers seed generation, signing devices, wallet software, steel backups, and multisig - with browser-based device emulators so you can practice before buying hardware.

No tracking. No paywalls. No affiliate links. No sales CTAs.

**Maintained by [Bitcoin Butlers](https://bitcoinbutlers.com)**

## Live Site

Static tutorial site with hash-based routing, markdown rendering, device-specific dropdown selectors, and glossary tooltips for technical terms. Serve locally:

```bash
cd bitcoin-self-custody && python3 -m http.server 9000
# Open http://localhost:9000
```

## Emulators

Practice with real device firmware in your browser. No hardware needed.

| Device | Approach | Status | Reference |
|--------|----------|--------|-----------|
| [SeedSigner](emulators/seedsigner/) | Pyodide (Python in browser via WASM) | **Working** - webcam QR, mobile touch, tutorials | [SeedSigner/seedsigner](https://github.com/SeedSigner/seedsigner) |
| [ColdCard Mk4/Q](emulators/coldcard/) | Docker + noVNC (SDL simulator wrapped) | Planned - Dockerfile + scripts ready | [Coldcard/firmware](https://github.com/Coldcard/firmware) `unix/simulator.py` |
| [Jade](emulators/jade/) | Docker + QEMU web display | Planned - official `Dockerfile.qemu` with `--webdisplay` | [Blockstream/Jade](https://github.com/BlockstreamResearch/Jade) |
| [Passport](emulators/passport/) | Docker + noVNC (SDL simulator wrapped) | Planned - Dockerfile + scripts ready | [Foundation-Devices/passport2](https://github.com/Foundation-Devices/passport2) `simulator/` |

SeedSigner works fully client-side (no server) because its firmware is pure Python. ColdCard, Jade, and Passport are C firmware requiring QEMU/Docker and a host server to run.

## Guides

### Seed Generation

| Guide | Method |
|-------|--------|
| [Hardware Wallet](guides/gen-hardware-wallet.md) | Let your device generate the seed |
| [Seed Picker Cards](guides/gen-seed-picker.md) | Shuffle physical BIP-39 word cards |
| [Dice Rolls](guides/gen-dice-rolls.md) | 99 rolls for 256-bit entropy |
| [Camera Entropy](guides/gen-camera-entropy.md) | SeedSigner hashes a photo |
| [Entropia Pills](guides/gen-entropia-pills.md) | 3D-printed capsules with BIP-39 words |
| [Codex32](guides/gen-codex32.md) | Pen-and-paper generation with hand-verifiable checksums |
| [Seed Generation Overview](guides/seed-generation.md) | All 6 methods compared |

Each guide includes device-specific steps via dropdown selectors (SeedSigner, ColdCard Q, ColdCard Mk4, Jade, Passport) with direct links to each device's open-source code.

### Signing Devices

| Guide | Device |
|-------|--------|
| [SeedSigner](guides/seedsigner.md) | SeedSigner / SeedSigner+ |
| [ColdCard Q](guides/coldcard-q.md) | Coinkite ColdCard Q |
| [ColdCard Mk4](guides/coldcard-mk4.md) | Coinkite ColdCard Mk4 |
| [Passport](guides/passport.md) | Foundation Passport |
| [Jade](guides/jade.md) | Blockstream Jade / Jade Plus |
| [Compare Devices](guides/choosing-a-device.md) | All 5 side by side |

### Software

| Guide | Software |
|-------|----------|
| [Sparrow Wallet](guides/sparrow-wallet.md) | Desktop coordinator for single-sig and multisig |
| [Bull Bitcoin](guides/bull-bitcoin.md) | Non-custodial hot wallet |
| [Multisig with Sparrow](guides/multisig-sparrow.md) | 2-of-3 multi-vendor multisig |

### Backup (At Rest)

| Guide | Topic |
|-------|-------|
| [Steel Backup](guides/steel-backup.md) | Single-sig and multisig steel plate backups |

### Checklists

| Checklist | For |
|-----------|-----|
| [First Setup](checklists/first-setup.md) | Just got a device? Start here. |
| [Backup Verification](checklists/backup-verification.md) | Prove your backup works before you need it. |
| [Inheritance Planning](checklists/inheritance-planning.md) | Make sure your Bitcoin outlives you. |

## Roadmap

### Done
- [x] 17 guides: 6 seed generation methods, 5 signing devices, 3 wallet/multisig, steel backup, device comparison, seed overview
- [x] 3 checklists: first setup, backup verification, inheritance planning
- [x] Codex32 (BIP-93) guide with Shamir splitting and hand-verifiable checksums
- [x] SeedSigner web emulator (Pyodide/WASM - real firmware in browser, webcam QR, mobile touch, guided tutorials)
- [x] Device-specific dropdown selectors with GitHub source code links ([seed.py](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py), [seed.py](https://github.com/Coldcard/firmware/blob/master/shared/seed.py), [random.c](https://github.com/BlockstreamResearch/Jade/blob/master/components/random/random.c), [SECURITY.md](https://github.com/Foundation-Devices/passport2/blob/main/SECURITY.md))
- [x] FOSS vs source-available licensing distinction in device comparison
- [x] Tutorial site: hash routing, glossary tooltips, browser history navigation, internal link routing
- [x] GitHub Pages CI deployment

### Next (grant-dependent)
- [ ] ColdCard web emulator - Docker + noVNC wrapping MicroPython/SDL simulator (Dockerfile + scripts ready, blocked by upstream submodule TLS issue)
- [ ] Jade web emulator - Docker + QEMU with `--webdisplay` (official Dockerfile.qemu, needs linux/amd64 host for build)
- [ ] Passport web emulator - Docker + noVNC wrapping SDL simulator (Dockerfile + scripts ready, build not started)
- [ ] Emulator VPS hosting (C firmware emulators require a server, unlike SeedSigner's client-side WASM)
- [ ] Shamir backup guide (beyond Codex32)
- [ ] Passphrase guide (25th word)
- [ ] Video walkthroughs
- [ ] Translations (Spanish, Portuguese, Japanese priority)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to help:**
- Fix errors or outdated info in guides
- Test emulators on different platforms
- Add screenshots or diagrams
- Translate guides
- Build new emulator integrations

## License

- **Documentation** (guides, checklists): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Code** (emulators, scripts): [MIT](LICENSE)
