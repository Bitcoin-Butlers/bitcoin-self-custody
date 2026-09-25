# Software Wallet - Bitcoin Core on an Online Computer
*Last verified against Bitcoin Core documentation: Sep 2026*

---

## What It Is

Bitcoin Core can verify the blockchain and hold private keys in a descriptor
wallet on the same computer.

This is a hot wallet because the computer has a network connection.
It is useful for learning, active spending, and amounts for which you accept the
risk of a general-purpose online computer.

For long-term savings, compare this route with an external signer or the
[offline Bitcoin Core setup](bitcoin-core-offline.md).

## Trade-offs

**What this setup gives you:**

- Bitcoin Core verifies blocks and transactions instead of trusting a wallet
  server.
- One application creates the wallet, receives funds, signs payments, and
  broadcasts transactions.
- The wallet uses Bitcoin Core's maintained descriptor-wallet format.

**What remains exposed:**

- Malware with access to the computer may reach the wallet or change payment
  details.
- Disk failure can destroy an untested wallet backup.
- Full initial synchronization needs time, bandwidth, and storage.
- Bitcoin Core does not provide a separate trusted screen for address and
  payment verification.

## What You Need

- A supported desktop operating system
- The current Bitcoin Core release from an official source
- Enough storage for your selected node mode
- Encrypted backup media stored away from the computer
- A small amount of signet bitcoin for the first test

## Build the Setup

1. Download Bitcoin Core from the official project site.
2. Verify the download using the project's published verification process.
3. Install Bitcoin Core and start it on signet first.
4. Let the node synchronize.
5. Create a new descriptor wallet.
6. Encrypt the wallet with a strong, unique passphrase.
7. Create a wallet backup with Bitcoin Core's `backupwallet` function.
8. Store the backup separately from the computer.
9. Generate a receive address and receive a small signet payment.
10. Create and send a signet payment.
11. Restore the backup in a separate test environment and confirm that it
    reproduces the expected wallet.
12. Start again on mainnet only after the complete signet test succeeds.

## Verify It Works

- Bitcoin Core reports that the node is synchronized.
- The wallet receives the signet payment.
- The wallet creates, signs, and broadcasts the return payment.
- The restored test wallet produces the expected addresses and history.

## Backup

Back up the wallet with Bitcoin Core's supported wallet backup function.
Record which Bitcoin Core release created it and how an heir can restore it.
Test the backup before the wallet holds meaningful funds.

Do not keep the only backup on the same computer as the live wallet.

## Common Mistakes

- Calling the online wallet cold storage because it runs Bitcoin Core
- Skipping download verification
- Using mainnet for the first setup attempt
- Keeping the only wallet backup on the computer
- Forgetting the encryption passphrase
- Assuming a full node prevents malware from stealing wallet keys

## Official Sources

- [Bitcoin Core: Managing Wallets](https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md)
- [Bitcoin Core downloads](https://bitcoincore.org/en/download/)
- [Bitcoin Core: Download Verification](https://bitcoincore.org/en/download/verify.html)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
