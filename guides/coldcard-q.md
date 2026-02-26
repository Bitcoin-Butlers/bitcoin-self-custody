# ColdCard Q — Complete Setup Guide
*Bitcoin Butlers Master Concierge*
*Last verified: Feb 2026 | Firmware: v1.3.5Q (ColdCard Q)*

---

## What You'll Need
- ColdCard Q (in sealed tamper-evident bag)
- 3x AAA batteries OR USB-C cable with wall charger
- MicroSD card (device has two slots + built-in storage under battery door)
- Pen and the seed word card (included)
- Steel backup plate (recommended — available in our shop)
- 15-30 minutes of uninterrupted time
- A private space with no cameras

---

## What Makes the Q Different from the Mk4?

The ColdCard Q is Coinkite's flagship device with several upgrades:

| Feature | Mk4 | Q |
|---------|-----|---|
| Keyboard | Number pad only | Full QWERTY + numbers |
| Display | Small monochrome | Large color display |
| QR Scanner | None | Built-in camera (reads QR codes) |
| NFC | Yes (built-in) | Yes (built-in, can be permanently disabled) |
| Power | USB-C only | USB-C OR 3x AAA batteries |
| MicroSD | 1 slot | 2 slots + storage under battery door |
| Price | Lower | Higher |

The Q is ideal if you want fully air-gapped operation with QR codes (no SD card or USB needed for signing).

---

## Before You Start

### Verify the Package
1. Inspect the tamper-evident bag for damage or signs of resealing.
2. Note the **bag number** on the barcode label.
3. Pull the blue tab to open — "VOID" should appear on the seal.
4. Check the tear-off tab width matches the bag, perforations align.
5. If anything looks wrong, contact support@coinkite.com with photos.

### Security Mindset
- Work in a private room, no cameras or smart speakers
- Never photograph your seed words
- Never type seed words into any computer or phone

---

## Step 1: Power On

### Option A: Battery Power (Recommended for Setup)
1. Open the battery door on the back.
2. Insert 3 AAA batteries (rechargeable NiMH work fine).
3. Close the battery door.
4. **Press and hold the power button** (top-left) for 1 full second until the screen lights up.

### Option B: USB-C Power
1. Plug a USB-C cable into the port.
2. **Press and hold the power button** for 1 second (the Q does NOT auto-start on USB like the Mk4).

> **Battery tip:** Batteries won't drain while powered off. Replace all 3 together, don't mix old and new.

> **Turning off:** Press power for 2 seconds. For a hard shutdown (unresponsive device), hold power for 10 seconds.

---

## Step 2: Accept Terms of Sale

1. Read through the terms using the arrow keys to scroll.
2. Press **✔** to accept and continue.

---

## Step 3: Set Your PIN

Same process as the Mk4 — two-part PIN with anti-phishing words.

### Choose Your Prefix (First Part)
1. Enter 2-6 digits using the QWERTY keyboard's number row.
2. Press **✔** to confirm.
3. Note the two **anti-phishing words** shown. These are unique to your device + this prefix. **Remember them.**

### Choose Your Suffix (Second Part)
1. Enter 2-6 more digits.
2. Press **✔** to confirm.

### Confirm Your PIN
1. Re-enter the full PIN to verify.

### PIN Tips
- Use at least **4+4 digits** (e.g., 1234-5678).
- **No recovery if forgotten.** Write it down, store separately from seed.
- The QWERTY keyboard makes longer PINs easier to enter quickly.

---

## Step 4: Create Your Wallet (Seed Generation)

1. Select **New Wallet** from the menu.
2. The ColdCard Q generates a 12 or 24-word seed phrase (24 recommended).
3. Words appear on the large color display — easier to read than the Mk4.

### Write Down Your Seed Words
1. Write each word exactly as shown, numbered 1-24.
2. Double-check every word carefully.
3. Press **✔** when finished.

### Verify Your Backup (Quiz)
1. The device quizzes you on your words in random order.
2. The QWERTY keyboard lets you TYPE the word rather than selecting from a list.
3. Complete the quiz successfully to confirm your backup.

---

## Step 5: Backup to Steel (Recommended)

Same as Mk4 — stamp your 24 words (or first 4 letters of each) onto a steel backup plate. Store separately from the device.

---

## Step 6: Export Wallet — Choose Your Method

The ColdCard Q gives you three ways to communicate with wallet software:

### Option A: QR Code (Most Air-Gapped)
1. From the main menu: **Export Wallet → Via QR**
2. The Q displays a QR code (or series of animated BBQr codes for larger data).
3. Scan this QR with Sparrow Wallet on your computer.
4. **No physical media ever leaves the device.**

### Option B: MicroSD Card
1. Insert a MicroSD card into either slot (A = top, B = bottom).
2. Navigate to: **Export Wallet → Generic JSON**
3. Select the card slot if both are inserted.
4. Remove the card and plug into your computer.

### Option C: NFC (If Enabled)
1. Navigate to: **Export Wallet → Via NFC**
2. Tap the Q against your NFC-enabled phone or reader.
3. **Only use this if you understand the security trade-offs.**

> **NFC can be permanently disabled.** Under the battery door are exposed PCB traces. Scratch off the NFC trace with a knife to permanently disable it. This is irreversible but provides certainty that NFC is physically impossible.

---

## Step 7: Pair with Sparrow Wallet

### Install Sparrow
1. Download from **sparrowwallet.com** (verify PGP signature).
2. Install and open Sparrow.

### Connect via QR (Recommended)
1. In Sparrow: **File → New Wallet**, name it.
2. Under Keystores, click **Airgapped Hardware Wallet**.
3. Click **Scan QR** — your computer's camera opens.
4. On the ColdCard Q, display the wallet export QR.
5. Hold the Q's screen up to your computer's camera.
6. Sparrow reads the QR and imports your public keys.

### Connect via MicroSD
1. In Sparrow: **File → New Wallet**, name it.
2. Under Keystores, click **Airgapped Hardware Wallet**.
3. Click **Import File**, select the JSON from your MicroSD.

### Verify the Connection
1. In Sparrow, go to **Receive** tab, get an address.
2. On the ColdCard Q, go to **Address Explorer**.
3. Verify the addresses match. If they do, setup is complete.

---

## Step 8: Receive Your First Bitcoin

1. In Sparrow's **Receive** tab, copy the displayed address.
2. Send a small test amount from your exchange or another wallet.
3. Wait for confirmation (10-60 minutes).

---

## Step 9: Signing Transactions

### QR Signing (Most Air-Gapped — Q Exclusive)
1. In Sparrow: Create transaction → **Finalize → Show QR**.
2. Sparrow displays a QR code on your computer screen.
3. On the ColdCard Q, press the **QR key** to activate the scanner.
4. Point the Q at your computer screen — the red strobe light shows where the scanner is aimed.
5. The Q reads the transaction. **Verify the address and amount on the Q's screen.**
6. Press **✔** to sign.
7. The Q displays a signed QR code.
8. In Sparrow, click **Scan QR** and hold the Q up to your computer's camera.
9. Sparrow reads the signed transaction and broadcasts it.

> **Flashlight tip:** If the scanner has trouble reading, press the flashlight key to illuminate the QR code.

### MicroSD Signing
1. In Sparrow: Create transaction → **Save Transaction** to MicroSD.
2. Insert MicroSD into the Q.
3. Select **Ready to Sign** on the Q.
4. Verify and sign.
5. Move MicroSD back to computer, load in Sparrow, broadcast.

### USB Signing
1. Connect Q via USB, unlock with PIN.
2. Sign directly in Sparrow.

---

## Q-Specific Features

### QR Scanner
- Press the **QR key** anytime to activate the scanner.
- Reads standard QR, animated BBQr (multi-frame), and barcodes.
- The lens is behind the screen, pointing out the top of the device.
- Use the built-in flashlight for low-light scanning.

### Dual MicroSD Slots
- Slot A (top) is the default.
- If both slots have cards, the Q will ask which to use.
- Built-in storage for 2 extra MicroSD cards under the battery door.

### NFC
- Can be used for wallet export, address verification, and signing.
- **We recommend disabling NFC** unless you have a specific use case.
- Software disable: Settings → Hardware → NFC → Off
- Hardware disable: Scratch PCB trace under battery door (permanent).

### Seed Import via QR
- If importing an existing seed, you can scan a QR code of your seed words instead of typing them manually.
- Press QR key during the import process.

---

## Ongoing Maintenance

Same as Mk4:
- Keep firmware updated (coldcard.com/docs/upgrade)
- Never share seed words with anyone
- Verify addresses on device screen before every transaction
- Test your backup periodically
- Replace batteries together (don't mix old and new)

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Won't turn on | Hold power button for a full second. Try fresh batteries. Try USB-C power. |
| QR scanner won't read | Clean the screen (scanner is behind it). Use the flashlight key. Hold steady, about 6-12 inches from the QR. |
| MicroSD not recognized | Use FAT32-formatted cards. Try the other slot. |
| Forgot PIN | No recovery. Import seed words onto a new device. |
| NFC not working | Check if disabled in settings. If PCB trace was scratched, NFC is permanently off. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
