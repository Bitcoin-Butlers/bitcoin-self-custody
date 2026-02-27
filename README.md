# Bitcoin Self-Custody Documentation

Free, open-source guides and emulators for securing your own Bitcoin. Device in hand, step by step.

[![License: CC BY-SA 4.0](https://img.shields.io/badge/Docs-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![License: MIT](https://img.shields.io/badge/Code-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Emulator Test](https://github.com/Bitcoin-Butlers/bitcoin-self-custody/actions/workflows/emulator-test.yml/badge.svg)](https://github.com/Bitcoin-Butlers/bitcoin-self-custody/actions/workflows/emulator-test.yml)

## What This Is

Setup guides, backup checklists, and **browser-based hardware wallet emulators** for Bitcoin self-custody. Practice signing transactions, generating seeds, and navigating device menus without buying hardware first.

No tracking. No paywalls. No affiliate links.

**Maintained by [Bitcoin Butlers](https://bitcoinbutlers.com)** — a platform connecting self-custody experts with people who need hands-on help.

## 🖥️ Emulators

Practice with real device firmware in your browser. No hardware needed.

| Device | Type | Status |
|--------|------|--------|
| [SeedSigner](emulators/seedsigner/) | Web (browser) | ✅ Working — webcam QR scanning |
| [ColdCard Mk4/Q](emulators/coldcard/) | SDL (desktop) | 📖 Setup docs |
| [Jade](emulators/jade/) | Docker (web UI) | 📖 Setup docs |
| Passport | — | 🔬 Research |

**SeedSigner web emulator** runs the actual firmware in your browser via WebSocket. Navigate menus with arrow keys, scan QR codes with your webcam. [Get started →](emulators/seedsigner/)

<!-- TODO: Add screenshot/GIF of emulator running -->

## 📖 Guides

### Getting Started

| Guide | For |
|-------|-----|
| [Choosing a Device](guides/choosing-a-device.md) | **Start here.** Compare all 5 signing devices side by side. |

### Signing Devices

| Guide | Device |
|-------|--------|
| [ColdCard Mk4](guides/coldcard-mk4.md) | Coinkite ColdCard Mk4 |
| [ColdCard Q](guides/coldcard-q.md) | Coinkite ColdCard Q |
| [Passport](guides/passport.md) | Foundation Passport |
| [Jade](guides/jade.md) | Blockstream Jade & Jade Plus |
| [SeedSigner](guides/seedsigner.md) | SeedSigner & SeedSigner+ |

### Software

| Guide | Software |
|-------|----------|
| [Sparrow Wallet](guides/sparrow-wallet.md) | Sparrow Desktop |

### Backup & Security

| Guide | Topic |
|-------|-------|
| [Steel Backup](guides/steel-backup.md) | Metal seed backup plates |
| [Seed Generation](guides/seed-generation.md) | 5 methods compared |

### Advanced

| Guide | Topic |
|-------|-------|
| [Multisig with Sparrow](guides/multisig-sparrow.md) | 2-of-3 multisig setup |

## ✅ Checklists

| Checklist | For |
|-----------|-----|
| [First Setup](checklists/first-setup.md) | Just got a device? Start here. |
| [Backup Verification](checklists/backup-verification.md) | Prove your backup works before you need it. |
| [Inheritance Planning](checklists/inheritance-planning.md) | Make sure your Bitcoin doesn't die with you. |

## Roadmap

- [x] Device setup guides (5 devices + Sparrow + backup + seed gen + multisig)
- [x] Backup and security checklists
- [x] SeedSigner web emulator with webcam QR scanning
- [x] ColdCard, Jade, and Passport emulator documentation + setup automation
- [x] Passport Docker build (no local toolchain required)
- [x] Guide ↔ emulator cross-links
- [x] Mobile touch support + keyboard help overlay + fullscreen mode
- [x] Interactive tutorials (Generate a Seed Phrase, Explore Settings)
- [ ] Video walkthroughs
- [ ] Translations

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

**Ways to help:**
- Fix errors or outdated info
- Test emulators on different platforms
- Add screenshots or diagrams
- Translate guides
- Build new emulator integrations

## License

- **Documentation** (guides, checklists): [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Code** (emulators, scripts): [MIT](LICENSE)

## Need Hands-On Help?

These guides are designed to be self-sufficient. But if you want a real person walking you through it, [Bitcoin Butlers](https://bitcoinbutlers.com) connects you with experts who show you how, step by step.

We hold your hand, not your keys.
