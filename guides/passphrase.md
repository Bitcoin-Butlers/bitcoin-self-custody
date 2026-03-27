# Advanced Security - BIP-39 Passphrase

---

## What a Passphrase Does

A BIP-39 passphrase (sometimes called the "25th word") transforms your existing seed phrase into an entirely different wallet. Same 24 words, different passphrase, completely different addresses and keys.

This is not a password that locks your device. It is a cryptographic input that changes which wallet your seed generates. There is no "wrong" passphrase. Every passphrase produces a valid wallet. Enter the wrong one and you will see an empty wallet with no error message.

### The Decoy Strategy

With a passphrase, a single seed backup gives you two wallets:

- **No passphrase** = your decoy wallet. Keep a small amount here.
- **With passphrase** = your real vault. This is where your savings live.

If someone finds your steel backup and restores it without the passphrase, they see the decoy. Your real funds are invisible. This effectively turns single-sig into a 2-factor setup: the seed (something you have) plus the passphrase (something you know).

### How It Works Technically

Your seed phrase encodes a master secret (entropy). The BIP-39 standard runs this through a key-stretching function (PBKDF2) with the passphrase as a salt. Different salt, different master key, different wallet. No passphrase is equivalent to an empty string passphrase.

---

## When to Use a Passphrase

**Good reasons:**
- You want a decoy wallet in case of physical coercion ($5 wrench attack)
- Your seed backup location is not fully secure and you want an extra layer
- You want plausible deniability: the same steel plate can open a nearly-empty wallet

**Not necessary if:**
- You are already using multisig (the multiple-device requirement replaces the need for a passphrase)
- You have strong physical security for your backup (bank vault, multiple geographic locations)
- You are not confident you can reliably remember or securely store the passphrase long-term

---

## Storing Your Passphrase

Storing the passphrase on the same steel plate as your seed is not inherently bad. It depends on your threat model.

**Same plate:** Simpler. One backup to protect. If someone finds it, they get everything, but if your plate is in a secure location (safe deposit box, hidden in your home), this may be acceptable. The decoy strategy still works if a thief restores the seed without noticing the passphrase.

**Separate locations:** More secure against a targeted attacker who understands passphrases. But now you have two things to protect, two things that must survive, and two things your heirs need to find.

**In your memory only:** Maximum security, maximum risk. If you forget it or become incapacitated, the funds are gone permanently. No recovery. Not recommended as the sole storage method.

**Recommended approach:** Write the passphrase on your steel plate in a clearly marked section. Store the plate securely. The physical security of the plate location is your primary defense, not the separation of seed and passphrase.

---

## Common Mistakes

| Mistake | What Happens | Prevention |
|---------|-------------|------------|
| Forgetting the passphrase | Funds locked forever. No recovery possible. | Write it on your steel plate. Test recovery before loading real funds. |
| Using a short or guessable phrase | Brute-forceable if seed is compromised | Use 4+ random words or a strong unique phrase. Not your birthday, not "password". |
| Not testing recovery | Discover the problem when it is too late | Restore from backup WITH passphrase, verify same addresses appear. |
| Confusing passphrase with device PIN | Entering PIN where passphrase is expected | PIN locks the device. Passphrase changes the wallet. They are different things. |
| Assuming wrong passphrase shows an error | Sending funds to the wrong wallet | Any passphrase opens a valid wallet. Always verify addresses after entering your passphrase. |

---

## How Each Device Handles Passphrases

<details>
<summary>ColdCard Mk4 / Q</summary>

1. Navigate to **Passphrase → Edit Passphrase**
2. Enter your passphrase using the keypad (Mk4) or QWERTY keyboard (Q)
3. The device creates a temporary wallet using seed + passphrase
4. **Lock It In** option: passphrase applies automatically on every boot (convenient but removes deniability)
5. Without Lock It In, you must re-enter the passphrase every time you power on

ColdCard shows the first few characters of the derived master fingerprint after applying a passphrase. Write this down and compare it each time to confirm you entered the passphrase correctly.

</details>

<details>
<summary>SeedSigner</summary>

SeedSigner is stateless. It does not store your seed or passphrase between sessions.

1. Load your seed (scan QR, enter words, or camera entropy)
2. When prompted, enter your passphrase
3. SeedSigner derives the wallet from seed + passphrase
4. You must re-enter both the seed and passphrase every time you power on

This is actually an advantage: no passphrase is ever stored on any device.

</details>

<details>
<summary>Foundation Passport</summary>

1. After loading your seed, go to **Settings → Passphrase**
2. Enter your passphrase
3. Passport applies it to the current session
4. Re-enter on each boot unless you save it to the device

</details>

<details>
<summary>Blockstream Jade</summary>

1. During wallet setup or in settings, enable passphrase
2. Enter the passphrase when prompted
3. Jade derives the wallet using the Blind Oracle PIN server + seed + passphrase
4. Re-enter on each unlock

Note: Jade's virtual secure element means the passphrase adds a third factor (PIN server + seed + passphrase).

</details>

---

## Alternative Encoding: Discreet Backups

If your concern is that a steel plate with readable BIP-39 words is too obviously a Bitcoin backup, consider alternative encoding methods:

- **BitCan** ([bitcan.world](https://bitcan.world)): Encodes each BIP-39 word as a binary glyph that can be stamped onto aluminum cans or dog tags. Looks like a personal keepsake, not a Bitcoin backup. Open source, with the reference table archived on-chain.
- **Codex32**: Already a form of encoded backup. The share strings are not recognizable as seed words.

These add a decoding step to recovery, which increases complexity. For most people, readable words on steel in a secure location is the better trade-off.

---

## The Bottom Line

A passphrase is a meaningful upgrade for single-sig setups. It gives you a decoy wallet and an extra layer if your backup is found. But it is also a new way to lose your Bitcoin if you forget it or fail to test recovery.

**Before enabling a passphrase:**
1. Set up your wallet WITHOUT a passphrase first
2. Back up the seed to steel
3. Add the passphrase
4. Write it on your steel plate
5. Verify: restore from steel + passphrase, confirm same addresses
6. Send a test amount to the passphrase wallet
7. Wipe and restore again to be sure
8. Only then move real funds
