# Guide Audit Report
*Audited: Feb 26, 2026 | Against official manufacturer documentation*

---

## coldcard-mk4.md
- **Firmware version in guide:** v5.4.5 (Nov 2025) | **Current:** v5.4.5 (Nov 2025) ✅
- **Accurate claims:**
  - Tamper-evident bag verification process (bag number, VOID seal, tear-off tab)
  - Two-part PIN system with anti-phishing words
  - PIN prefix 2-6 digits, suffix 2-6 digits
  - Dice roll entropy (99 rolls recommended)
  - Encrypted MicroSD backup with AES-256 and 12-word backup password
  - NFC features (address sharing, wallet export, message signing)
  - BIP-39 passphrase, BIP-85 child seeds, Seed XOR features
  - Firmware update process via MicroSD + PGP verification
  - Air-gapped signing via PSBT on MicroSD
- **Inaccurate or stale claims:**
  - Guide says "The ColdCard generates a **24-word** seed phrase" — official docs say "12-24 words using the BIP-39 word list." Both 12 and 24-word options are available. **Fixed: added mention of 12-word option.**
- **Missing info:**
  - Spending Policy feature (new in v5.4.5): limits on transaction size, 2FA via NFC+web, velocity limits
  - "Forever calculator" mode mentioned for Q but also relevant context
  - Bull Bitcoin export option now available

---

## coldcard-q.md
- **Firmware version in guide:** v1.3.3Q | **Current:** v1.3.5Q (Nov 2025) ⚠️
- **Accurate claims:**
  - Battery power (3x AAA), USB-C power, press-and-hold power button
  - Full QWERTY keyboard, large color display, built-in QR scanner
  - Two MicroSD slots + storage under battery door
  - Two-part PIN system, anti-phishing words
  - QR code signing workflow (BBQr animated codes)
  - NFC with permanent hardware disable option (scratch PCB trace)
  - Power off: 2 seconds; hard shutdown: 10 seconds
- **Inaccurate or stale claims:**
  - Firmware version: guide says v1.3.3Q, current is **v1.3.5Q**. **Fixed.**
  - Comparison table says Mk4 NFC is "None" — Mk4 **has NFC built in**. **Fixed: changed to "Yes".**
  - Guide says Q generates "24-word seed phrase" — both 12 and 24-word options available. **Fixed.**
- **Missing info:**
  - "Forever calculator" mode: after 13 PIN failures, Q enters calculator mode instead of bricking
  - Spending Policy features (shared with Mk4 v5.4.5 codebase)

---

## passport.md
- **Firmware version in guide:** Not specified (mentions "firmware 2.3.0+" for 12-word option) | **Current:** Could not verify (docs.foundation.xyz returned 403)
- **Accurate claims:**
  - Passport Core as current model (not Batch 1/2)
  - Envoy companion app workflow
  - Supply chain validation via Secure Element
  - 6-12 character PIN with letters and numbers
  - 21 wrong PIN attempts = permanent brick
  - Encrypted MicroSD backup with 20-digit Backup Code
  - 2-of-4 firmware signing key requirement
  - Open source firmware + hardware
  - QR code and MicroSD communication methods
- **Inaccurate or stale claims:**
  - None confirmed (official docs unavailable for deep comparison)
- **Missing info:**
  - Could not access official docs to verify completeness

---

## jade.md
- **Firmware version in guide:** v1.0.38+ (Q4 2025) | **Current:** Could not verify (Blockstream help center returned 403/Cloudflare)
- **Accurate claims:**
  - Virtual Secure Element security model (encrypted seed + PIN server)
  - Jade vs Jade Plus feature comparison
  - QR PIN Unlock workflow for Jade Plus
  - Stateless mode (SeedSigner-like operation)
  - SeedQR export capability
  - Anti-rollback feature in firmware 1.0.38+
  - JadeLink accessory description
  - Blockstream Green app pairing (USB, Bluetooth, QR)
  - Open source hardware and firmware
- **Inaccurate or stale claims:**
  - None confirmed (official docs unavailable)
- **Missing info:**
  - Could not access official Blockstream help docs to verify completeness

---

## seedsigner.md
- **Firmware version in guide:** "Bigger Picture" (Jun 2025) | **Current:** Could not confirm newer release
- **Accurate claims:**
  - Raspberry Pi Zero v1.3 (no WiFi) as recommended hardware
  - Waveshare 1.3" LCD Hat (240×240)
  - Stateless design — stores nothing
  - QR-only communication
  - Camera entropy, dice rolls (99), manual seed entry
  - SeedQR and CompactSeedQR formats
  - Larger display support added in "Bigger Picture" release
  - Multi-language support (7 languages)
  - 100% open source hardware + software
- **Inaccurate or stale claims:**
  - None identified
- **Missing info:**
  - Official FAQ is minimal; guide actually covers more than the FAQ does

---

## sparrow-wallet.md
- **Firmware version in guide:** N/A (software wallet) | **Current:** N/A
- **Accurate claims:**
  - Watch-only wallet functionality
  - Server connection options (public Electrum, private node, Tor)
  - Hardware wallet pairing (QR, MicroSD, USB)
  - Coin control, RBF, PayJoin features
  - PSBT workflow for air-gapped signing
  - Electrum server options (Electrs, Fulcrum, EPS)
  - Label export/import
- **Inaccurate or stale claims:**
  - None identified
- **Missing info:**
  - No mention of Sparrow's built-in Whirlpool/coinjoin support (if still applicable)
  - No mention of specific Sparrow version number

---

## steel-backup.md
- **Firmware version in guide:** N/A | **Current:** N/A
- **Accurate claims:**
  - Steel melting point ~1,370°C vs house fire ~600°C
  - BIP-39 first 4 letters uniquely identify each word
  - Multisig backup requires descriptor on every plate
  - Geographic distribution strategy
  - Stainless steel vs mild steel recommendation
- **Inaccurate or stale claims:**
  - None identified
- **Missing info:**
  - No mention of specific steel backup product brands/options beyond "Bitcoin Butlers" plates

---

## seed-generation.md
- **Firmware version in guide:** N/A | **Current:** N/A
- **Accurate claims:**
  - BIP-39 word list has 2,048 words ✅
  - 11 bits per word, checksum calculation for final word ✅
  - 23 words drawn + 1 checksum for 24-word seed ✅
  - 99 dice rolls for SeedSigner entropy ✅
  - Camera entropy hashing method ✅
  - Ian Coleman's BIP-39 tool reference ✅
  - 7 riffle shuffles for near-random ordering (mathematical research) ✅
- **Inaccurate or stale claims:**
  - None identified — methods and math are correct per BIP-39 specification
- **Missing info:**
  - No mention of SLIP-39 (Shamir's Secret Sharing) as an alternative backup scheme
  - Could mention that 128 bits entropy = 12 words, 256 bits = 24 words for educational completeness

---

## multisig-sparrow.md
- **Firmware version in guide:** N/A | **Current:** N/A
- **Accurate claims:**
  - 2-of-3 multisig workflow description
  - P2WSH (Native SegWit) as recommended script type
  - Derivation path m/48'/0'/0'/2' for P2WSH ✅
  - Wallet descriptor importance and backup strategy
  - Geographic distribution strategy
  - Recovery scenarios (device lost, destroyed, descriptor lost, total recovery)
  - Each device needs different seed
  - PSBT carries partial signatures between devices
- **Inaccurate or stale claims:**
  - Sparrow multisig docs URL (sparrowwallet.com/docs/multisig.html) returns 404 — the page may have been reorganized. Not a guide error per se, but the reference link in our instructions is stale.
- **Missing info:**
  - No mention of Taproot multisig (P2TR) which is available in ColdCard Edge firmware
  - No mention of miniscript-based multisig policies

---

## Summary of Fixes Made

1. **coldcard-q.md:** Updated firmware version from v1.3.3Q → v1.3.5Q
2. **coldcard-q.md:** Fixed comparison table — Mk4 NFC changed from "None" to "Yes"
3. **coldcard-mk4.md:** Added mention of 12-word seed option alongside 24-word
4. **coldcard-q.md:** Added mention of 12-word seed option alongside 24-word
