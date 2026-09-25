# Offline Signer - Bitcoin Core on a Dedicated Computer
*Last verified against Bitcoin Core documentation: Sep 2026*

---

## What It Is

This setup uses two Bitcoin Core wallets on two computers.

The offline computer holds the private keys and signs PSBTs.
It stays disconnected from all networks.
The online computer holds a watch-only wallet, verifies the blockchain, creates
unsigned PSBTs, and broadcasts signed transactions.

This follows Bitcoin Core's official offline-signing model.

## Trade-offs

**What this setup gives you:**

- Private keys stay away from internet-connected systems.
- Both sides use free and open-source Bitcoin Core software.
- The online wallet can track balances and create payments without private
  keys.

**What remains difficult:**

- You must maintain two computers and a strict offline boundary.
- Transfer media can carry malicious data between the computers.
- Bitcoin Core does not provide a small, dedicated trusted display.
- Backups and recovery require more work than a normal online wallet.
- Every payment requires a PSBT transfer and careful output review.

## What You Need

- One dedicated computer that will stay offline
- One online computer that can run a synchronized Bitcoin Core node
- The same verified Bitcoin Core release on both computers
- Transfer media reserved for the signing workflow
- Separate encrypted media for wallet backups
- A written recovery procedure
- A small amount of signet bitcoin for the first test

## Build the Setup

1. Read Bitcoin Core's complete offline-signing tutorial before creating keys.
2. Download and verify Bitcoin Core on the online computer.
3. Transfer the verified installer to the offline computer.
4. Remove or disable every network interface on the offline computer.
5. Start both Bitcoin Core instances on signet.
6. Create and encrypt the signing wallet on the offline computer.
7. Export its watch-only wallet using Bitcoin Core's supported export flow.
8. Move the watch-only wallet to the online computer.
9. Load the watch-only wallet and let the online node synchronize it.
10. Generate a receive address on both computers and compare the complete
    address.
11. Receive a small signet payment.
12. Create an unsigned PSBT with the online watch-only wallet.
13. Move the PSBT to the offline computer.
14. Inspect every payment output and the fee on the offline computer.
15. Sign the PSBT with the offline wallet.
16. Move the signed PSBT back to the online computer.
17. Finalize and broadcast it from the online computer.
18. Repeat the flow after restoring the offline wallet from backup.
19. Start again on mainnet only after the signing and recovery tests succeed.
    Signet keys do not carry over. Create a new wallet and repeat every step.

## Verify It Works

- The offline computer has no working network connection.
- Both wallets derive the same receive addresses.
- The online wallet cannot sign the PSBT.
- The offline wallet signs only after you inspect the outputs and fee.
- The online wallet broadcasts the returned signed transaction.
- A restored offline backup can sign a new signet transaction.

## Backup

Back up the encrypted offline wallet with Bitcoin Core's supported wallet backup
function.
Also preserve the watch-only wallet data and the written transfer procedure.
Store the signing-wallet backup away from both computers.

The watch-only data does not authorize spending, but it exposes wallet history
and must still be treated as private.

## Common Mistakes

- Connecting the offline computer to a network after it creates keys
- Installing software on the offline computer without verifying it
- Using the same removable media for unrelated files
- Signing without inspecting every output and the fee
- Testing the process for the first time with mainnet funds
- Backing up only the online watch-only wallet
- Assuming that encryption replaces a physical access policy

## Official Sources

- [Bitcoin Core: Offline Signing Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/offline-signing-tutorial.md)
- [Bitcoin Core: PSBT How-to](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md)
- [Bitcoin Core: Managing Wallets](https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
