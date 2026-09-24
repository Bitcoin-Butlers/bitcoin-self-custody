# Bitcoin Self-Custody Tutorials

Free, open-source guides and device emulators for securing your own Bitcoin. Step by step, device in hand.

[![License: CC BY-SA 4.0](https://img.shields.io/badge/Docs-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Emulator Test](https://github.com/Bitcoin-Butlers/bitcoin-self-custody/actions/workflows/emulator-test.yml/badge.svg)](https://github.com/Bitcoin-Butlers/bitcoin-self-custody/actions/workflows/emulator-test.yml)

## What This Is

A beginner-friendly tutorial site for Bitcoin self-custody. The concierge can compare approaches or let you choose each setup layer. It then builds one tutorial from the maintained guides. The site also includes browser-based device emulators so you can practice before buying hardware.

No tracking. No paywalls. No affiliate links. No sales CTAs.

**Maintained by [Bitcoin Butlers](https://bitcoinbutlers.com)**

## Integration

Want to use these guides in your own product? See **[INTEGRATION.md](INTEGRATION.md)** for the concierge manifest API, guide fetching, device filtering, and caching recommendations.

## Live Site

**[bitcoin-butlers.github.io/bitcoin-self-custody](https://bitcoin-butlers.github.io/bitcoin-self-custody/)**

Or run locally: `python3 -m http.server 9000`

## Emulators

Practice with real device firmware in your browser. No hardware needed.

| Device | Approach | Status | Reference |
|--------|----------|--------|-----------|
| [SeedSigner](emulators/seedsigner/) | Pyodide (Python in browser via WASM) | **Working** - webcam QR, mobile touch, tutorials | [SeedSigner/seedsigner](https://github.com/SeedSigner/seedsigner) |
| [Jade](emulators/jade/) | Docker + QEMU web display | Planned - official `Dockerfile.qemu` with `--webdisplay` | [Blockstream/Jade](https://github.com/BlockstreamResearch/Jade) |

SeedSigner works fully client-side (no server) because its firmware is pure Python. Jade is C firmware requiring QEMU/Docker and a host server to run.

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

Each guide includes device-specific steps via dropdown selectors (SeedSigner, Jade) with direct links to each device's open-source code.

### Signing Devices

| Guide | Device |
|-------|--------|
| [SeedSigner](guides/seedsigner.md) | SeedSigner / SeedSigner+ |
| [Jade](guides/jade.md) | Blockstream Jade / Jade Plus |
| [Compare Devices](guides/choosing-a-device.md) | Both side by side |

### Software

| Guide | Software |
|-------|----------|
| [Sparrow Wallet](guides/sparrow-wallet.md) | Desktop coordinator for single-sig and multisig |
| [Bull Bitcoin](guides/bull-bitcoin.md) | Non-custodial hot wallet |
| [Multisig with Sparrow](guides/multisig-sparrow.md) | 2-of-3 multisig with optional signer diversity |
| [Multisig with Bitcoin Core](guides/multisig-bitcoin-core.md) | 2-of-3 multisig using Bitcoin Core descriptor wallets and PSBTs |
| [Bitcoin Core Wallet](guides/bitcoin-core-wallet.md) | Online Bitcoin Core wallet for learning or active use |
| [Offline Bitcoin Core](guides/bitcoin-core-offline.md) | Two-computer offline signing with PSBTs |
| [Bitcoin Core Multisig Signer](guides/bitcoin-core-multisig-signer.md) | Use an offline Core key with hardware signers in Sparrow |
| [Bitcoin Core Node](guides/bitcoin-core-node.md) | Private blockchain verification and wallet connection |

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
- [x] Trade-off based concierge with direct-build and guided-comparison routes
- [x] Single-key and multi-key setup models
- [x] Commercial, DIY, online Bitcoin Core, and offline Bitcoin Core signer routes
- [x] Maintained guides for seed generation, signers, software, backups, nodes, and recovery
- [x] 3 checklists: first setup, backup verification, inheritance planning
- [x] Codex32 (BIP-93) guide with Shamir splitting and hand-verifiable checksums
- [x] SeedSigner web emulator (Pyodide/WASM - real firmware in browser, webcam QR, mobile touch, guided tutorials)
- [x] Device-specific dropdown selectors with GitHub source code links ([seed.py](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py), [random.c](https://github.com/BlockstreamResearch/Jade/blob/master/components/random/random.c))
- [x] FOSS vs source-available licensing distinction in device comparison
- [x] Tutorial site: hash routing, glossary tooltips, browser history navigation, internal link routing
- [x] GitHub Pages CI deployment

### Next (grant-dependent)
- [ ] Jade web emulator - Docker + QEMU with `--webdisplay` (official Dockerfile.qemu, needs linux/amd64 host for build)
- [ ] Emulator VPS hosting (C firmware emulators require a server, unlike SeedSigner's client-side WASM)
- [ ] Shamir backup guide (beyond Codex32)
- [ ] Passphrase guide (25th word)
- [ ] Video walkthroughs
- [ ] Translations (Spanish, Portuguese, Japanese priority)

## References

All tutorial content is original. The following external sources are referenced throughout the guides:

### Bitcoin Standards
- [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) - Mnemonic code for deterministic keys ([word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt))
- [BIP-93](https://github.com/bitcoin/bips/blob/master/bip-0093.mediawiki) - Codex32: Shamir secret sharing for seed backup
- [BIP-85](https://github.com/bitcoin/bips/blob/master/bip-0085.mediawiki) - Deterministic entropy from BIP-32 keychains (child seeds)

### Bitcoin Core
- [Managing Wallets](https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md) - Wallet creation and backup
- [Offline Signing Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/offline-signing-tutorial.md) - Two-computer PSBT flow
- [PSBT Documentation](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md) - Partially signed Bitcoin transactions

### Device Firmware (source code linked in guides)
- [SeedSigner/seedsigner](https://github.com/SeedSigner/seedsigner) - `src/seedsigner/models/seed.py` (FOSS, MIT)
- [Blockstream/Jade](https://github.com/BlockstreamResearch/Jade) - `components/random/random.c` (FOSS, MIT)

### Wallet Software
- [Sparrow Wallet](https://sparrowwallet.com) - Desktop coordinator (Apache 2.0)
- [Bull Bitcoin](https://www.bullbitcoin.com) - Non-custodial mobile wallet ([GitHub](https://github.com/nicehash/bullbitcoin-mobile))

### Tools
- [secretcodex32.com](https://secretcodex32.com) - Codex32 worksheets and volvelles
- [Ian Coleman BIP-39 Tool](https://github.com/iancoleman/bip39) - Offline checksum calculator

### Manufacturer Documentation
- Blockstream Green - Jade companion app (iOS/Android)

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
