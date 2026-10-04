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
- A small amount of bitcoin that you can afford to lose during the recovery test
- A verified receive address in another wallet you control

## Build the Setup

1. Read Bitcoin Core's complete offline-signing tutorial before creating keys.
2. Download and verify Bitcoin Core on the online computer.
3. Transfer the verified installer to the offline computer.
4. Remove or disable every network interface on the offline computer.
5. Start both Bitcoin Core instances on mainnet.
6. Create and encrypt the signing wallet on the offline computer.
7. Export its watch-only wallet using Bitcoin Core's supported export flow.
8. Move the watch-only wallet to the online computer.
9. Load the watch-only wallet and let the online node synchronize it.
10. Generate a receive address on both computers and compare the complete
    address.
11. Back up the encrypted signing wallet and its public watch-only wallet data.
12. Keep the original wallets unchanged.
    Restore the signing-wallet backup in a separate trusted offline environment.
    Restore the public watch-only data in a separate online recovery wallet.
13. Compare the complete receive address in both restored wallets with the
    address recorded in step 10.
    Stop if any address differs.
14. Check the current fee estimate and choose the test amount as described below.
15. Receive only that small mainnet payment to the verified address.
    Wait for confirmation.
16. Create an unsigned PSBT with the restored online watch-only wallet to send
    the test balance, minus the fee, to the verified address in your other wallet.
17. Move the PSBT to the restored offline signing environment.
18. Inspect every payment output, the change address if present, and the fee.
19. Sign the PSBT with the restored signing wallet.
20. Move the signed PSBT back to the restored online watch-only wallet.
21. Finalize and broadcast it from the online computer.
22. Wait for confirmation and check that the other wallet receives the payment.
    Deposit more only after this recovery test succeeds.

Use mainnet settings and your own wallet data when you follow the official examples.
Do not copy their example network options, keys, or addresses.

Private signing-wallet backups stay offline during recovery.
Only public wallet data and PSBTs go to the online computer.
This test uses real bitcoin.
A mistake can lose the entire test amount, and transaction fees are spent even
when the test succeeds.
Choose an amount that comfortably covers the outgoing fee and leaves an output
the receiving wallet can accept.
Wait if the current fees make the test too expensive.

## Verify It Works

- The offline computer has no working network connection.
- Both wallets derive the same receive addresses.
- The online wallet cannot sign the PSBT.
- The restored offline wallet signs only after you inspect the outputs and fee.
- The restored online wallet broadcasts the returned signed transaction.
- The other wallet receives the confirmed mainnet payment.

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
- Depositing more before the restored wallets complete the test payment
- Backing up only the online watch-only wallet
- Assuming that encryption replaces a physical access policy

## Official Sources

- [Bitcoin Core: Offline Signing Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/offline-signing-tutorial.md)
- [Bitcoin Core: PSBT How-to](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md)
- [Bitcoin Core: Managing Wallets](https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
