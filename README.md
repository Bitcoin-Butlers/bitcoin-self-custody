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

| Device | Type | Status |
|--------|------|--------|
| [SeedSigner](emulators/seedsigner/) | Web (browser) | Working - webcam QR scanning |
| [ColdCard Mk4/Q](emulators/coldcard/) | SDL (desktop) | Setup docs |
| [Jade](emulators/jade/) | Docker (QEMU web UI) | Setup scripts ready |
| [Passport](emulators/passport/) | Docker (SDL) | Setup docs + Dockerfile |

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
- [x] 6 seed generation guides with device-specific steps and source code links
- [x] 5 signing device setup guides
- [x] Device comparison guide (FOSS vs source-available licensing, multi-vendor multisig)
- [x] Steel backup guide (single-sig + multisig)
- [x] Sparrow, Bull Bitcoin, and multisig guides
- [x] 3 checklists (first setup, backup verification, inheritance)
- [x] Codex32 (BIP-93) guide with Shamir splitting
- [x] SeedSigner web emulator (real firmware in browser, webcam QR, mobile touch)
- [x] ColdCard, Jade, Passport emulator setup docs and automation
- [x] Tutorial site with BB theming, hash routing, dropdown device selectors
- [x] Glossary tooltip system for technical terms
- [x] Internal link routing (all .md and hash links work via JS)

### Next
- [ ] Jade QEMU web emulator (Docker build ready, needs testing)
- [ ] ColdCard web emulator (SDL wrapper needed)
- [ ] Passport web emulator (Docker + noVNC)
- [ ] Shamir backup guide (beyond Codex32)
- [ ] Passphrase guide (25th word)
- [ ] Video walkthroughs
- [ ] Translations (Spanish, Portuguese, Japanese priority)
- [ ] Hosted version (static site + emulator VPS)

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
