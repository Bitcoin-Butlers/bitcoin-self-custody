# Sparrow Wallet — Complete Setup Guide
*Bitcoin Butlers Master Concierge*

---

## What You'll Need
- Computer (Mac, Windows, or Linux)
- Internet connection (for download and blockchain sync)
- A signing device already set up (ColdCard, Passport, Jade, SeedSigner, etc.)
- 10-15 minutes for initial setup
- Optional: your own Bitcoin node (for maximum privacy)

---

## What Is Sparrow?

Sparrow is a desktop Bitcoin wallet designed for serious self-custody. It's the recommended companion for nearly every hardware signing device.

**What Sparrow does:**
- Shows your balance and transaction history (watch-only mode)
- Generates receive addresses
- Creates transactions for your hardware wallet to sign
- Supports single-sig AND multisig wallets
- Connects to your own node for privacy
- Full coin control (choose which UTXOs to spend)
- PSBT support (partially signed Bitcoin transactions)

**What Sparrow does NOT do:**
- Hold your private keys (those stay on your hardware device)
- Require an account or registration
- Send data to anyone (unless you choose a public server)

---

## Step 1: Download and Verify

### Download
1. Go to **sparrowwallet.com/download**.
2. Download the installer for your operating system.

### Verify the Download (Recommended)
1. On the download page, find the **PGP signature** and **SHA256 hash**.
2. Verify the file hash matches:
   - **Mac:** `shasum -a 256 Sparrow-x.x.x.dmg`
   - **Windows:** `certutil -hashfile Sparrow-x.x.x.exe SHA256`
   - **Linux:** `sha256sum Sparrow-x.x.x.deb`
3. For PGP verification, import Craig Raw's public key and verify the `.asc` signature file.

> **Why verify?** If someone compromised the download (man-in-the-middle attack), a tampered Sparrow could generate addresses controlled by an attacker. Verification ensures you have the authentic software.

### Install
- **Mac:** Open the `.dmg`, drag Sparrow to Applications.
- **Windows:** Run the `.exe` installer.
- **Linux:** `sudo dpkg -i Sparrow-x.x.x.deb` or equivalent.

---

## Step 2: Choose Your Server Connection

On first launch, Sparrow asks how to connect to the Bitcoin network.

### Option A: Public Electrum Server (Easiest)
1. Select **Public Server**.
2. Sparrow connects to a random public Electrum server.
3. **Trade-off:** The server can see which addresses you're querying (reduced privacy). Fine for getting started.

### Option B: Your Own Bitcoin Node (Maximum Privacy)
1. Select **Private Electrum Server** or **Bitcoin Core**.
2. Enter your node's address (e.g., `127.0.0.1:50001` for local Electrum server).
3. **No third party sees your addresses or balances.**

### Option C: Tor (Enhanced Privacy on Public Server)
1. Enable Tor in Sparrow's preferences.
2. Connect to a public server over Tor.
3. The server sees your queries but can't identify your IP.

> **Recommendation:** Start with a public server to get going. Migrate to your own node later for full privacy.

---

## Step 3: Create a New Wallet

1. Go to **File → New Wallet** (or click the + tab).
2. Name your wallet (e.g., "ColdCard Main", "Savings", "Multisig Vault").
3. Choose your wallet type:

### Single Signature (Standard)
- One signing device controls the wallet.
- Simplest setup.
- Good for most users.

### Multi Signature
- Requires M-of-N devices to sign (e.g., 2-of-3).
- More security, more complexity.
- See the **Multisig Guide** for detailed setup.

---

## Step 4: Connect Your Hardware Wallet

Under **Keystores**, you'll add your signing device.

### Air-Gapped (QR Code)
*Works with: ColdCard Q, Passport, Jade Plus, SeedSigner*

1. Click **Airgapped Hardware Wallet**.
2. Click **Scan** — your computer's camera opens.
3. On your device: export the wallet/xpub as a QR code.
4. Hold the device screen up to your computer's camera.
5. Sparrow reads the QR (may take a few seconds for animated QRs).

### Air-Gapped (MicroSD)
*Works with: ColdCard Mk4/Q, Passport*

1. Click **Airgapped Hardware Wallet**.
2. Click **Import File**.
3. Select the wallet export file (`.json`) from your MicroSD card.

### USB Connected
*Works with: ColdCard Mk4/Q, Jade, Passport (via USB)*

1. Click **Connected Hardware Wallet**.
2. Connect your device via USB and unlock it.
3. Click **Scan** — Sparrow detects the device.
4. Select it and import.

---

## Step 5: Verify the Connection

This step is critical — it confirms Sparrow and your hardware wallet are in sync.

1. Go to the **Receive** tab in Sparrow.
2. Click **Get Next Address** — an address appears.
3. On your hardware wallet, go to **Address Explorer** (or equivalent).
4. Find the same derivation path address.
5. **The addresses must match.** If they don't, something is wrong — do not use the wallet.

---

## Step 6: Receive Bitcoin

1. Go to the **Receive** tab.
2. Sparrow shows the next unused address + QR code.
3. **Always verify the address on your hardware device** before sharing it.
4. Copy the address or show the QR to the sender.
5. Once sent, the transaction appears in Sparrow's **Transactions** tab.
6. Wait for confirmations (1 confirmation = ~10 minutes, 6 = ~60 minutes for high security).

### Address Labels
- Sparrow lets you label each address (e.g., "Exchange withdrawal Feb 2026").
- Labels are stored locally and help you track where funds came from.
- Good practice: label every receive address.

---

## Step 7: Send Bitcoin

1. Go to the **Send** tab.
2. Enter the recipient address (paste or scan QR).
3. Enter the amount (BTC or USD equivalent).
4. Set the fee rate:
   - **Low priority:** 1-5 sat/vB (may take hours or days)
   - **Medium:** 10-20 sat/vB (within a few blocks)
   - **High priority:** 30+ sat/vB (next block)
   - Sparrow shows estimated confirmation time.
5. Click **Create Transaction**.
6. Review the transaction details.
7. Click **Finalize Transaction for Signing**.

### Sign the Transaction

#### Air-Gapped (QR)
1. Click **Show QR** — Sparrow displays an animated QR.
2. Scan with your hardware wallet.
3. Verify and sign on the device.
4. The device shows a signed QR.
5. In Sparrow: **Scan QR** → point camera at device screen.
6. Click **Broadcast**.

#### Air-Gapped (MicroSD)
1. Click **Save Transaction** → save PSBT to MicroSD.
2. Insert MicroSD into hardware wallet.
3. Sign on the device.
4. Move MicroSD back to computer.
5. In Sparrow: **Load Transaction** → select signed file.
6. Click **Broadcast**.

#### USB
1. With device connected and unlocked, click **Sign**.
2. Verify on device screen, confirm.
3. Sparrow broadcasts automatically.

---

## Advanced Features

### Coin Control
- In the **UTXOs** tab, you can see every individual "coin" (UTXO) in your wallet.
- When sending, you can choose EXACTLY which coins to spend.
- **Why it matters:** Privacy. Spending coins from different sources in the same transaction links them together on the blockchain.
- Click **Send Selected** on specific UTXOs to control this.

### Transaction Batching
- Send to multiple recipients in a single transaction.
- Saves on fees vs. making separate transactions.

### Replace-by-Fee (RBF)
- If a transaction is stuck (low fee), right-click it → **Bump Fee**.
- Sparrow creates a replacement transaction with a higher fee.
- The network replaces the old transaction with the new one.

### PayJoin
- Enhanced privacy technique where sender and receiver both contribute inputs.
- Sparrow supports PayJoin for compatible recipients.

### Watch-Only Mode
- Sparrow works without a connected signing device.
- You can see balances, generate addresses, and create unsigned transactions.
- Only need the hardware wallet when it's time to sign.

---

## Connecting to Your Own Node

For maximum privacy, run your own Bitcoin node and connect Sparrow to it.

### Bitcoin Core (Direct)
1. In Sparrow: **Preferences → Server → Bitcoin Core**.
2. Enter your node's RPC details (host, port, user, password).

### Electrum Server (Recommended)
Run an Electrum server on top of Bitcoin Core:
- **Electrs** (lightweight, Rust-based)
- **Fulcrum** (high-performance)
- **Electrum Personal Server** (minimal)

1. In Sparrow: **Preferences → Server → Private Electrum Server**.
2. Enter `127.0.0.1:50001` (or your server's address).

### Why Your Own Node Matters
- Public Electrum servers can see which addresses you query.
- Your own node means NOBODY sees your financial activity.
- Full verification of every transaction against the blockchain.

---

## Backup and Recovery

### What Sparrow Stores Locally
- Wallet files (public keys, labels, configuration)
- Transaction labels
- UTXO labels
- Wallet password (encrypts the wallet file)

### What Sparrow Does NOT Store
- Private keys or seed phrases (those are on your hardware device)
- Your Bitcoin (that's on the blockchain)

### Recovering if Computer Dies
1. Set up Sparrow on a new computer.
2. Connect your hardware wallet.
3. Create a new wallet in Sparrow using the same hardware device.
4. Sparrow reconstructs everything from the blockchain.
5. Labels will be lost (unless you exported them).

### Exporting Labels
- **File → Export Wallet** to save your labels and configuration.
- Store the export file securely.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Connection refused" | Check server settings. If using public server, try a different one. Firewall may be blocking. |
| Hardware wallet not detected (USB) | Try a different cable. Ensure device is unlocked. On Mac, no driver needed. Windows may need drivers. |
| QR scan won't read | Clean camera lens. Ensure good lighting. Try moving closer/farther (6-12 inches is optimal). |
| Transactions not showing | Wait for sync to complete (progress bar at bottom). If using own node, ensure it's fully synced. |
| "Address verification failed" | The wallet in Sparrow doesn't match the hardware device. Delete and recreate the Sparrow wallet. |
| Balance shows 0 after setup | Sync may still be in progress. Check the status bar at the bottom. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
