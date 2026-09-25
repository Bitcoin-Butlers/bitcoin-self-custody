# Multisig Setup with Sparrow Wallet - Complete Guide

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
- **Inheritance friendly.** Give one key to a trusted party - they can't spend alone but can help heirs.

### When Is Multisig Overkill?
- You cannot reliably maintain multiple independent recovery packages.
- You need fast, frequent transactions.
- The added recovery work does not fit your needs.

A tested single-key setup can be safer than a multi-key setup that you cannot
operate or recover reliably.

---

## What You'll Need

### Hardware (2-of-3 Example)
- **3 signing keys**, each created from a different seed:
  - The keys can use the same supported signer project.
  - Using at least two independent signer projects reduces reliance on one implementation.
  - Different projects also add different signing and recovery workflows to learn.
  - This guide covers SeedSigner, Jade, and an offline Bitcoin Core signer.
- **3 independent recovery backups** appropriate to the selected signers
- **MicroSD cards** for each device that supports them

### Software
- **Sparrow Wallet** on your computer (coordinator - creates the wallet, builds transactions)
- Each signer must be prepared individually first.

### Time
- 45-60 minutes for initial setup
- Each signer should already have its own independent key and tested recovery
  material.

---

## Step 1: Set Up Each Signing Device Individually

Before creating the multisig wallet, each signer must hold an independent key.
Do not load one seed or wallet backup into more than one key slot.

1. **Key A:** Follow the selected signer guide. Create and back up its key.
2. **Key B:** Repeat the selected signer guide with a new independent key.
3. **Key C:** Repeat the selected signer guide with another independent key.

The signers can use the same project. The three keys must be different.

---

## Step 2: Export Public Keys from Each Device

Each device needs to share its public key (xpub) with Sparrow. This does NOT expose private keys.

### From SeedSigner (QR)
1. Load your seed on SeedSigner.
2. **Export Xpub → Multisig → Native SegWit (P2WSH)**
3. Display the animated QR.

### From Jade Plus (QR)
1. **Export Xpub → Multisig → Via QR**

### From an offline Bitcoin Core signer
1. Follow the Bitcoin Core multisig signer guide.
2. Record the master fingerprint, derivation path, and xpub together.
3. In Sparrow, choose **xPub / Watch Only Wallet** for that keystore.
4. Enter the origin information and xpub exactly as Bitcoin Core produced them.

---

## Step 3: Create the Multisig Wallet in Sparrow

1. Open Sparrow → **File → New Wallet**.
2. Name it (e.g., "Cold Storage Vault" or "2-of-3 Savings").
3. Under **Policy Type**, select **Multi Signature**.
4. Set **M of N**: **2** of **3** (or your chosen quorum).
5. Choose **Script Type**: **Native SegWit (P2WSH)** - lowest fees, best compatibility.

### Add Keystore 1 (Device A)
1. Click **Keystore 1** tab.
2. Choose your import method:
   - **Airgapped Hardware Wallet → Scan QR** (for QR-capable devices)
   - **Airgapped Hardware Wallet → Import File** (for MicroSD)
   - **Connected Hardware Wallet** (for USB)
3. Import the xpub from Device A.
4. Label it (e.g., "Jade - Home Safe").

### Add Keystore 2 (Device B)
1. Click **Keystore 2** tab.
2. Import the xpub from Device B.
3. Label it (e.g., "Jade - Bank Box").

### Add Keystore 3 (Device C)
1. Click **Keystore 3** tab.
2. Import the xpub from Device C.
3. Label it (e.g., "SeedSigner - Family").

### Apply
1. Click **Apply** to create the wallet.
2. Sparrow may ask for a wallet password - this encrypts the wallet file on your computer (optional but recommended).
3. The wallet is now created.

---

## Step 4: Verify Addresses

This is the most important step. You must verify that all devices agree on the wallet addresses.

1. In Sparrow: **Receive** tab → note the first receive address.
2. On **each signing device**, verify this address:

### Registering the multisig on each device

A device can only verify a multisig address after it knows the wallet. Register
it first, then verify.

1. In Sparrow: **File → Export Wallet → [Device Type]** to produce the
   registration file or QR for that device.
2. Move it to the device by QR or MicroSD, whichever that device uses.
3. Review the wallet details on the device's own screen and confirm.

### Jade / SeedSigner
- Each device has its own method for registering or verifying multisig addresses.
- Follow the export that matches the device in Sparrow's list.

### Bitcoin Core
- Import Sparrow's public multisig descriptor into a blank wallet with private
  keys disabled on the offline computer.
- Confirm that its receive address matches Sparrow and the hardware signers.

Every signer environment must derive the same receive address. If any address
differs, the wallet is misconfigured. Do not use it.

---

## Step 5: Export and Back Up the Wallet Descriptor

The wallet descriptor is the blueprint for your multisig wallet. Without it, seed phrases alone are not enough.

1. In Sparrow: **File → Export Wallet → Output Descriptor**.
2. Save this file.
3. Include the checked descriptor with every signer recovery package.
4. Save multiple durable copies separately from the Sparrow computer.

---

## Step 6: Test Recovery Before Funding

Complete this test on signet before you receive mainnet funds.
Signet keys and descriptors do not carry over to mainnet. Create new keys,
rebuild the wallet, and repeat this test.

1. Keep the original Sparrow wallet and signers unchanged.
2. In a separate test environment, restore two signer recovery packages.
3. Recreate the watch-only wallet from a checked copy of the complete descriptor.
4. Confirm that the restored wallet derives the same receive addresses.
5. Receive a small signet payment to one verified address.
6. Create and sign a return payment with the two restored signers.
7. Stop and correct the backups if any address or signature does not match.

---

## Step 7: Receive Bitcoin

1. In Sparrow: **Receive** tab.
2. Share the address with the sender.
3. Verify the address in at least one independent signer environment before
   sharing.
4. Wait for confirmations.

---

## Step 8: Sending Bitcoin (Multisig Signing)

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

#### Offline Bitcoin Core
1. Save the PSBT to dedicated transfer media.
2. Load it in the offline Core watch-only multisig wallet and verify the outputs.
3. Sign it with the Core signer wallet by using `walletprocesspsbt`.
4. Return the partially signed PSBT to Sparrow.

### Sign with Device 2
1. The transaction now has 1 of 2 required signatures.
2. Repeat the signing process with Device 2.
3. After the second signature, Sparrow shows the transaction is **fully signed**.

### Broadcast
1. Click **Broadcast Transaction**.
2. Done. The transaction is sent to the Bitcoin network.

> **Note:** You don't need Device 3 for a 2-of-3. Any 2 devices can sign. This is the power of multisig - redundancy.

---

## Geographic Distribution Strategy

The resilience of multisig depends on keeping independent keys and recovery
material in separate locations.

### Recommended Locations (2-of-3)

| Key | Device | Location | Access |
|-----|--------|----------|--------|
| Key 1 | Signer and recovery package | Primary secure location | Regular access |
| Key 2 | Signer and recovery package | Separate secure location | Recovery access |
| Key 3 | Signer and recovery package | Third secure location | Emergency access |

### Rules
- Choose separate locations that match your threat model.
- Keep two recovery paths accessible for normal spending and recovery.
- Make sure one local event cannot destroy two required keys.
- Include the checked wallet descriptor with each signer recovery package.

---

## Recovery Scenarios

### Scenario 1: One Signer Lost/Stolen
- **Impact:** The wallet still works while two independent signers remain.
- **Action:** Move funds to a new 2-of-3 wallet with a replacement signer.
- **Urgency:** Medium. The thief can't spend with 1 key, but don't delay.

### Scenario 2: One Signer Destroyed (Fire/Flood)
- **Impact:** The wallet still works while two independent signers remain.
- **Action:** Follow that signer's documented recovery process in a separate
  test environment. Confirm that it produces the expected xpub before use.

### Scenario 3: Lost Wallet Descriptor
- **Impact:** Critical if you also lost devices.
- **Action:** Rebuild only from a checked copy of the complete descriptor or
  from all three public-key expressions with their origins and derivation paths.
  Two signer keys alone do not reconstruct the original wallet.
- **Prevention:** Keep a checked descriptor with every signer recovery package.

### Scenario 4: Total Recovery from Backups
If all active signers are gone but two signer backups and the descriptor remain:
1. Restore two signer backups in separate test environments.
2. Recreate the multisig wallet in Sparrow from the checked descriptor.
3. Verify that the restored signers derive the expected addresses.
4. Sign a recovery transaction with both restored keys.
5. Move the funds to a new wallet with fresh keys.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Addresses don't match across devices | Stop and recreate the wallet from each signer's exact recorded fingerprint, derivation path, and xpub. Do not force different signer implementations onto one path. |
| A device rejects the multisig PSBT | Register the multisig wallet on that device first, using its own import step. |
| Only 1 signature but need 2 | Sign with a second device. The PSBT carries the first signature. |
| "Unknown signer" error | The device doesn't recognize itself in the multisig. Re-register the wallet config on the device. |
| Sparrow shows "partially signed" | Normal after 1 of 2 signatures. Sign with another device to complete. |

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
