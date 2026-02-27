# Blockstream Jade / Jade Plus — Complete Setup Guide
*Bitcoin Butlers Master Concierge*
*Last verified: Feb 2026 | Firmware: v1.0.39 (Feb 2026)*

---

> **🖥️ Want to explore the interface first?** The [Jade emulator](../emulators/jade/) runs the official firmware in Docker with a web UI.

---

## What You'll Need
- Blockstream Jade or Jade Plus
- USB-C cable (included)
- Smartphone with Blockstream Green app (optional but recommended)
- Pen and paper (or steel backup plate)
- 15-20 minutes of uninterrupted time
- A private space with no cameras

---

## Jade vs Jade Plus

| Feature | Jade | Jade Plus |
|---------|------|-----------|
| Display | Small color LCD | Large 1.14" color LCD |
| Camera | No built-in camera | Built-in camera (QR scanning) |
| Communication | USB + Bluetooth | USB + Bluetooth + QR codes |
| Air-gapped mode | Via external QR only | Full air-gap with built-in camera |
| Battery | Built-in rechargeable | Built-in rechargeable |
| Open source | Yes (hardware + firmware) | Yes (hardware + firmware) |

**Key insight:** Jade uses a unique security model called "Virtual Secure Element." Instead of a traditional secure element chip, Jade stores an encrypted version of your seed and requires a PIN server (Blockstream's or self-hosted) to decrypt it. This means:
- The device alone doesn't hold your unencrypted seed
- A PIN unlock requires briefly communicating with a server (via Bluetooth/USB or QR code for Jade Plus)
- You can also use Jade in **stateless mode** (like SeedSigner) — enter seed manually each time

---

## Before You Start

### Verify the Package
1. Check the packaging for signs of tampering.
2. The device should be in its original sealed packaging.
3. If anything looks wrong, contact Blockstream support.

---

## Step 1: Power On and Choose Setup Mode

1. Press and hold the power button (or connect USB-C) to turn on.
2. You'll see the Blockstream Jade logo, then the setup screen.
3. Choose your setup path:

### Quick Setup (Easiest — Jade or Jade Plus)
- Guided by Blockstream Green app on your phone
- Creates wallet, sets PIN, pairs device automatically
- Communication via USB or Bluetooth

### Advanced Setup (Recommended for Serious Users)
- More control over seed generation options
- Choose recovery phrase length (12 or 24 words)
- Option to export SeedQR
- Option to add BIP-39 passphrase
- Choose communication method (USB, Bluetooth, or QR for Jade Plus)

### Air-Gapped Setup (Jade Plus Only)
- Select **QR** as your connection method
- Complete QR PIN Unlock setup
- Never connects to a computer or phone via cable/Bluetooth
- All communication via QR codes through built-in camera

---

## Step 2: Create Your Wallet

### Generate a New Seed
1. Select **Create New Wallet**.
2. In Advanced Setup, choose phrase length: **12 words** or **24 words** (we recommend 24).
3. Jade generates a seed phrase using its hardware random number generator.
4. The words are displayed on screen.

### Write Down Your Recovery Phrase
1. Write each word exactly as shown, numbered in order.
2. Double-check every word.
3. **Never photograph or digitally store these words.**

### Verify Your Backup
1. Jade quizzes you on the words to confirm your backup.
2. Complete the verification successfully.

### Optional: Export SeedQR (Advanced Setup)
1. After seed generation, you'll be offered to export a SeedQR.
2. This is a QR code encoding your seed — for quick loading on Jade Plus or SeedSigner.
3. Draw or stamp the QR carefully onto paper or metal.
4. **Treat this QR with the same security as your written seed words** — it IS your seed.

---

## Step 3: Set Your PIN

### Standard PIN (USB/Bluetooth)
1. Choose **USB** or **Bluetooth** as your connection method.
2. Set a 6-digit PIN.
3. Confirm by entering it again.
4. The PIN encrypts your seed on the device. Unlocking requires the PIN server to help decrypt.

### QR PIN Unlock (Jade Plus Air-Gapped)
1. Choose **QR** as your connection method.
2. Set up QR PIN Unlock — a fully air-gapped unlock method.
3. When you power on Jade Plus, it displays a QR code.
4. You scan this QR with Blockstream Green (or another compatible app).
5. The app communicates with the PIN server and displays a response QR.
6. You scan the response QR with Jade Plus's camera.
7. Jade Plus unlocks — all without any cable or wireless connection.

### Stateless Mode (No PIN)
1. Skip the PIN setup.
2. Your wallet is forgotten on every reboot.
3. You'll need to scan a SeedQR or manually enter your recovery phrase each session.
4. Identical to SeedSigner's approach — maximum security, less convenience.

---

## Step 4: Pair with Blockstream Green (Recommended)

### Install Green
1. **iPhone:** App Store → "Blockstream Green"
2. **Android:** Google Play → "Blockstream Green" or download APK from blockstream.com

### Connect Jade
#### Via USB
1. Connect Jade to your phone/computer with the USB-C cable.
2. Open Green → **Add Wallet → Jade**.
3. Green detects the device and imports your public keys.

#### Via Bluetooth
1. Ensure Bluetooth is enabled on your phone.
2. Open Green → **Add Wallet → Jade**.
3. Select your Jade from the list.
4. Confirm the pairing code on both devices.

#### Via QR (Jade Plus Only)
1. On Jade Plus: **Export Xpub → Via QR**.
2. In Green: **Add Wallet → Scan QR**.
3. Scan the animated QR displayed on Jade Plus.

---

## Step 5: Pair with Sparrow Wallet (Desktop)

### Via USB
1. In Sparrow: **File → New Wallet**, name it.
2. Under Keystores: **Connected Hardware Wallet**.
3. Connect Jade via USB, unlock it.
4. Sparrow detects Jade and imports public keys.

### Via QR (Jade Plus Air-Gapped)
1. In Sparrow: **Airgapped Hardware Wallet → Scan QR**.
2. On Jade Plus: **Export Xpub → Via QR**.
3. Point your computer camera at Jade Plus's screen.

### Verify
1. Sparrow **Receive** tab → get an address.
2. On Jade: verify the address matches.

---

## Step 6: Receive Your First Bitcoin

1. In Green or Sparrow, go to **Receive**.
2. Copy the displayed address.
3. **Verify the address on Jade's screen** before sharing it.
4. Send a small test amount.

---

## Step 7: Signing Transactions

### Via USB/Bluetooth (Jade or Jade Plus)
1. Create transaction in Green or Sparrow.
2. The app sends the transaction to Jade for signing.
3. **Verify the address and amount on Jade's screen.**
4. Confirm to sign.
5. The app broadcasts.

### Via QR (Jade Plus Air-Gapped)
1. In Sparrow: Create transaction → **Show QR**.
2. On Jade Plus: **Scan QR** with the built-in camera.
3. Verify details on Jade Plus's screen.
4. Confirm to sign.
5. Jade Plus displays the signed transaction as a QR.
6. Scan back into Sparrow → broadcast.

---

## Understanding Jade's Security Model

### Virtual Secure Element
Traditional hardware wallets (ColdCard, Passport) store your seed in a dedicated secure element chip. Jade takes a different approach:

1. Your seed is **encrypted** and stored on the device.
2. The encryption key is split between Jade and a remote PIN server.
3. To unlock, Jade needs the PIN server to provide its half of the key.
4. This means: even if someone steals your Jade AND extracts the chip, they can't get your seed without the PIN server.

**Trade-off:** Requires communicating with a server to unlock (even via QR on Jade Plus). Blockstream runs the default server, but you can self-host one (oracle server is open source on GitHub).

**Anti-rollback (firmware 1.0.38+):** As of Q4 2025, Jade prevents downgrading to older firmware versions. This stops attackers from reverting to a vulnerable version to exploit known bugs.

**Mitigation:** You always have your recovery phrase as backup. If Blockstream disappears, recover your wallet on any BIP-39 compatible device.

### JadeLink (Jade Plus Accessory)
JadeLink is an optional accessory that enables QR PIN Unlock without needing a phone. It acts as a bridge for the unlock QR exchange. Useful if you want fully air-gapped operation without any smartphone involvement.

### Stateless Mode
If the Virtual Secure Element model bothers you, use Jade in stateless mode:
- Skip PIN setup
- Load seed via SeedQR each session
- Device stores nothing — identical security model to SeedSigner

---

## Ongoing Maintenance

- **Firmware updates:** Check in Blockstream Green or blockstream.com.
- **Keep charged:** Jade has a built-in battery. Charge via USB-C periodically.
- **Backup your recovery phrase on steel** for long-term durability.
- **Verify addresses on device screen** before every transaction.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Won't turn on | Charge via USB-C for 15 minutes, then try again. Hold power button for 3 seconds. |
| Bluetooth won't pair | Toggle Bluetooth off/on on your phone. Forget the device in phone settings and re-pair. |
| QR PIN Unlock fails | Ensure Green app is connected to the internet (it needs the PIN server). Check QR is fully visible and well-lit. |
| Green app doesn't detect Jade | Try a different USB cable. Restart both app and device. |
| "PIN server unreachable" | Check your internet connection. If persistent, Blockstream's server may be down — use Sparrow via USB as alternative. |
| Forgot PIN | No recovery via PIN. Use your 24-word recovery phrase to set up a new wallet on Jade or any other device. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
