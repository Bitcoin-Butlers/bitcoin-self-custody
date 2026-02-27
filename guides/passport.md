# Foundation Passport Core — Complete Setup Guide
*Bitcoin Butlers Master Concierge*
*Last verified: Feb 2026 | This guide covers Passport Core (current model), not older Batch 1/2.*

---

> **🖥️ Want to explore the interface first?** The [Passport simulator](../emulators/passport/) runs the official firmware on your desktop.

---

## What You'll Need
- Foundation Passport Core (in sealed outer box)
- USB-C cable (included)
- Industrial MicroSD card (included)
- MicroSD card adapter: Lightning (iPhone) or USB-C (Android) — included
- Pen and the backup card (included)
- Steel backup plate for seed words (recommended)
- Smartphone with Envoy app (recommended but optional)
- 20-30 minutes of uninterrupted time
- A private space with no cameras

---

## What Makes Passport Different?

The Foundation Passport Core is designed around a mobile-first workflow with the Envoy companion app. Key differences from ColdCard:

| Feature | Passport Core |
|---------|--------------|
| Communication | QR codes (camera built in) + MicroSD |
| Companion app | Envoy (iOS/Android) — guides you through everything |
| Backup method | Encrypted MicroSD backup + 20-digit Backup Code (in addition to seed words) |
| PIN | 6-12 characters (letters AND numbers) |
| Security | 21 wrong PIN attempts = device permanently bricked |
| Open source | Fully open source firmware + hardware |

---

## Before You Start

### Verify the Package

#### Outer Box
1. Check the blue security seal on the outer box. It has a unique alphanumeric code.
2. Valid batch codes start with: B799, B862, B863, B1026, B1032, B1269, B1423, B1541, B1585, B1589, B1606, B1721, B1722.
3. The seal cannot be removed without leaving "Void" and "Opened" residue.
4. **Cut through the seal** with scissors (don't peel — cutting preserves the evidence if someone resealed it).

#### Device Box
1. Inside you'll find a shrink-wrapped box in bubble wrap.
2. The device box contains:
   - Passport Core device
   - Setup guide card
   - 2x Foundation stickers
   - Backup card (for your 20-digit Backup Code)
   - Industrial MicroSD card in a case
   - USB-C charge cable
   - Lightning MicroSD adapter (for iPhones)
   - USB-C MicroSD adapter (for Android phones)
3. If anything looks different from expected, contact hello@foundation.xyz.

---

## Step 1: Download Envoy (Recommended)

Envoy is Foundation's companion app. It walks you through every step and manages transactions.

1. **iPhone:** Search "Envoy Foundation" in the App Store.
2. **Android:** Search "Envoy Foundation" on Google Play, or download the APK from foundation.xyz.
3. Open Envoy — it will guide you through pairing with your Passport.

> **Manual setup without Envoy** is possible (docs.foundation.xyz/passport/manual-setup) but Envoy makes everything significantly easier.

---

## Step 2: Supply Chain Validation

This verifies your device is genuine and hasn't been tampered with in transit.

### With Envoy (Easiest)
1. In Envoy, tap **Set Up Passport**.
2. Envoy will ask you to scan a QR code displayed on your Passport.
3. The app communicates with Foundation's server to verify the device's Secure Element has an authentic supply chain key.
4. If validation passes, you're good. If it fails, **stop and contact Foundation** — the device may have been compromised.

### Without Envoy (Manual)
1. Go to **validate.foundation.xyz** in your browser.
2. Follow the on-screen instructions to verify.

---

## Step 3: Set Your PIN

1. The device prompts you to create a PIN.
2. Enter **6-12 characters** — can be numbers AND letters (upper and lowercase).
3. Confirm by entering it again.

### PIN Rules
- **Do NOT use obvious PINs** (123456, password, birthday).
- **Write it down** and store in a secure location, separate from your seed.
- **21 wrong attempts = permanent brick.** The device becomes permanently unusable. This is a security feature, not a bug.
- No recovery if forgotten. Plan accordingly.

### Optional: Security Words
Advanced users can enable **Security Words** (Settings → Advanced → Security Words). Similar to ColdCard's anti-phishing words — unique words displayed on login to verify device hasn't been swapped.

---

## Step 4: Update Firmware

1. In Envoy, you'll be prompted if a firmware update is available.
2. Envoy downloads the update and transfers it via QR code or MicroSD.
3. Passport only installs firmware signed by **2 of 4** Foundation developer keys — unsigned firmware is rejected.
4. The device verifies, installs, and reboots.

> **Advanced users** can manually download firmware from Foundation's GitHub, verify PGP signatures, and install via MicroSD.

---

## Step 5: Create Your Wallet (Seed Generation)

1. Select **Create New Seed** on the device.
2. Passport uses an open-source true random number generator (avalanche noise source) combined with other entropy to generate a **24-word seed** (12-word option available on firmware 2.3.0+).

### Encrypted MicroSD Backup (Passport's Unique Feature)
1. The device prompts you to back up to the included MicroSD card.
2. Passport generates a **20-digit Backup Code**.
3. **Write this code on the backup card provided.** This is separate from your seed words.
4. The device creates an encrypted backup file on the MicroSD card.
5. To restore in the future, you need BOTH: (1) the Backup Code AND (2) the MicroSD card.

> **Think of this as 2FA for your backup.** Someone who finds just the MicroSD card can't access your wallet. Someone who finds just the Backup Code can't either. You need both.

### Write Down Your Seed Words
1. After the encrypted backup, the device offers to show your 24 seed words.
2. Write them down on paper or stamp onto steel.
3. You can also view seed words later: **Settings → Advanced → View Seed Words**.
4. **Never photograph the seed words.**

> **Why both backups?** The encrypted MicroSD is Passport-specific. The seed words are universal BIP-39 — they work with any compatible wallet if you ever switch devices.

---

## Step 6: Pair with Envoy

### Via QR Code (Recommended)
1. In Envoy, tap **Connect Passport**.
2. Passport displays a QR code with your public key information.
3. Scan it with Envoy.
4. Envoy creates a watch-only wallet — you can see balances and create transactions without the Passport connected.

### Via MicroSD
1. On Passport: **Export Wallet** → save to MicroSD.
2. Insert MicroSD into phone using the included adapter.
3. Import in Envoy.

---

## Step 7: Pair with Sparrow (Desktop Alternative)

If you prefer desktop wallet software:

1. In Sparrow: **File → New Wallet**, name it.
2. Under Keystores: **Airgapped Hardware Wallet → Scan QR**.
3. On Passport: **Export Wallet → Via QR**.
4. Hold Passport's screen up to your computer camera.
5. Verify addresses match between Sparrow and Passport's Address Explorer.

---

## Step 8: Receive Your First Bitcoin

### Via Envoy
1. Open Envoy → tap **Receive**.
2. An address appears as a QR code.
3. **Verify on Passport:** Compare the address shown in Envoy with the one on the Passport device screen.
4. Share the address with whoever is sending you Bitcoin.

### Via Sparrow
1. Go to **Receive** tab in Sparrow.
2. Verify the address matches Passport's Address Explorer.

---

## Step 9: Signing Transactions

### QR Signing (Air-Gapped)
1. In Envoy or Sparrow: Create transaction → display unsigned transaction as QR.
2. On Passport: Scan the QR with the built-in camera.
3. **Verify the recipient address and amount on Passport's screen.**
4. Confirm to sign.
5. Passport displays the signed transaction as a QR.
6. Scan it back into Envoy/Sparrow.
7. Broadcast.

### MicroSD Signing
1. Save unsigned transaction (PSBT) to MicroSD.
2. Insert into Passport → sign.
3. Move MicroSD back to phone/computer → broadcast.

---

## Ongoing Maintenance

- **Firmware updates:** Check periodically in Envoy or at foundation.xyz.
- **Backup Code:** Store securely. If lost, create a new encrypted MicroSD backup (generates new code).
- **Seed words:** Your universal escape hatch. Guard them.
- **MicroSD backups:** Make multiple. Store in different locations.
- **Battery:** Passport Core charges via USB-C. Keep it charged enough to access when needed.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Supply chain validation fails | Stop. Contact hello@foundation.xyz. Do not proceed with setup. |
| Forgot PIN | No recovery. You'll need a new Passport + your seed words OR Backup Code + MicroSD backup. |
| Bricked after 21 wrong PINs | Device is permanently disabled. Recover wallet on a new device using seed words. |
| Envoy won't scan QR | Clean both cameras. Ensure good lighting. Hold 6-12 inches away. |
| MicroSD not recognized | Use the included industrial-grade card. Third-party cards may not work. |
| Firmware update fails | Retry. If persistent, manually download from GitHub and install via MicroSD. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
