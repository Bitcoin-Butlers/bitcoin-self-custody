# Guide Audit Report
*Audited: 2026-02-26 | Against official manufacturer documentation*

---

## coldcard-mk4.md
- **Firmware in guide:** v5.4.5 (Nov 2025) | **Current:** v5.4.5 ✅
- **Accurate:** Tamper-evident bag process, PIN setup (prefix/suffix), USB-C power, MicroSD backup, NFC features, Sparrow pairing via file export
- **No issues found**

## coldcard-q.md
- **Firmware in guide:** v1.3.5Q | **Current:** v1.3.5Q ✅
- **Accurate:** QR scanning, full QWERTY keyboard, battery power (3x AAA), MicroSD + NFC + QR, Sparrow pairing
- **No issues found**

## passport.md
- **No firmware version hardcoded** (says "Passport Core, current model") ✅
- **Accurate:** QR-only air gap, Envoy companion app, MicroSD for firmware updates, Foundation supply chain verification
- **No issues found**

## jade.md
- **Firmware in guide:** was v1.0.38+ | **Updated to:** v1.0.39 (Feb 2026) ✅
- **Accurate:** Virtual Secure Element (blind oracle model), QR scanning on both Jade and Jade Plus, stateless mode, anti-rollback
- **Fixed:** Updated firmware version from v1.0.38+ to v1.0.39

## seedsigner.md
- **Release in guide:** "Bigger Picture" (Jun 2025) | **Current:** same ✅
- **Accurate:** Stateless operation, camera entropy, SeedQR format, no WiFi/Bluetooth drivers, larger display support
- **No issues found**

## sparrow-wallet.md
- **No version hardcoded** (links to sparrowwallet.com/download) ✅
- **Current Sparrow version:** 2.4.1 (Feb 2026)
- **Accurate:** Connection methods (public server, Bitcoin Core, private Electrum), coin control, PSBT signing, multisig support
- **No issues found**

## steel-backup.md
- **No firmware/version dependency** ✅
- **Accurate:** Stamping vs etching comparison, single-sig vs multisig plate layouts, storage recommendations
- **No issues found**

## seed-generation.md
- **No firmware/version dependency** ✅
- **Accurate:** 5 methods (device RNG, dice, Seed Picker cards, Entropia Pills, SeedSigner camera entropy), BIP-39 standard
- **No issues found**

## multisig-sparrow.md
- **No firmware/version dependency** ✅
- **Accurate:** 2-of-3 setup process, geographic key distribution, PSBT signing workflow, recovery scenarios
- **Bull Bitcoin section removed** (separate commit, per brand voice rules)
- **No remaining issues**

---

## Summary
- **9 guides audited**
- **1 fix applied:** Jade firmware version updated to v1.0.39
- **0 inaccuracies found** in setup procedures or feature claims
- All firmware versions current as of Feb 2026
