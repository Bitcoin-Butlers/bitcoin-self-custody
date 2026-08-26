# Seed Generation - Dice Rolls

Roll physical dice to generate your seed. Maximum verifiability - you control every bit of entropy.

---

## What You'll Need

- Casino-grade dice (at least 1, ideally 2-5 for speed)
- Paper and pen
- A signing device with dice entropy support

## Choose Your Method

<details>
<summary><strong>SeedSigner - 99 Dice Rolls</strong></summary>

SeedSigner has a built-in dice entropy tool. You roll a single die 99 times and SeedSigner hashes the results into a 24-word seed.

### Steps

1. Power on your SeedSigner.
2. Navigate to **Seeds** → **Create a seed** → **Create via dice rolls**.
3. SeedSigner asks: **How many dice rolls?** Select **99** (recommended for full 256-bit entropy).
4. Roll your die. Enter the result (1-6) using the joystick:
   - **Up/Down** to change the number.
   - **Press joystick** to confirm each roll.
5. Repeat for all 99 rolls. SeedSigner shows your progress (e.g., "Roll 14 of 99").
6. After roll 99, SeedSigner hashes all the dice data using SHA-256 and generates your **24-word seed phrase**.
7. Write down every word, in order.
8. SeedSigner quizzes you on the words to verify.
9. The seed is now in volatile memory - it's erased when you power off.
10. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Why 99 Rolls?

Each die roll provides ~2.58 bits of entropy. 99 rolls = ~256 bits, which matches the entropy of a 24-word BIP-39 seed. Fewer rolls means less randomness.

### Notes
- Review how SeedSigner processes dice entropy: [seed.py on GitHub](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py)

</details>

<details>
<summary><strong>Jade - No Built-In Dice Tool</strong></summary>

Jade does not have a built-in dice roll seed generation feature. To use dice-generated entropy with Jade:

### Generate on SeedSigner, Import to Jade

1. Use a SeedSigner to generate a seed via 99 dice rolls (see SeedSigner steps above).
2. Write down the 24 words.
3. On Jade, select **Restore Wallet**.
4. Enter all 24 words.
5. Set your PIN.

### Why No Dice Tool?

Jade is designed as a compact, user-friendly device. Advanced entropy generation is typically done on a dedicated air-gapped device like SeedSigner, then the seed is imported.

</details>

---

## Manual Binary Conversion (Advanced)

For maximum control - no device involved in entropy generation at all.

### Steps

1. Roll a die. Record **1-3 as 0**, **4-6 as 1** (binary conversion).
2. Group every **11 rolls** into one binary number (11 bits = 0-2047).
3. Convert each 11-bit number to its BIP-39 word using the [official word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt).
4. Repeat for **23 words** (253 rolls minimum).
5. Calculate the checksum for word 24 using any signing device (see the [Seed Picker Cards guide](#gen-seed-picker) for device-specific checksum steps).

This takes 45-60 minutes but provides mathematically provable randomness with zero device trust for entropy.

---

## Security Rules

1. **Work in a private space.** No cameras, no smart speakers.
2. **Never photograph your seed words.**
3. **Burn all paper notes** - dice roll records and seed words. Ash is unreadable, shredded paper isn't.
4. **Back up to steel immediately.**
5. **Test recovery** - wipe and re-enter your seed words. Confirm the same xpub and first receive address appear.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
