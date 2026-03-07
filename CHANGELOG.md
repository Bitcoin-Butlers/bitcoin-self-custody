# Changelog

All notable changes to this project will be documented in this file.

## [0.3.0] - 2026-03-06

### Added
- **6 dedicated seed generation guides** - hardware wallet, seed picker cards, dice rolls, camera entropy, entropia pills, codex32
- **Codex32 (BIP-93) guide** - pen-and-paper seed generation with hand-verifiable checksums and Shamir splitting
- **Bull Bitcoin guide** - non-custodial hot wallet setup
- **Jade emulator setup scripts** - Docker QEMU build with web display
- **Device-specific GitHub source links** - each device dropdown links to the exact source file for seed generation/handling
- **Glossary tooltip system** - auto-wraps technical terms with hover definitions (seed phrase, BIP-39, entropy, xpub, checksum, air-gapped, secure element, virtual secure element, multisig, single-sig, PSBT, derivation path, wallet descriptor, stateless, hot wallet, PIN)
- **Browser history navigation** - back button returns to previous page, not always home
- **Internal link routing** - .md links, emulator links, and hash links all route through JS

### Changed
- **Nav simplified** - logo + brand name only, no nav link buttons
- **Guide titles** - category in gold gradient, name in white, back arrow inline
- **Device comparison** - removed hardcoded prices, added FOSS vs source-available distinction, substantiated multisig with multi-vendor rationale, removed opinionated recommendation sections
- **Tooltips show below** text (not above) with z-index 200 to avoid nav overlap
- **All occurrences** of glossary terms get tooltips (not just first)
- Removed "Bitcoin Butlers Master Concierge" from all guides
- Removed all em dashes across entire codebase (replaced with hyphens)
- Removed all CTA/booking language

## [0.2.0] - 2026-02-26

### Added
- **SeedSigner web emulator** - run real firmware in your browser via WebSocket
  - Webcam QR scanning via WebRTC (camera activates when SeedSigner requests it)
  - Mobile touch support with visual feedback
  - Keyboard help overlay (press `?`)
  - Fullscreen mode
  - Escape key mapped to "back"
  - 4 interactive tutorials: Generate Seed, Explore Settings, Sign Transaction, Export Xpub
  - OG meta tags for social sharing
- **Passport simulator** - setup docs, automation scripts, and Dockerfile
- **"Choosing a Device" comparison guide** - all 5 devices side by side
- **Guide ↔ emulator cross-links** - every device guide links to its emulator
- **GitHub issue/PR templates** - bug reports, guide corrections, feature requests
- **SECURITY.md** - vulnerability reporting policy
- **GitHub Actions CI** - emulator smoke test on Ubuntu

### Changed
- Forked SeedSigner emulator away from enteropositivo dependency (own driver layer)
- Extracted HTML/CSS/JS from server.py into index.html
- Updated emulators README with all 4 devices
- Updated main README with emulators as hero feature

## [0.1.0] - 2026-02-26

### Added
- 9 device setup guides (ColdCard Mk4/Q, Passport, Jade, SeedSigner, Sparrow, steel backup, seed generation, multisig)
- 3 checklists (first setup, backup verification, inheritance planning)
- ColdCard and Jade emulator documentation
- SeedSigner desktop emulator setup scripts
- CONTRIBUTING.md
- Dual license: CC-BY-SA 4.0 (docs) / MIT (code)
