# Seed Generation - Seed Picker Cards

Shuffle a physical deck of BIP-39 word cards to generate your seed phrase. No electronics needed for entropy - you can see and verify the randomness yourself.

---

## What You'll Need

- Seed Picker Cards deck (2,048 cards, one per BIP-39 word)
- Large flat surface
- Paper and pen
- A signing device to calculate the checksum (24th word)

## Step 1: Shuffle the Deck

1. Spread ALL cards face-down on a large flat surface.
2. Mix them thoroughly - push them around, pile them, spread them again.
3. Gather into a deck.
4. **Riffle shuffle at least 7 times.** Mathematical research shows 7 riffle shuffles produces near-random ordering.
5. Do a few more overhand shuffles for good measure.

## Step 2: Draw Cards

1. For a **24-word seed**: draw **23 cards** (the 24th is a calculated checksum).
2. For a **12-word seed**: draw **11 cards** (the 12th is the checksum).
3. Lay each card face-up **in order**. These are words 1-23 of your seed.
4. Write down each word carefully.

## Step 3: Calculate the Checksum (24th Word)

The last word is mathematically derived from the first 23. You need a device to calculate it.

<details>
<summary><strong>SeedSigner</strong></summary>

1. Power on your SeedSigner.
2. Navigate to **Seeds** → **Enter 24-word seed**.
3. For each of the 23 words:
   - Use the joystick to type the first few letters of the word.
   - SeedSigner auto-suggests matching BIP-39 words.
   - Select the correct word and press the joystick to confirm.
4. When you reach word 24, SeedSigner shows a list of **valid checksum words**.
5. Select any one of the valid options - they are all mathematically correct.
6. Write down the 24th word.
7. SeedSigner now holds the seed in volatile memory. You can use it to verify addresses or sign transactions.
8. When you power off, the seed is erased.
- Review how SeedSigner handles seeds: [seed.py on GitHub](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py)

</details>

<details>
<summary><strong>ColdCard Q</strong></summary>

1. Power on your ColdCard Q and log in with your PIN.
2. Navigate to **Import Existing** → **24 Word Seed**.
3. For each of the 23 words:
   - Start typing on the QWERTY keyboard. ColdCard auto-completes.
   - Press **OK** to confirm each word.
4. When you reach word 24, ColdCard displays the **valid checksum word(s)**.
5. Select the correct one and press **OK**.
6. Write down the 24th word.
7. ColdCard asks if you want to save this as your active seed. Choose **Yes** to store it on the secure element, or **No** if you're just using it for checksum calculation.
- Review ColdCard's seed handling code: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>ColdCard Mk4</strong></summary>

1. Power on your ColdCard Mk4 and log in with your PIN.
2. Navigate to **Import Existing** → **24 Word Seed** using the joystick.
3. For each of the 23 words:
   - Use the **numeric keypad** to type letters (like old phone T9 input). Press each number key to cycle through letters.
   - ColdCard narrows down matches as you type.
   - Press **OK** to confirm each word.
4. When you reach word 24, ColdCard displays the **valid checksum word(s)**.
5. Select the correct one with the joystick and press **OK**.
6. Write down the 24th word.
7. Choose **Yes** to store as your active seed, or **No** if you only needed the checksum.
- Review ColdCard's seed handling code: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>Jade</strong></summary>

1. Power on your Jade.
2. Select **Restore Wallet** (or if already set up: **Settings → Wallet → Recovery Phrase → Verify/Restore**).
3. Choose **24 words**.
4. Enter the first 23 words using the on-screen keyboard:
   - Type the first few letters - Jade auto-suggests.
   - Tap to confirm each word.
5. For word 24, Jade calculates and shows the valid checksum options.
6. Select one and write it down.
7. Jade imports the seed. Set a PIN if prompted.
- Review Jade's randomness code: [random.c on GitHub](https://github.com/Blockstream/Jade/blob/master/main/random.c)

</details>

<details>
<summary><strong>Passport</strong></summary>

1. Power on your Passport.
2. Navigate to **Import Seed** → **Enter 24 Words**.
3. For each of the 23 words:
   - Use the keypad to type letters. Passport narrows down matches.
   - Confirm each word with **OK**.
4. At word 24, Passport calculates and displays valid checksum words.
5. Select one and write it down.
6. Passport asks if you want to store this seed. Choose **Yes** to save to secure element, or back out if you only needed the checksum.
- Review Passport's security model: [SECURITY.md on GitHub](https://github.com/Foundation-Devices/passport2/blob/main/SECURITY/SECURITY.md)

</details>

## Step 4: Verify the Complete Seed

1. Wipe your device and re-enter all 24 words manually.
2. If the device accepts the seed, it's valid.
3. Confirm the same xpub and first receive address appear - this proves your backup is correct.
4. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).
5. **Burn your paper copies.** Ash is unreadable, shredded paper isn't.

## Why Cards?

- **Verifiable randomness** - you can see the shuffle happening. No hidden algorithms.
- **No electronics needed** for entropy generation.
- **Educational** - you understand exactly where your seed came from.
- **Reusable** - reshuffle for future wallets.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
