# Bull Bitcoin & BULL Wallet — Complete Guide
*Bitcoin Butlers Master Concierge*
*Last verified: Feb 2026 | References: @unruggable full tutorial (Oct 2025), Bull Bitcoin blog*

---

## What Is Bull Bitcoin?

Bull Bitcoin is two things:

1. **BULL Wallet** — A free, open-source (FOSS) Bitcoin-only mobile wallet for iOS and Android
2. **Bull Bitcoin Exchange** — A non-custodial Bitcoin exchange (buy/sell BTC directly to your wallet)

Both are built by Francis Pouliot and team, with a cypherpunk ethos: privacy first, Bitcoin only, no shitcoins.

---

## BULL Wallet

### Key Features

| Feature | Details |
|---------|---------|
| Open source | 100% FOSS — github.com/SatoshiPortal/bullbitcoin-mobile |
| Bitcoin only | No altcoins. Bitcoin on-chain + Lightning + Liquid |
| Privacy | PayJoin support, no tracking, no ads |
| Hardware wallet | ColdCard integration (sign transactions via SD card or QR) |
| Atomic swaps | Move between on-chain ↔ Lightning ↔ Liquid without trusting an exchange |
| Backup | Recoverbull — encrypted backup to cloud storage with anonymous key servers |
| Exchange integration | Optional Bull Bitcoin exchange for buying/selling (opt-in, jurisdiction dependent) |
| Cost | Free |

### What Makes It Different from Sparrow?

| | BULL Wallet | Sparrow |
|--|-----------|---------|
| Platform | Mobile (iOS/Android) | Desktop (Mac/Win/Linux) |
| Best for | Daily transactions, Lightning payments | Cold storage management, multisig, coin control |
| Hardware wallet support | ColdCard | All major devices |
| Multisig | Not primary use case | Full multisig coordinator |
| Privacy features | PayJoin, Liquid confidential txs | Coin control, PayJoin, Tor |
| Exchange built in | Yes (Bull Bitcoin) | No |

**Think of it this way:** Sparrow is your vault manager. BULL Wallet is your daily carry.

---

## Setting Up BULL Wallet

### Step 1: Download
1. **iPhone:** App Store → search "BULL Wallet" or "Bull Bitcoin"
2. **Android:** Google Play → search "BULL Wallet" or download APK from bullbitcoin.com

### Step 2: Create a New Wallet
1. Open the app. Tap **Create New Wallet**.
2. The app generates a seed phrase (12 or 24 words).
3. **Write down every word carefully.** Same rules as any hardware wallet:
   - No photographs
   - No typing into any other device
   - Private location, no cameras
4. Verify your backup by re-entering select words.

### Step 3: Set Security
1. Set a PIN or biometric lock for the app.
2. Optional: Set up **Recoverbull** encrypted backup:
   - The app encrypts your wallet with a PIN
   - Stores the encrypted backup on cloud storage (iCloud/Google Drive)
   - Recovery requires BOTH the PIN AND the encrypted file
   - Anonymous key servers participate — no single party can decrypt
   - **This is a convenience backup, not a replacement for your written seed words**

### Step 4: Explore the Wallet
- **Receive:** Tap to generate a Bitcoin address or Lightning invoice
- **Send:** Paste an address, scan a QR, or pay a Lightning invoice
- **Swap:** Move between on-chain ↔ Lightning ↔ Liquid via atomic swaps (no trust required)

---

## Using BULL Wallet with ColdCard

BULL Wallet can pair with ColdCard for signing, turning your phone into a watch-only wallet while ColdCard holds the keys.

### Setup
1. In BULL Wallet: **Settings → Hardware Wallet → ColdCard**
2. On ColdCard: **Export Wallet → For BULL Wallet** (or generic xpub export)
3. Transfer the wallet file via MicroSD or QR code
4. BULL Wallet imports the public keys — it can now show balances and create transactions

### Signing a Transaction
1. Create a transaction in BULL Wallet
2. Export the unsigned PSBT (via QR or file)
3. Sign on ColdCard
4. Import the signed transaction back into BULL Wallet
5. Broadcast

---

## Bull Bitcoin Exchange (Non-Custodial)

### What It Does
- Buy Bitcoin with fiat → BTC sent directly to YOUR wallet
- Sell Bitcoin → fiat deposited to your bank account
- **Non-custodial:** Bull Bitcoin never holds your Bitcoin. Purchases go straight to the address you provide.
- Available in Canada, Europe, and expanding globally

### Setting Up DCA (Dollar-Cost Averaging)

1. Create a Bull Bitcoin exchange account at **bullbitcoin.com**
2. Complete KYC verification (required for fiat on-ramp)
3. Link your bank account for recurring purchases
4. Set your DCA schedule: weekly, bi-weekly, or monthly
5. **Set withdrawal address to your own wallet** — BULL Wallet, Sparrow, or your hardware wallet's receive address
6. Each purchase is automatically sent to your wallet

### DCA into Multisig
1. In Sparrow: Generate a receive address from your multisig wallet
2. In Bull Bitcoin: Set this as your withdrawal address
3. BTC purchased → sent directly to multisig
4. **Rotate addresses** for privacy: generate a new address for each purchase

> **Why Bull Bitcoin for DCA?** Unlike Coinbase/Kraken/etc., Bull Bitcoin never holds your coins. The purchase is non-custodial from the start. Your Bitcoin goes to your address, not an exchange wallet you later withdraw from.

---

## PayJoin (Privacy Feature)

BULL Wallet supports PayJoin (BIP-78), a privacy protocol that makes Bitcoin transactions harder to analyze on-chain.

### How It Works
- In a normal transaction: sender's inputs → recipient's address + change
- Blockchain analysis can identify sender and recipient
- In a PayJoin: both sender AND recipient contribute inputs to the transaction
- This breaks the common "same-owner" assumption that blockchain analysis relies on
- Result: outside observers can't easily determine who paid whom

### Using PayJoin
1. Both sender and recipient must use PayJoin-compatible wallets (BULL Wallet, Sparrow, BTCPay Server)
2. The recipient shares a PayJoin-enabled payment URI
3. BULL Wallet automatically negotiates the PayJoin
4. The transaction looks like a normal payment on-chain but is much harder to analyze

---

## Liquid Network (Confidential Transactions)

BULL Wallet supports Liquid, a Bitcoin sidechain that offers:
- **Confidential transactions:** Amounts are hidden from public view
- **Faster settlements:** ~2 minute block times (vs ~10 min on mainnet)
- **Lower fees:** Useful for frequent or smaller transactions
- **Atomic swaps:** Move between on-chain ↔ Liquid without trusting anyone

### When to Use Liquid
- Sending Bitcoin when you want amount privacy
- Frequent transactions between parties who both support Liquid
- Holding L-BTC for faster settlement when needed

### When NOT to Use Liquid
- Long-term cold storage (use on-chain Bitcoin)
- Receiving from someone who doesn't support Liquid
- Maximum decentralization (Liquid has a federation of signers)

---

## Recent Features (Late 2025 Updates)

### Bitcoin Price Graph
The wallet now includes a built-in Bitcoin price chart — no need to leave the app or check external sites. View price history directly alongside your balance.

### In-App Support (Bitcoin Mentor)
BULL Wallet integrates directly with **bitcoinsupport.com** (powered by Bitcoin Mentor). You can request 1-on-1 phone support from a real Bitcoiner without leaving the wallet. Available as a paid 30-minute session for hands-on help with setup or troubleshooting.

### Improved Balance Management
Latest updates include better UTXO management and balance tracking, giving you more control over which coins to spend and clearer accounting of your holdings across on-chain, Lightning, and Liquid layers.

---

## Ongoing Tips

- **Keep the app updated** — FOSS projects iterate quickly
- **Recoverbull is convenience, not primary backup** — your written/steel seed is the real backup
- **Use Lightning for small payments** — fast, cheap, and private
- **Use on-chain for large amounts** — more secure, fully decentralized
- **Use Liquid for confidential amounts** — when you don't want transaction amounts public
- **Rotate receive addresses** — never reuse an address for privacy

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| App crashes on startup | Update to latest version. Clear app cache. Reinstall if needed (recover with seed or Recoverbull). |
| Lightning payment fails | Check channel liquidity. Try a smaller amount. Some routes may not have capacity. |
| ColdCard not recognized | Ensure wallet export format matches. Re-export from ColdCard and re-import. |
| Atomic swap stuck | Swaps have a timeout. If it doesn't complete, funds return automatically. Wait for the timeout period. |
| Exchange features not available | Jurisdiction dependent. Some countries don't have exchange access yet. |

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
