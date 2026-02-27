# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] — 2026-02-26

### Added
- **SeedSigner web emulator** — run real firmware in your browser via WebSocket
  - Webcam QR scanning via WebRTC (camera activates when SeedSigner requests it)
  - Mobile touch support with visual feedback
  - Keyboard help overlay (press `?`)
  - Fullscreen mode
  - Escape key mapped to "back"
  - 4 interactive tutorials: Generate Seed, Explore Settings, Sign Transaction, Export Xpub
  - OG meta tags for social sharing
- **Passport simulator** — setup docs, automation scripts, and Dockerfile
- **"Choosing a Device" comparison guide** — all 5 devices side by side
- **Guide ↔ emulator cross-links** — every device guide links to its emulator
- **GitHub issue/PR templates** — bug reports, guide corrections, feature requests
- **SECURITY.md** — vulnerability reporting policy
- **GitHub Actions CI** — emulator smoke test on Ubuntu

### Changed
- Forked SeedSigner emulator away from enteropositivo dependency (own driver layer)
- Extracted HTML/CSS/JS from server.py into index.html
- Updated emulators README with all 4 devices
- Updated main README with emulators as hero feature

## [0.1.0] — 2026-02-26

### Added
- 9 device setup guides (ColdCard Mk4/Q, Passport, Jade, SeedSigner, Sparrow, steel backup, seed generation, multisig)
- 3 checklists (first setup, backup verification, inheritance planning)
- ColdCard and Jade emulator documentation
- SeedSigner desktop emulator setup scripts
- CONTRIBUTING.md
- Dual license: CC-BY-SA 4.0 (docs) / MIT (code)
