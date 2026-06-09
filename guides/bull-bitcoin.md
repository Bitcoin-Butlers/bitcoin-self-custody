# Bull Bitcoin Wallet - Setup Guide


---

## What is Bull Bitcoin?

Bull Bitcoin is a non-custodial Bitcoin wallet and exchange. Your keys stay on your device - Bull Bitcoin never holds your Bitcoin. It's ideal as a single-sig hot wallet for daily spending and as an on/off ramp.

## Why Bull Bitcoin?

- **Non-custodial** - you control your keys at all times
- **No KYC for wallet** - KYC only required for buy/sell (Canadian exchange)
- **Built-in exchange** - buy and sell Bitcoin directly in the app
- **Lightning support** - fast, cheap payments
- **Open source** - verifiable code
- **Bill payments** - pay bills directly with Bitcoin (Canada)

## Download

- **iOS**: [App Store](https://apps.apple.com/app/bull-bitcoin/id1577480907)
- **Android**: [Google Play](https://play.google.com/store/apps/details?id=com.bullbitcoin.mobile)

## Initial Setup

> This guide covers using Bull Bitcoin as a self-custody hot wallet. For exchange features, see Bull Bitcoin's own documentation.

### Step 1: Install and Open

Download the app for your platform. Open it and select **Create New Wallet** or **Import Existing Wallet** if connecting to your hardware signing device.

### Step 2: Connect Your Hardware Wallet

If you're using a signing device (ColdCard, SeedSigner, Jade):

1. Export the wallet's **public key (xpub)** from your signing device.
2. In Bull Bitcoin, select **Import Watch-Only Wallet**.
3. Scan the QR code or import the file from your device.
4. Bull Bitcoin can now generate receive addresses and build transactions, but your signing device holds the private keys.

If you're using Bull Bitcoin as a standalone hot wallet, it will generate a 12-word seed phrase. Write it down and back it up on steel.

### Step 3: Set a PIN

Choose a PIN for daily access. This protects the app on your phone.

## Receiving Bitcoin

1. Tap **Receive**
2. Share the QR code or address with the sender
3. Wait for confirmation (on-chain) or instant (Lightning)

## Sending Bitcoin

1. Tap **Send**
2. Scan a QR code or paste an address
3. Review the amount and fee
4. Confirm and send

## Security Notes

- Bull Bitcoin is a **hot wallet** - your phone is connected to the internet
- Keep only spending amounts here, not your life savings
- For large amounts, use a hardware wallet (SeedSigner, ColdCard, or Jade)
- Back up your seed phrase on steel and store it securely

## Resources

- [Bull Bitcoin Website](https://www.bullbitcoin.com)
- [Bull Bitcoin GitHub](https://github.com/nicehash/bullbitcoin-mobile)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
