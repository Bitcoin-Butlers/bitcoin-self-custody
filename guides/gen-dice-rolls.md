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
<summary><strong>ColdCard Q - Dice Rolls</strong></summary>

ColdCard Q has a built-in dice roll seed generation tool.

### Steps

1. Power on your ColdCard Q and log in with your PIN.
2. Navigate to **New Seed Words** → **Advanced** → **Dice Rolls**.
3. ColdCard explains the process. Press **OK** to continue.
4. Roll your die. Enter the result using the keypad:
   - Press **1** through **6** for each roll.
   - ColdCard tracks the number of rolls at the top of the screen.
5. Continue rolling. ColdCard requires a **minimum of 99 rolls** for full entropy.
   - You can do more rolls for additional entropy - there's no maximum.
6. When satisfied, press **OK** to finalize.
7. ColdCard hashes the dice data and generates your **24-word seed phrase**.
8. Write down every word. ColdCard shows them 6 at a time:
   - Press **1** for words 1-6.
   - Press **2** for words 7-12.
   - Press **3** for words 13-18.
   - Press **4** for words 19-24.
9. ColdCard quizzes you on specific words.
10. The seed is stored in the dual secure elements.
11. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- Review how ColdCard processes dice entropy: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>ColdCard Mk4 - Dice Rolls</strong></summary>

Same dice tool as the Q, but navigated with the joystick and numeric keypad.

### Steps

1. Power on your ColdCard Mk4 and log in with your PIN.
2. Navigate to **New Seed Words** → **Advanced** → **Dice Rolls** using the joystick.
3. ColdCard explains the process. Press **OK** to continue.
4. Roll your die. Enter the result using the **numeric keypad**:
   - Press **1** through **6** for each roll.
   - The roll count is displayed at the top.
5. Continue for at least **99 rolls**.
6. When satisfied, press **OK** to finalize.
7. ColdCard hashes the dice data and generates your **24-word seed phrase**.
8. Scroll through the words using the joystick. Write down every word, in order.
9. ColdCard quizzes you on specific words. Use the joystick to select the correct answer.
10. The seed is stored in the dual secure elements.
11. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- Review how ColdCard processes dice entropy: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>Passport - Dice Rolls</strong></summary>

Passport supports adding dice roll entropy during seed generation.

### Steps

1. Power on your Passport.
2. Select **Create New Seed**.
3. When Passport asks you to add entropy, choose **Manual Entropy** → **Dice Rolls**.
4. Roll your die and enter each result using the keypad (1-6).
5. Continue for at least **99 rolls**.
6. Press **OK** to finalize.
7. Passport generates your **24-word seed phrase**.
8. Write down every word carefully.
9. Passport quizzes you to verify.
10. Set your PIN. The seed is stored in the secure element.
11. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- Review how Passport handles seed security: [SECURITY.md on GitHub](https://github.com/Foundation-Devices/passport2/blob/main/SECURITY/SECURITY.md)

</details>

<details>
<summary><strong>Jade - No Built-In Dice Tool</strong></summary>

Jade does not have a built-in dice roll seed generation feature. To use dice-generated entropy with Jade:

### Option A: Generate on SeedSigner, Import to Jade

1. Use a SeedSigner to generate a seed via 99 dice rolls (see SeedSigner steps above).
2. Write down the 24 words.
3. On Jade, select **Restore Wallet**.
4. Enter all 24 words.
5. Set your PIN.

### Option B: Generate on ColdCard, Import to Jade

1. Use a ColdCard to generate a seed via dice rolls.
2. Write down the 24 words.
3. On Jade, select **Restore Wallet**.
4. Enter all 24 words.
5. Set your PIN.

### Why No Dice Tool?

Jade is designed as a compact, user-friendly device. Advanced entropy generation is typically done on a dedicated air-gapped device like SeedSigner or ColdCard, then the seed is imported.

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
