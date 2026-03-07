# Seed Generation - Entropia Pills

3D-printed capsules containing BIP-39 words. Shake, pick randomly, and record. A tactile, physical way to generate your seed phrase.

---

## What You'll Need

- Entropia Pills set (capsules containing BIP-39 words)
- Large flat surface
- Paper and pen
- A signing device to calculate the checksum (24th word)

## Step 1: Mix the Pills

1. Spread all capsules on a large flat surface.
2. Mix them thoroughly with both hands - push them around, pile them, spread them again.
3. Close your eyes or look away.

## Step 2: Pick Your Words

1. For a **24-word seed**: pick **23 capsules** randomly (the 24th is a calculated checksum).
2. For a **12-word seed**: pick **11 capsules**.
3. Open each capsule **in the order you picked them**.
4. Write down each word carefully, in sequence. The order matters.

## Step 3: Calculate the Checksum (24th Word)

The last word is mathematically derived from the first 23. Choose your device:

<details>
<summary><strong>SeedSigner</strong></summary>

1. Power on your SeedSigner.
2. Navigate to **Seeds** → **Enter 24-word seed**.
3. For each of the 23 words:
   - Use the joystick to type the first few letters.
   - SeedSigner auto-suggests matching BIP-39 words.
   - Select the correct word and press the joystick to confirm.
4. At word 24, SeedSigner shows a list of **valid checksum words**.
5. Select any valid option and write it down.
6. The seed is held in volatile memory until power-off.
- Review how SeedSigner handles seeds: [seed.py on GitHub](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py)

</details>

<details>
<summary><strong>ColdCard Q</strong></summary>

1. Power on your ColdCard Q and log in with your PIN.
2. Navigate to **Import Existing** → **24 Word Seed**.
3. Type each of the 23 words on the QWERTY keyboard. ColdCard auto-completes.
4. Press **OK** after each word.
5. At word 24, ColdCard displays valid checksum word(s).
6. Select one and write it down.
7. Choose whether to save as your active seed or exit.
- Review ColdCard's seed handling code: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>ColdCard Mk4</strong></summary>

1. Power on your ColdCard Mk4 and log in with your PIN.
2. Navigate to **Import Existing** → **24 Word Seed** using the joystick.
3. For each of the 23 words:
   - Use the **numeric keypad** to type letters (T9-style). Press each number key to cycle through letters.
   - ColdCard narrows down matches as you type.
   - Press **OK** to confirm each word.
4. At word 24, ColdCard displays valid checksum word(s).
5. Select one with the joystick and write it down.
6. Choose whether to store the seed or exit.
- Review ColdCard's seed handling code: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>Jade</strong></summary>

1. Power on your Jade.
2. Select **Restore Wallet** → **24 words**.
3. Enter the first 23 words using the on-screen keyboard.
4. At word 24, Jade calculates and shows valid checksum options.
5. Select one and write it down.
6. Set a PIN if prompted.
- Review Jade's randomness code: [random.c on GitHub](https://github.com/Blockstream/Jade/blob/master/main/random.c)

</details>

<details>
<summary><strong>Passport</strong></summary>

1. Power on your Passport.
2. Navigate to **Import Seed** → **Enter 24 Words**.
3. Type each of the 23 words using the keypad. Passport narrows down matches.
4. Press **OK** after each word.
5. At word 24, Passport shows valid checksum words.
6. Select one and write it down.
7. Choose whether to store the seed or exit.
- Review Passport's security model: [SECURITY.md on GitHub](https://github.com/Foundation-Devices/passport2/blob/main/SECURITY/SECURITY.md)

</details>

## Step 4: Verify the Complete Seed

1. Wipe your device and re-enter all 24 words manually.
2. If the device accepts the seed, it's valid.
3. Confirm the same xpub and first receive address appear - this proves your backup is correct.
4. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).
5. **Burn your paper copies.** Ash is unreadable, shredded paper isn't.

## Step 5: Clean Up

1. Return all capsules to the container.
2. **Do not leave capsules in the order you picked them.** Mix them back together immediately.
3. **Burn any paper notes** showing the order of selection.

## Why Pills?

- **Tactile and fun** - especially good for workshops and education.
- **No electronics** for entropy generation.
- **Verifiable** - you can see and feel the randomness.
- **Reusable** - mix them back together for future wallets.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
