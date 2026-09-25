# Prepare an Offline Bitcoin Core Multisig Key
*Last verified against Bitcoin Core documentation: Sep 2026*

---

## What It Is

This step prepares one offline Bitcoin Core key for a 2-of-3 multisignature
wallet.
The later coordinator guide creates the wallet, adds all three keys, tests
recovery, and signs a transaction.

## Trade-offs

**What this key adds:**

- It uses a signer implementation that is independent from the hardware-wallet
  projects.
- Its private key can stay on a dedicated offline computer.
- Bitcoin Core provides descriptor-wallet and PSBT tools for inspection and
  signing.

**What remains difficult:**

- Bitcoin Core does not provide a separate trusted display.
- You must maintain the offline computer and a strict transfer process.
- The key can use a different derivation path from the hardware signers.
- You must preserve the signer wallet backup and its complete origin details.

## What You Need

- One dedicated computer that will stay offline
- A verified Bitcoin Core installer
- Transfer media reserved for the signing workflow
- Separate encrypted media for the signer-wallet backup
- A private workspace
- A written record for the fingerprint, derivation path, and xpub

## Prepare the Key

1. Read Bitcoin Core's official multisig and PSBT tutorials.
2. Download and verify Bitcoin Core on an online computer.
3. Transfer the verified installer to the dedicated offline computer.
4. Remove or disable every network interface on the offline computer.
5. Start Bitcoin Core on signet.
6. Create and encrypt a new descriptor wallet for this signer.
7. Back up the signer wallet to separate encrypted media.
8. Follow Bitcoin Core's multisig tutorial to obtain the key origin and xpub
   from a derivation path that this wallet can sign.
9. Record the master fingerprint, complete derivation path, and xpub together.
10. Stop before you create the multisignature wallet.

BIP-48 defines `m/48'/0'/0'/2'` as the standard account path for this script
type. Record the path your wallet actually uses. A path outside BIP-48 still
works inside the descriptor, and it makes recovery in other software harder.

Do not change the derivation path only to make it match another signer.
The coordinator must use the exact origin and path that belong to this Bitcoin
Core wallet.

Repeat this process in a separate wallet and signing environment for every Core
key in the policy.
Never reuse one Core wallet for two key slots.

Signet keys do not carry over to mainnet. Prepare every mainnet key again from
step 1, and record its own origin details.

## Verify It Works

- The signer computer has no working network connection.
- Bitcoin Core reports the recorded fingerprint and derivation path for the
  signer key.
- The recorded xpub belongs to the encrypted signer wallet.
- The wallet backup can be loaded in a separate signet test environment.

## Backup

Keep the encrypted signer-wallet backup away from the offline computer.
Keep the recorded fingerprint, derivation path, and xpub with the recovery
material.
The later coordinator guide adds the complete multisignature descriptor after
all three keys are combined.

## Common Mistakes

- Connecting the signer computer to a network after it creates the key
- Recording the xpub without its fingerprint and complete derivation path
- Forcing the Core key onto a hardware-wallet derivation path
- Reusing one Core wallet for more than one key slot
- Treating the public xpub record as a replacement for the private wallet backup
- Continuing to mainnet before the complete signet recovery test succeeds

## Official Sources

- [Bitcoin Core: Multisig Tutorial](https://github.com/bitcoin/bitcoin/blob/master/doc/multisig-tutorial.md)
- [Bitcoin Core: PSBT How-to](https://github.com/bitcoin/bitcoin/blob/master/doc/psbt.md)
- [Bitcoin Core: Output Descriptors](https://github.com/bitcoin/bitcoin/blob/master/doc/descriptors.md)
- [Bitcoin Core: Managing Wallets](https://github.com/bitcoin/bitcoin/blob/master/doc/managing-wallets.md)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
