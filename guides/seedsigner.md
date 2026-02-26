# SeedSigner — Complete Setup Guide
*Bitcoin Butlers Master Concierge*
*Last verified: Feb 2026 | Latest release: "Bigger Picture" (Jun 2025) — larger display support, 7 languages*

---

## What You'll Need

### For a Pre-Built SeedSigner (Bitcoin Butlers Kit)
- SeedSigner device (pre-assembled with case)
- MicroSD card (pre-loaded with SeedSigner OS)
- Mini HDMI cable (not needed — display is built in)
- USB-C or Micro-USB power cable (depending on Pi model)
- Wall charger or USB power bank
- Pen and paper (or steel backup plate)
- 15-20 minutes of uninterrupted time
- A private space with no cameras

### For a DIY SeedSigner Build
- Raspberry Pi Zero (v1.3 recommended — NO WiFi)
- Waveshare 1.3" LCD Hat (240×240 display) — or optional larger display (supported since "Bigger Picture" release, Jun 2025)
- Pi Camera (Aokin/Arducam 5MP OV5647)
- 3D-printed case or open-frame mount
- MicroSD card (8GB+ — loaded with SeedSigner OS)
- Micro-USB power cable
- Soldering iron + headers (if Pi Zero doesn't have pre-soldered headers)

---

## What Makes SeedSigner Different?

SeedSigner is fundamentally different from every other signing device:

| Feature | SeedSigner |
|---------|-----------|
| Storage | **NONE** — device stores nothing. Seed is entered every time. |
| Cost | ~$50 DIY, ~$100-150 pre-built |
| WiFi/Bluetooth | None (Pi Zero v1.3 has no wireless hardware) |
| Communication | QR codes only (camera + display) |
| Open source | 100% — hardware, software, and case designs |
| Firmware | Runs from MicroSD card on boot |

**The key concept:** SeedSigner is a "stateless" signing device. It never remembers your seed. You enter it (via QR or manually) each time you need to sign. When you unplug it, everything is gone. This means:
- No PIN to protect (nothing stored to protect)
- No supply chain attack risk (it's commodity hardware)
- No company to trust (fully open source)
- Your seed lives ONLY in your physical backup (paper/steel)

---

## Before You Start: Pre-Built vs DIY

### Pre-Built (Bitcoin Butlers SeedSigner+)
Skip to **Step 2: Power On**. Your device comes assembled with the OS pre-loaded on the MicroSD card.

### DIY Build
Follow Step 1 below to assemble and flash the OS.

---

## Step 1: DIY Assembly (Skip if Pre-Built)

### Flash the MicroSD Card
1. Download the latest SeedSigner release image from **github.com/SeedSigner/seedsigner/releases**.
2. Download **Balena Etcher** (balena.io/etcher) or use **Raspberry Pi Imager**.
3. Insert your MicroSD card into your computer.
4. Flash the SeedSigner `.img` file to the card.
5. **Wait for verification** — Etcher/Imager verifies the write was successful. Don't skip this.
6. Eject the MicroSD card.

### Assemble the Hardware
1. If your Pi Zero doesn't have pre-soldered GPIO headers, solder them on.
2. Attach the Waveshare 1.3" LCD Hat onto the GPIO pins.
3. Connect the Pi Camera via the ribbon cable (camera port on the Pi).
4. Insert the flashed MicroSD card into the Pi Zero.
5. Fit into your 3D-printed case (if using one).

> **Why Pi Zero v1.3?** It has NO WiFi or Bluetooth hardware. This isn't a software disable — the chips physically don't exist. Air-gap by hardware design.

---

## Step 2: Power On

1. Connect a Micro-USB (Pi Zero) or USB-C power cable.
2. The device boots from the MicroSD card. Takes 30-60 seconds.
3. You'll see the SeedSigner main menu on the small LCD display.

> **Navigation:** Use the joystick (up/down/left/right/press) and the three buttons on the LCD hat. The interface is simple — joystick navigates, press confirms.

---

## Step 3: Generate Your Seed

SeedSigner offers multiple entropy methods:

### Option A: Camera Entropy (Recommended)
1. Select **Seeds → New Seed → Camera (image capture)**
2. Point the camera at something with high visual entropy — a busy scene, tree bark, crumpled paper, etc.
3. SeedSigner captures the image and hashes it to generate randomness.
4. A 12 or 24-word seed phrase is displayed.

### Option B: Dice Rolls
1. Select **Seeds → New Seed → Dice (99 rolls)**
2. Roll a die 99 times, entering each result.
3. SeedSigner uses the dice entropy to generate your seed.
4. This method is maximally verifiable — you control every bit of randomness.

### Option C: Import Existing Seed
1. Select **Seeds → Scan SeedQR** to scan a SeedQR backup.
2. Or select **Seeds → Enter 24 Words** to type in an existing seed.

---

## Step 4: Write Down Your Seed Words

1. The screen displays your 12 or 24 words.
2. Write each word carefully, numbered in order.
3. **Double-check every word.** Scroll through again.
4. Press confirm when done.

> **Critical:** This is the ONLY time you'll see these words on this device. When you unplug it, they're gone forever. Your written/steel backup is your wallet.

---

## Step 5: Create a SeedQR Backup (Optional but Recommended)

A SeedQR is your seed words encoded as a compact QR code on paper or metal. It lets you load your seed into SeedSigner in seconds (just scan) instead of entering 24 words manually each time.

1. After generating your seed, select **Backup Seed → SeedQR Format**.
2. The device displays a QR code.
3. **Carefully hand-draw or print this QR code** onto paper or stamp onto a metal card.
4. To test: power cycle the device, then select **Seeds → Scan SeedQR** and scan your drawn QR.
5. Verify the seed words match.

> **CompactSeedQR** is a denser format — smaller QR, same data. Better for stamping onto metal. Standard SeedQR is easier to hand-draw.

> **Steel SeedQR:** For maximum durability, stamp the QR pattern onto a steel plate. Some steel backup manufacturers offer QR-compatible plates.

---

## Step 6: Backup to Steel

Same as other devices — stamp your 24 words (or first 4 letters) onto a steel backup plate. Store separately from the SeedSigner.

---

## Step 7: Pair with Sparrow Wallet

### Export Public Key via QR
1. On SeedSigner: Load your seed (scan SeedQR or enter words manually).
2. Select **Export Xpub → Sparrow → Single Sig → Native SegWit**.
3. SeedSigner displays an animated QR code (multiple frames).

### Import into Sparrow
1. In Sparrow: **File → New Wallet**, name it.
2. Under Keystores: **Airgapped Hardware Wallet → Scan QR**.
3. Point your computer's camera at SeedSigner's screen.
4. Sparrow reads the animated QR and imports your public keys.

### Verify
1. In Sparrow: **Receive** tab → get an address.
2. On SeedSigner: **Address Verification** (with your seed loaded).
3. Confirm addresses match.

---

## Step 8: Receive Bitcoin

1. In Sparrow's **Receive** tab, copy the address.
2. Send a small test amount.
3. Wait for confirmation.

> **You don't need SeedSigner powered on to receive.** Sparrow's watch-only wallet handles receiving. SeedSigner is only needed for SIGNING (spending).

---

## Step 9: Signing Transactions

1. In Sparrow: Create transaction → **Finalize → Show QR**.
2. **Power on SeedSigner** and load your seed (scan SeedQR or enter words).
3. Select **Scan → Scan QR** on SeedSigner.
4. Point the camera at Sparrow's screen — it reads the animated QR.
5. **Verify the recipient address and amount on SeedSigner's screen.**
6. Confirm to sign.
7. SeedSigner displays a signed QR code.
8. In Sparrow: **Scan QR** → point camera at SeedSigner.
9. Broadcast the transaction.
10. **Power off SeedSigner.** Seed is wiped from memory.

---

## SeedSigner+ (Pre-Built Upgrade)

The SeedSigner+ from Bitcoin Butlers includes:
- Custom 3D-printed case (BB branding available)
- Pre-soldered headers
- Pre-loaded MicroSD card with latest firmware
- Better camera module
- Ready to use out of the box

Same software, same security model. Just skip the assembly and flashing.

---

## Multi-Language Support

As of the "Bigger Picture" release (Jun 2025), SeedSigner supports 7 additional languages:
- French (covering 21 African nations)
- Chinese (Simplified)
- Catalan, Dutch, German, Italian, Japanese

More languages are being added via community translation on Transifex. Right-to-left languages (Hebrew, Arabic, Persian) are in progress.

---

## Security Model

### What SeedSigner IS:
- A signing tool — it signs transactions and that's it
- Stateless — stores nothing, remembers nothing
- Air-gapped — QR codes only, no WiFi/BT/USB data
- Verifiable — fully open source hardware and software

### What SeedSigner is NOT:
- A storage device — your seed lives in your physical backup only
- A daily wallet — loading seed each time is intentionally slow
- A single point of failure — commodity hardware, easily replaceable

### Best Practices:
- **Always verify the OS image** — check SHA256 hash against GitHub release
- **Use Pi Zero v1.3** (no WiFi) — don't use Pi 3/4/Zero W
- **SeedQR on steel** for fastest, most durable seed loading
- **Power off after signing** — seed cleared from memory
- **Keep a spare SeedSigner ready** — if one breaks, load seed onto another immediately

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Won't boot / blank screen | Re-flash MicroSD. Verify the image hash matches GitHub release. Try a different MicroSD card. |
| Camera won't scan QR | Clean lens. Ensure ribbon cable is fully seated. Good lighting helps. Hold 4-8 inches from QR. |
| Display shows wrong colors/garbled | LCD hat not seated properly on GPIO pins. Remove and reattach firmly. |
| Animated QR won't scan | Move slowly, hold steady. In Sparrow, try increasing the QR display speed in preferences. |
| Seed words don't match backup | Re-enter carefully. Check for word order errors. If using SeedQR, verify the QR wasn't corrupted. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
