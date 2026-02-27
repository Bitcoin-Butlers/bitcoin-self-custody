# ColdCard Mk4 — Complete Setup Guide
*Bitcoin Butlers Master Concierge*
*Last verified: Feb 2026 | Firmware: v5.4.5 (Nov 2025)*

---

> **🖥️ Want to explore the interface first?** The [ColdCard simulator](../emulators/coldcard/) lets you run the real firmware on your desktop.

---

## What You'll Need
- ColdCard Mk4 (in sealed tamper-evident bag)
- USB-C cable (power-only recommended) OR USB wall charger
- Industrial MicroSD card (included or purchased separately)
- Pen and the seed word card (included)
- Steel backup plate (recommended — available in our shop)
- 15-30 minutes of uninterrupted time
- A private space with no cameras

---

## Before You Start

### Verify the Package
1. Inspect the tamper-evident bag. Look for cuts, tears, or signs of resealing.
2. Note the **bag number** printed on the barcode label — you'll verify this against the device later.
3. Pull the blue tab to open. The word "VOID" should appear on the seal.
4. Inside you'll find a serialized tear-off tab. Hold it against the bag to verify the width matches and perforations align.
5. If anything looks wrong, do not use the device. Contact support@coinkite.com with photos.

### Security Mindset
- Work in a room with no security cameras or smart speakers
- Do not photograph your seed words (ever)
- Do not type your seed words into any computer or phone
- The ColdCard screen is the only place your seed should appear digitally

---

## Step 1: Power On

1. Plug a USB-C cable into the top of the ColdCard.
2. Connect the other end to a **wall charger or USB power bank** (not a computer — you don't need data yet).
3. The screen will light up automatically.

> **Why not a computer?** The ColdCard works air-gapped. Connecting to a computer introduces unnecessary risk during setup. You'll only connect to a computer (or use SD card) later when pairing with wallet software.

---

## Step 2: Accept Terms of Sale

1. You'll see the terms of sale screen.
2. Use the **5** (up) and **8** (down) keys to scroll through the full text.
3. Press **✔** (checkmark, bottom-right key) to accept and continue.

---

## Step 3: Set Your PIN

The ColdCard PIN has two parts: a **prefix** and a **suffix**. Example: `1234-5678`.

### Choose Your Prefix (First Part)
1. The device will prompt you to enter the first part of your PIN.
2. Type 2-6 digits using the number pad. **We recommend 4 digits** for the prefix.
3. Press **✔** to confirm.
4. The device will show you two **anti-phishing words**. These words are unique to YOUR ColdCard with THIS prefix.
5. **Write these words down and remember them.** Every time you log in, you'll see these words after entering the prefix. If you ever see different words, someone has tampered with your device.

### Choose Your Suffix (Second Part)
1. Now enter the second part of your PIN (2-6 digits). **We recommend 4 digits.**
2. Press **✔** to confirm.

### Confirm Your PIN
1. Re-enter the full PIN (prefix, then suffix) to verify.
2. The device confirms your PIN is set.

### PIN Tips
- **Use at least 4+4 digits** (e.g., 1234-5678). Shorter PINs are vulnerable to brute force.
- **Do NOT use birthdays, addresses, or obvious numbers.**
- **There is no recovery if you forget your PIN.** No backdoor, no reset, no help. Write it down and store it separately from your seed words.
- Optional: Set a **duress PIN** later (Settings → PIN Options → Duress PIN). This wipes the device if entered — anti-theft protection.

---

## Step 4: Create Your Wallet (Seed Generation)

You have two options: let the ColdCard generate your seed, or add your own entropy via dice rolls.

1. You'll see a menu. Select **New Wallet**.
2. The ColdCard generates a 12 or 24-word seed phrase (24 recommended) using its hardware random number generator.
3. The words appear on screen, one page at a time.

### Alternative: Dice Roll Entropy
If you want to verify the randomness yourself instead of trusting the hardware RNG:
1. From the menu, select **New Wallet → Dice Rolls** (or **Import Existing → Dice Rolls**).
2. Roll a casino-grade die and enter each result. ColdCard recommends **99 rolls** for full entropy.
3. The device combines your dice entropy with its own RNG to generate the seed.
4. This gives you verifiable randomness — you controlled the input.

### Write Down Your Seed Words
1. Using the included card or a piece of paper, write each word **exactly as shown**, numbered 1-24.
2. Double-check every word. One mistake means you cannot recover your Bitcoin.
3. Press **✔** when you've written all 24 words.

### Verify Your Backup (Quiz)
1. The ColdCard will quiz you on your seed words in random order.
2. For each question, select the correct word from the options shown.
3. If you're unsure, press **✔** to see the words again.
4. Complete the quiz to confirm your backup is correct.

> **This quiz is not optional.** It's the most important part of setup. If your written backup is wrong, you lose everything.

---

## Step 5: Create Encrypted MicroSD Backup

Before moving to steel, create an encrypted backup on MicroSD as an additional safety layer.

1. Insert a MicroSD card.
2. Navigate to: **Advanced/Tools → Backups → Backup System**.
3. The ColdCard creates an encrypted backup file (AES-256) on the MicroSD.
4. It generates a 12-word backup password — **write this down separately from your seed words.**
5. To restore from this backup: insert the MicroSD on a new ColdCard → **Import Existing → Restore Backup** → enter the 12-word password.

> **Why both seed words AND encrypted backup?** The seed words are your universal recovery (works on any BIP-39 wallet). The encrypted MicroSD backup restores your ColdCard-specific settings (multisig configs, address explorer settings, etc.) in addition to the seed.

---

## Step 6: Backup to Steel (Recommended)

Paper degrades. Fire, water, and time destroy it. A steel backup plate protects your seed for decades.

### Using a Bitcoin Butlers Steel Plate (Single-Sig)
1. Using the included letter stamps or the guide on the plate, stamp each word (or the first 4 letters of each word) into the steel.
2. Number each word slot 1-24.
3. Verify by reading back all 24 words from the steel.
4. Store the steel plate in a secure location — fire safe, safety deposit box, or hidden location.
5. **Store it separately from your ColdCard.** If someone finds both, they have your Bitcoin.

---

## Step 7: Export Wallet to MicroSD

To use your ColdCard with wallet software (like Sparrow), you need to export the public key information.

1. Insert a MicroSD card into the ColdCard (slot on the side).
2. From the main menu, navigate to: **Advanced/Tools → Export Wallet → Generic JSON**
3. The ColdCard writes a file to the SD card containing your public keys (xpub). **This does NOT contain your seed or private keys.**
4. Remove the SD card.

---

## Step 8: Pair with Sparrow Wallet

Sparrow is the recommended desktop wallet for ColdCard users.

### Install Sparrow
1. Download Sparrow from **sparrowwallet.com** (verify the PGP signature if you can).
2. Install and open Sparrow.

### Connect Your ColdCard
1. In Sparrow, go to **File → New Wallet** (or click the + tab).
2. Name your wallet (e.g., "ColdCard Main").
3. Under **Keystores**, click **Connected Hardware Wallet** if using USB, or **Airgapped Hardware Wallet** if using SD card.

#### Option A: Air-Gapped (SD Card — Recommended)
1. Click **Import File** and select the JSON file from your MicroSD card.
2. Sparrow imports your public keys and creates a watch-only wallet.
3. You can now see your balance and generate receive addresses — without the ColdCard connected.

#### Option B: USB Connection
1. Connect ColdCard to your computer via USB-C.
2. Enter your PIN on the ColdCard.
3. In Sparrow, click **Scan** to detect the device.
4. Sparrow imports the public keys automatically.

### Verify the Connection
1. In Sparrow, go to the **Receive** tab.
2. Click **Get Next Address** — an address appears on screen.
3. On the ColdCard, go to **Address Explorer** and verify the address matches.
4. If the addresses match, setup is complete. Your ColdCard and Sparrow are paired.

---

## Step 9: Receive Your First Bitcoin

1. In Sparrow, go to the **Receive** tab.
2. Copy the displayed Bitcoin address.
3. Send a small test amount from your exchange or another wallet.
4. Wait for confirmation (usually 10-60 minutes depending on fees).
5. Your balance appears in Sparrow.

---

## Step 10: Sending Bitcoin (Signing a Transaction)

### Air-Gapped Signing (Recommended)
1. In Sparrow, go to **Send** tab.
2. Enter the recipient address and amount.
3. Click **Create Transaction** → **Finalize Transaction for Signing**.
4. Click **Save Transaction** and save the PSBT file to your MicroSD card.
5. Insert the SD card into your ColdCard.
6. On the ColdCard, go to **Ready to Sign**.
7. Review the transaction details on the ColdCard screen: **verify the address and amount.**
8. Press **✔** to sign.
9. Remove the SD card, insert back into computer.
10. In Sparrow, click **Load Transaction** and select the signed file.
11. Click **Broadcast** to send.

### USB Signing
1. Create the transaction in Sparrow as above.
2. With ColdCard connected via USB and unlocked, click **Sign** in Sparrow.
3. Verify the transaction on the ColdCard screen.
4. Press **✔** to sign.
5. Sparrow broadcasts automatically.

---

## NFC Features (Mk4)

The ColdCard Mk4 has NFC built in. You can use it for:
- **Show address:** Tap an NFC-enabled phone to share a receive address
- **Export wallet:** Transfer wallet info to compatible software
- **Sign messages:** Sign text messages via NFC tap

### Enabling/Disabling NFC
- **Settings → NFC → Enable/Disable**
- NFC is useful for quick address sharing but adds an attack surface. Disable if not using it.

---

## Advanced Features

### BIP-39 Passphrase
Add a passphrase (sometimes called "25th word") for an additional layer of security:
1. Navigate to: **Passphrase → Edit Passphrase**
2. Enter your passphrase. This creates an entirely different wallet from the same seed.
3. **The passphrase is NOT stored on the device.** You must enter it every time.
4. **If you forget the passphrase, the funds in that passphrase wallet are gone.** No recovery.
5. You can lock a passphrase so it applies automatically on boot: **Passphrase → Lock It In**.

### BIP-85 Child Seeds
Generate derived seeds for different wallets/purposes from your master seed:
1. **Advanced/Tools → Derive Seed (BIP-85)**
2. Choose the derivation index (0, 1, 2, etc.)
3. ColdCard generates a new 12 or 24-word seed derived from your master seed
4. Use this child seed for a separate wallet (hot wallet, Lightning, etc.)
5. **Key benefit:** You only need to back up your master seed. All child seeds are reproducible.

### Seed XOR (Advanced)
Split your seed across multiple ColdCards so no single device holds the complete seed:
1. **Advanced/Tools → Seed XOR → Split**
2. Choose how many parts (2-4)
3. Each part is a valid-looking 24-word seed, but useless alone
4. Combine the parts to reconstruct the original seed

---

## Ongoing Maintenance

### Firmware Updates
1. Check **coldcard.com/docs/upgrade** periodically for new firmware.
2. Download the firmware file and verify the PGP signature.
3. Copy the `.dfu` file to your MicroSD card.
4. On the ColdCard: **Advanced/Tools → Upgrade Firmware**.
5. The device verifies the signature and installs the update.

### Security Best Practices
- **Never share your seed words with anyone** — not Bitcoin Butlers, not Coinkite, not "support."
- **Verify addresses on the ColdCard screen** before every transaction.
- **Keep firmware updated** — security patches matter.
- **Test your backup** periodically by verifying seed words in Address Explorer match your Sparrow wallet.
- **Use a passphrase** (BIP-39) for additional security if desired — but only if you can remember it. A forgotten passphrase is as bad as a forgotten PIN.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Screen doesn't turn on | Try a different USB-C cable. Some cables are charge-only and may not supply enough power. |
| Forgot PIN | There is no recovery. If you have your seed words, get a new ColdCard and import the seed. |
| Seed quiz answer wrong | Re-check your written backup carefully. You can view the words again by pressing ✔ during the quiz. |
| Sparrow doesn't detect ColdCard | Make sure you're using a data-capable USB cable (not power-only). On Mac, no drivers needed. On Windows, you may need to install the USB driver from coldcard.com. |
| SD card not recognized | Use a standard MicroSD card (FAT32 format). Some high-capacity cards may not work. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
