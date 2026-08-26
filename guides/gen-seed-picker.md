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

## Step 4: Verify the Complete Seed

1. Wipe your device and re-enter all 24 words manually.
2. If the device accepts the seed, it's valid.
3. Confirm the same xpub and first receive address appear - this proves your backup is correct.

## Why Cards?

- **Verifiable randomness** - you can see the shuffle happening. No hidden algorithms.
- **No electronics needed** for entropy generation.
- **Educational** - you understand exactly where your seed came from.
- **Reusable** - reshuffle for future wallets.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
