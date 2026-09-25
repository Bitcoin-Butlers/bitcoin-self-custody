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
5. Start the offline Bitcoin Core instance on signet.
6. Create and encrypt a new descriptor wallet for this signer.
7. Back up the signer wallet to separate encrypted media.
8. Follow Bitcoin Core's multisig tutorial to obtain the key origin and xpub
   from a derivation path that this wallet can sign.
9. Record the master fingerprint, complete derivation path, and xpub together.

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

Complete the entire process on signet before receiving mainnet funds.
Signet keys and descriptors do not carry over. Prepare every mainnet key again,
rebuild the Sparrow wallet, and repeat this test.
Restore the Core signer wallet from backup in a separate test environment.
Recreate the multisig wallet from the descriptor.
Confirm that two restored signers can authorize a new signet payment.

## Common Mistakes

- Importing private Core wallet data into Sparrow
- Omitting the fingerprint or derivation path from the Core xpub record
- Assuming all signers must use the same derivation path
- Keeping the only Core wallet backup with the offline computer
- Signing before checking outputs in the watch-only multisig wallet
- Testing the mixed workflow for the first time with mainnet funds

## Official Sources

- [Bitcoin Core: Multisig Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/multisig-tutorial.md)
- [Bitcoin Core: PSBT How-to](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md)
- [Bitcoin Core: Output Descriptors](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
- [Sparrow: Quick Start](https://sparrowwallet.com/docs/quick-start.html)
- [Sparrow: Features](https://sparrowwallet.com/features/)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
