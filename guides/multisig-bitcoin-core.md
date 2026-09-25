# Multisig with Bitcoin Core
*Last verified against Bitcoin Core documentation: Sep 2026*

---

## What It Is

This route uses Bitcoin Core for a 2-of-3 multisignature wallet.
Three separate Bitcoin Core wallets hold three different keys.
A watch-only Bitcoin Core wallet holds the multisig descriptor and coordinates
payments.
Any two signer wallets can authorize a payment.

This is an advanced route. Complete the full process on signet before you use
mainnet.

## Trade-offs

**What this setup gives you:**

- One lost key does not prevent spending.
- Each signing wallet can stay in a separate offline environment.
- Bitcoin Core documents the descriptor and PSBT workflow.
- The complete stack is free and open-source software.

**What remains difficult:**

- All three keys rely on the same Bitcoin Core implementation.
- Bitcoin Core does not provide a separate trusted display.
- You must protect three signer-wallet backups and the multisig descriptor.
- Every payment requires PSBT review, transfer, and at least two signatures.
- A mistake in the descriptor can create a wallet that is difficult to recover.

Using different signer projects can reduce common implementation risk. It also
adds different workflows. The concierge presents that as a recommendation, not
a requirement.

## What You Need

- Three separate Bitcoin Core signer wallets with different keys
- Separate offline signing environments where practical
- One online Bitcoin Core node and watch-only multisig wallet
- Dedicated transfer media for the PSBT workflow
- Separate backups for each signer wallet
- Multiple copies of the public multisig descriptor
- A small amount of signet bitcoin for setup and recovery tests

## Build the Setup

1. Read Bitcoin Core's official multisig and PSBT tutorials in full.
2. Download and verify the same Bitcoin Core release for every environment.
3. Start the online node on signet.
4. Create three descriptor signer wallets. Create a new key in each wallet.
5. Encrypt and back up each signer wallet separately.
6. Extract the key origin and account xpub from each signer wallet by following
   the official multisig tutorial.
7. Create a 2-of-3 native SegWit descriptor in this form, where each key
   carries its origin as `[fingerprint/derivation path]xpub...`:
   `wsh(sortedmulti(2,KEY_A/<0;1>/*,KEY_B/<0;1>/*,KEY_C/<0;1>/*))`.
8. Add the checksum with Bitcoin Core's `getdescriptorinfo` RPC.
9. Create a blank watch-only wallet with private keys disabled.
10. Import the multisig descriptor into the watch-only wallet.
11. Import the same public descriptor into a watch-only wallet in each signing
    environment so each signer can review addresses and PSBTs.
12. Verify that every environment derives the same receive addresses.
13. Back up the checked descriptor separately from the three signer wallets.
14. Receive a small signet payment.
15. Complete the signing test below with two signer wallets.
16. Restore two signer-wallet backups and the descriptor in a separate test
    environment. Confirm that they can spend the signet funds.

Never copy a private descriptor or signer-wallet backup to the online
coordinator.

BIP-48 defines `m/48'/0'/0'/2'` as the account path for this script type, and
other coordinators expect it. Record the exact path each wallet uses, because
recovery in other software needs it. The steel backup guide shows a complete
descriptor.

Signet keys and descriptors do not carry over to mainnet. Repeat every step in
this section with new keys and a new descriptor, and complete the recovery test
again, before you receive mainnet funds.

## Sign a Payment

1. Create an unsigned PSBT in the online watch-only multisig wallet.
2. Move the PSBT to the first offline environment.
3. Decode it with the watch-only multisig wallet. Verify every output and fee.
4. Sign it with the first signer wallet by using `walletprocesspsbt`.
5. Repeat the review and signing step with a second signer wallet.
6. Combine the two signed PSBTs with `combinepsbt`, or pass one PSBT through
   both signer wallets in sequence.
7. Finalize the complete PSBT with `finalizepsbt`.
8. Broadcast the finalized transaction from the online node.

## Backup and Recovery

Recovery needs two signer-wallet backups and the complete public multisig
descriptor.
Store the three signer backups in separate locations.
Store the descriptor with more than one backup location because it contains the
key origins, xpubs, derivation paths, script type, and threshold.

Test recovery again after a major Bitcoin Core upgrade or any change to the
signing procedure.

## Common Mistakes

- Creating two signer wallets from the same key
- Keeping all signer wallets and backups on one computer
- Importing private descriptors into the online watch-only wallet
- Rebuilding the descriptor with different key origins or derivation paths
- Signing a PSBT without checking the outputs in the multisig wallet
- Using `joinpsbts` instead of `combinepsbt` for copies of the same PSBT
- Testing recovery for the first time after receiving mainnet funds

## Official Sources

- [Bitcoin Core: Multisig Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/multisig-tutorial.md)
- [Bitcoin Core: PSBT How-to](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md)
- [Bitcoin Core: Output Descriptors](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
- [Bitcoin Core: Managing Wallets](https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
