# Bitcoin Core as One Multisig Signer
*Last verified against Bitcoin Core and Sparrow documentation: Sep 2026*

---

## What It Is

This route uses one or more offline Bitcoin Core wallets in a Sparrow-managed
2-of-3 multisignature wallet. Other keys can use SeedSigner, Jade, or another
independent Bitcoin Core wallet.

Sparrow stores the public wallet data and creates PSBTs. Bitcoin Core keeps its
private key offline and signs only the PSBTs that you transfer to it.

## Trade-offs

**What this signer adds:**

- It adds a signer implementation that is independent from the hardware-wallet
  projects.
- Its private key can stay on a dedicated offline computer.
- Bitcoin Core provides descriptor-wallet and PSBT tools for inspection and
  signing.

**What remains difficult:**

- Bitcoin Core does not provide a separate trusted display.
- You must preserve the signer wallet backup, its origin information, and the
  complete multisig descriptor.
- The Core key may use a different derivation path from the hardware keys.
- Every payment requires a file transfer to and from the offline computer.

## Prepare Each Core Key

1. Read Bitcoin Core's official multisig and PSBT tutorials.
2. Download and verify Bitcoin Core on the online computer.
3. Transfer the verified installer to the dedicated offline computer.
4. Remove or disable every network interface on the offline computer.
5. Start the offline Bitcoin Core instance on mainnet.
6. Create and encrypt a new descriptor wallet for this signer.
7. Back up the signer wallet to separate encrypted media.
8. Follow Bitcoin Core's multisig tutorial to obtain the key origin and xpub
   from a derivation path that this wallet can sign.
9. Record the master fingerprint, complete derivation path, and xpub together.

Use mainnet settings and your own wallet data when you follow the official examples.
Do not copy their example network options, keys, or addresses.

Repeat this process in a separate wallet and signing environment for every Core
key in the policy. Never reuse one Core wallet for two key slots.

BIP-48 defines `m/48'/0'/0'/2'` as the standard account path for this script
type. Record the path your wallet actually uses. A path outside BIP-48 still
works inside the descriptor, and it makes recovery in other software harder.

Do not choose a different derivation path only to make it match another signer.
Bitcoin Core must recognize the path as belonging to the signer wallet.

## Add the Key to Sparrow

1. Create or open the 2-of-3 multisignature wallet in Sparrow.
2. Open the keystore for the Bitcoin Core key.
3. Choose **xPub / Watch Only Wallet**.
4. Enter the master fingerprint, derivation path, and xpub exactly as Bitcoin
   Core produced them.
5. Add every other signer through its documented xpub, USB, or air-gapped import
   flow.
6. Confirm the policy is 2-of-3 native SegWit multisignature.
7. Apply the wallet and export its output descriptor.

Sparrow supports watch-only xpub keystores, multisignature wallets, and PSBT
signing flows. Different keystores can record their own origin paths.

## Verify the Wallet

1. Create a blank Bitcoin Core wallet with private keys disabled on the offline
   computer.
2. Import Sparrow's public multisig descriptor into that watch-only wallet.
3. Generate receive addresses in Sparrow and in the Core watch-only wallet.
4. Confirm the complete addresses match.
5. Register the same multisig policy on each hardware signer, where present.
6. Verify the receive address in every signer environment that supports it.
7. Save the checked descriptor with every recovery package.

Stop if Sparrow and Bitcoin Core do not derive the same addresses.

## Sign a Payment

1. Create and inspect the transaction in Sparrow.
2. Save the unsigned PSBT to dedicated transfer media.
3. Move the PSBT to the offline computer.
4. Load or decode it with the Core watch-only multisig wallet.
5. Verify every output, the change address, and the fee.
6. Sign it with the Core signer wallet by using `walletprocesspsbt`.
7. Move the partially signed PSBT back to Sparrow.
8. Collect the remaining signature from another selected signer.
9. Finalize and broadcast only after Sparrow reports the required signatures.

## Test Recovery

Use the actual mainnet wallet for this test before depositing more than the test
amount.
Keep the original wallet and signers unchanged.

1. Restore the Core signer-wallet backup in a separate trusted offline environment.
2. Restore a second signer's backup in a separate trusted signer environment.
   Keep hardware seeds on a compatible signing device.
3. Recreate the Sparrow wallet from the backed-up public multisig descriptor.
4. Import that descriptor into an offline watch-only wallet for transaction review.
5. Compare the restored key origins and the complete receive address with the
   original wallet.
   Stop if any value differs.
6. Check the current fee estimate.
   Choose a test amount you can afford to lose that comfortably covers the
   outgoing fee and leaves an output the receiving wallet can accept.
7. Receive only that small mainnet payment to the verified address.
   Wait for confirmation.
8. Follow **Sign a Payment** above using the restored Sparrow wallet and both
   restored signers.
   Send the test balance, minus the fee, to a verified address in another wallet
   you control.
9. Wait for confirmation and check that the other wallet receives the payment.
   Deposit more only after this recovery test succeeds.

Private Core backups stay offline and hardware seeds stay on signing devices.
The online Sparrow wallet holds only public wallet data.
This test uses real bitcoin.
A mistake can lose the entire test amount, and transaction fees are spent even
when the test succeeds.
Multisig transactions are larger than single-key transactions, so check the fee
for this wallet rather than using a single-key estimate.
Wait if the current fees make the test too expensive.

## Common Mistakes

- Importing private Core wallet data into Sparrow
- Omitting the fingerprint or derivation path from the Core xpub record
- Assuming all signers must use the same derivation path
- Keeping the only Core wallet backup with the offline computer
- Signing before checking outputs in the watch-only multisig wallet
- Depositing more before the restored signers complete the test payment

## Official Sources

- [Bitcoin Core: Multisig Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/multisig-tutorial.md)
- [Bitcoin Core: PSBT How-to](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md)
- [Bitcoin Core: Output Descriptors](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
- [Sparrow: Quick Start](https://sparrowwallet.com/docs/quick-start.html)
- [Sparrow: Features](https://sparrowwallet.com/features/)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
