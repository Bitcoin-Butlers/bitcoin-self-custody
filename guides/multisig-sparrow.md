# Multisig Setup with Sparrow Wallet — Complete Guide
*Bitcoin Butlers Master Concierge*

---

## What Is Multisig?

Multi-signature (multisig) means your Bitcoin requires multiple keys to spend. Instead of one device controlling everything, you distribute control across multiple devices and locations.

**Common setup: 2-of-3**
- You have 3 signing devices, each with its own seed
- Any 2 of the 3 must sign to move Bitcoin
- If one device is lost, stolen, or destroyed, you can still spend with the other two
- A thief who steals one device gets nothing

### Why Multisig?
- **No single point of failure.** One stolen device ≠ stolen Bitcoin.
- **Geographic distribution.** Keys in different locations survive house fire, theft, or natural disaster.
- **Inheritance friendly.** Give one key to a trusted party — they can't spend alone but can help heirs.

### When Is Multisig Overkill?
- Small amounts (under ~$50K)
- Users who might lose track of multiple devices
- People who need fast, frequent transactions
- **Single-sig with good seed backup is secure for most people.**

---

## What You'll Need

### Hardware (2-of-3 Example)
- **3 different signing devices** — we recommend mixing manufacturers:
  - Example: ColdCard Mk4 + Foundation Passport + SeedSigner
  - Using different manufacturers protects against a firmware vulnerability in one brand
- **3 steel backup plates** (multisig set)
- **MicroSD cards** for each device that supports them

### Software
- **Sparrow Wallet** on your computer (coordinator — creates the wallet, builds transactions)
- Each device must be set up individually first (see individual device guides)

### Time
- 45-60 minutes for initial setup
- Each device should already have its own seed generated and backed up

---

## Step 1: Set Up Each Signing Device Individually

Before creating the multisig wallet, each device must have its own independent seed.

1. **Device A (e.g., ColdCard Mk4):** Follow the ColdCard setup guide. Generate seed. Back up to steel.
2. **Device B (e.g., Passport):** Follow the Passport setup guide. Generate seed. Back up to steel.
3. **Device C (e.g., SeedSigner):** Follow the SeedSigner setup guide. Generate seed. Back up to steel.

**Critical:** Each device must have a DIFFERENT seed. Using the same seed defeats the purpose of multisig.

---

## Step 2: Export Public Keys from Each Device

Each device needs to share its public key (xpub) with Sparrow. This does NOT expose private keys.

### From ColdCard (MicroSD)
1. On ColdCard: **Settings → Multisig Wallets → Export XPUB**
2. Save to MicroSD card.
3. Or: **Advanced/Tools → Export Wallet → Generic JSON**

### From ColdCard Q (QR)
1. **Export Wallet → For Multisig → Via QR**
2. Display the animated QR.

### From Passport (QR)
1. **Export Wallet → Multisig → Via QR**
2. Hold up to Sparrow's camera.

### From SeedSigner (QR)
1. Load your seed on SeedSigner.
2. **Export Xpub → Multisig → Native SegWit (P2WSH)**
3. Display the animated QR.

### From Jade Plus (QR)
1. **Export Xpub → Multisig → Via QR**

---

## Step 3: Create the Multisig Wallet in Sparrow

1. Open Sparrow → **File → New Wallet**.
2. Name it (e.g., "Cold Storage Vault" or "2-of-3 Savings").
3. Under **Policy Type**, select **Multi Signature**.
4. Set **M of N**: **2** of **3** (or your chosen quorum).
5. Choose **Script Type**: **Native SegWit (P2WSH)** — lowest fees, best compatibility.

### Add Keystore 1 (Device A)
1. Click **Keystore 1** tab.
2. Choose your import method:
   - **Airgapped Hardware Wallet → Scan QR** (for QR-capable devices)
   - **Airgapped Hardware Wallet → Import File** (for MicroSD)
   - **Connected Hardware Wallet** (for USB)
3. Import the xpub from Device A.
4. Label it (e.g., "ColdCard - Home Safe").

### Add Keystore 2 (Device B)
1. Click **Keystore 2** tab.
2. Import the xpub from Device B.
3. Label it (e.g., "Passport - Bank Box").

### Add Keystore 3 (Device C)
1. Click **Keystore 3** tab.
2. Import the xpub from Device C.
3. Label it (e.g., "SeedSigner - Family").

### Apply
1. Click **Apply** to create the wallet.
2. Sparrow may ask for a wallet password — this encrypts the wallet file on your computer (optional but recommended).
3. The wallet is now created.

---

## Step 4: Verify Addresses

This is the most important step. You must verify that all devices agree on the wallet addresses.

1. In Sparrow: **Receive** tab → note the first receive address.
2. On **each signing device**, verify this address:

### ColdCard
- Go to **Address Explorer**.
- The multisig addresses should appear (after you've registered the multisig wallet on the ColdCard — see below).

### Registering the Multisig on ColdCard
1. In Sparrow: **File → Export Wallet → ColdCard Multisig**.
2. Save the file to MicroSD.
3. On ColdCard: **Settings → Multisig Wallets → Import from SD**.
4. Review the wallet details and confirm.
5. Now ColdCard knows about this multisig wallet and can verify addresses.

### Passport / Jade / SeedSigner
- Each device has its own method for registering or verifying multisig addresses.
- In Sparrow: **File → Export Wallet → [Device Type]** to generate the registration file or QR.

**All 3 devices must show the same receive address.** If any device shows a different address, the wallet is misconfigured — do not use it.

---

## Step 5: Export and Back Up the Wallet Descriptor

The wallet descriptor is the blueprint for your multisig wallet. Without it, seed phrases alone are not enough.

1. In Sparrow: **File → Export Wallet → Output Descriptor**.
2. Save this file.
3. **Include the descriptor on every steel backup plate** (see Steel Backup Guide — Multisig section).
4. Also save to MicroSD cards stored with each device.

---

## Step 6: Receive Bitcoin

1. In Sparrow: **Receive** tab.
2. Share the address with the sender.
3. **Verify the address on at least one hardware device** before sharing.
4. Wait for confirmations.

---

## Step 7: Sending Bitcoin (Multisig Signing)

Spending from a multisig wallet requires signatures from 2 of your 3 devices.

### Create the Transaction
1. In Sparrow: **Send** tab.
2. Enter recipient, amount, fee.
3. **Create Transaction → Finalize**.

### Sign with Device 1
#### Air-Gapped (QR)
1. Click **Show QR**.
2. Scan with Device 1.
3. Device 1 verifies and signs.
4. Scan the partially-signed QR back into Sparrow.

#### Air-Gapped (MicroSD)
1. **Save Transaction** to MicroSD.
2. Insert into Device 1, sign.
3. Move MicroSD back, **Load Transaction**.

#### USB
1. Connect Device 1, click **Sign**.
2. Verify and confirm on device.

### Sign with Device 2
1. The transaction now has 1 of 2 required signatures.
2. Repeat the signing process with Device 2.
3. After the second signature, Sparrow shows the transaction is **fully signed**.

### Broadcast
1. Click **Broadcast Transaction**.
2. Done. The transaction is sent to the Bitcoin network.

> **Note:** You don't need Device 3 for a 2-of-3. Any 2 devices can sign. This is the power of multisig — redundancy.

---

## Geographic Distribution Strategy

The security of multisig comes from physical separation of keys.

### Recommended Locations (2-of-3)

| Key | Device | Location | Access |
|-----|--------|----------|--------|
| Key 1 | ColdCard Mk4 | Home safe | Daily access |
| Key 2 | Passport | Bank safety deposit box | Weekly access |
| Key 3 | SeedSigner seed on steel | Trusted family member | Emergency only |

### Rules
- **No two keys in the same building.**
- **Any combination of 2 locations must be accessible to you** (for normal spending).
- **At least 2 locations must survive** a catastrophic event at any one location.
- **Steel backup plates** at each location include the wallet descriptor.

---

## Recovery Scenarios

### Scenario 1: One Device Lost/Stolen
- **Impact:** None. You still have 2 devices.
- **Action:** Move funds to a new 2-of-3 wallet with a replacement device.
- **Urgency:** Medium. The thief can't spend with 1 key, but don't delay.

### Scenario 2: One Device Destroyed (Fire/Flood)
- **Impact:** None. Recover using the steel backup plate.
- **Action:** Import seed from steel into a new device. Verify it produces the same xpub.

### Scenario 3: Lost Wallet Descriptor
- **Impact:** Critical if you also lost devices.
- **Action:** If you have 2+ functioning devices, Sparrow can rebuild from their xpubs.
- **Prevention:** Descriptor on EVERY steel plate and EVERY MicroSD.

### Scenario 4: Total Recovery from Steel
If all devices are gone but you have 2 of 3 steel plates (with seed + descriptor):
1. Buy 2 new signing devices.
2. Import seed from Plate 1 into Device A.
3. Import seed from Plate 2 into Device B.
4. In Sparrow: recreate the multisig wallet using the descriptor from either plate.
5. Verify addresses match your previous wallet.
6. Move funds to a new wallet with fresh keys.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Addresses don't match across devices | Delete the wallet in Sparrow and recreate. Ensure correct derivation path (m/48'/0'/0'/2' for P2WSH). |
| ColdCard rejects multisig PSBT | Register the multisig wallet on ColdCard first (import from Sparrow export). |
| Only 1 signature but need 2 | Sign with a second device. The PSBT carries the first signature. |
| "Unknown signer" error | The device doesn't recognize itself in the multisig. Re-register the wallet config on the device. |
| Sparrow shows "partially signed" | Normal after 1 of 2 signatures. Sign with another device to complete. |

---

*Need help setting up multisig? This is exactly what Bitcoin Butlers consultations are for. Book at bitcoinbutlers.com/booking*
