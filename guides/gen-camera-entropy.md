# Seed Generation - Camera Entropy

Use your SeedSigner's camera to capture visual noise and hash it into a seed phrase. Fast, verifiable, and unique to SeedSigner.

---

## Supported Devices

This method is **SeedSigner only**. Other signing devices do not use camera-based entropy generation.

- **ColdCard Q** - no camera entropy (use [Dice Rolls](#gen-dice-rolls) or [Hardware Wallet](#gen-hardware-wallet) generation)
- **Jade** - no camera entropy (use [Hardware Wallet](#gen-hardware-wallet) generation or import from SeedSigner)
- **Passport** - no camera entropy (use [Dice Rolls](#gen-dice-rolls) or [Hardware Wallet](#gen-hardware-wallet) generation)

## What You'll Need

- SeedSigner (powered on)
- Something visually complex to photograph

## Steps

1. Power on your SeedSigner.
2. Navigate to **Seeds** → **Create a seed** → **Create via image capture**.
3. Point the camera at something with **high visual complexity**:
   - Crumpled paper or fabric
   - Tree bark or leaves
   - A crowded bookshelf
   - Flowing water
   - Gravel or sand
   - **Avoid**: blank walls, solid colors, screens, or anything with repeating patterns.
4. Press the **joystick** to capture the image.
5. SeedSigner hashes the raw pixel data using SHA-256 to produce 256 bits of entropy.
6. SeedSigner generates and displays your **24-word seed phrase**.
7. Write down every word, in order, on paper.
8. SeedSigner quizzes you - confirm each word to prove you wrote it correctly.
9. The seed is now in volatile memory. It's erased when you power off.
10. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- Review how SeedSigner generates seeds from camera images: [seed.py on GitHub](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py)

## Importing to Another Device

If your daily signing device is a ColdCard Q, Jade, or Passport, generate the seed on SeedSigner via camera entropy, then import:

<details>
<summary><strong>Import to ColdCard Q</strong></summary>

1. On ColdCard Q, log in and navigate to **Import Existing** → **24 Word Seed**.
2. Type each of the 24 words using the QWERTY keyboard.
3. ColdCard auto-completes - press **OK** after each word.
4. After word 24, ColdCard verifies the checksum and stores the seed in the secure element.

</details>

<details>
<summary><strong>Import to ColdCard Mk4</strong></summary>

1. On ColdCard Mk4, log in and navigate to **Import Existing** → **24 Word Seed** using the joystick.
2. Use the **numeric keypad** to type each word (T9-style input).
3. ColdCard narrows down matches - press **OK** to confirm each word.
4. After word 24, ColdCard verifies the checksum and stores the seed in the secure element.

</details>

<details>
<summary><strong>Import to Jade</strong></summary>

1. On Jade, select **Restore Wallet** → **24 words**.
2. Enter all 24 words using the on-screen keyboard.
3. Set a PIN when prompted.
4. Jade encrypts and stores the seed.

</details>

<details>
<summary><strong>Import to Passport</strong></summary>

1. On Passport, select **Import Seed** → **Enter 24 Words**.
2. Type each word using the keypad.
3. After word 24, Passport verifies the checksum and stores the seed in the secure element.
4. Set your PIN.

</details>

## Why Camera Entropy?

- **Fast** - takes seconds vs. minutes for dice.
- **Good entropy source** - natural scenes have high visual randomness. Every pixel contributes.
- **Verifiable** - SeedSigner's code is fully open source. You can audit the SHA-256 hashing of the image data.
- **Unique** - no two photos are identical, even of the same subject. Sensor noise ensures uniqueness.

## Tips for Maximum Entropy

- **Outdoors is best** - natural scenes have more visual complexity than indoor environments.
- **Move slightly** between captures if generating multiple seeds - even subtle changes produce completely different hashes.
- **Don't use a screen** as your subject - screens have predictable pixel patterns.
- **Lighting doesn't matter much** - even low-light photos contain sensor noise that contributes entropy.

---

## Security Rules

1. **Work in a private space.** No one should see your seed words.
2. **Never photograph your seed words** (ironic, yes - the camera is for entropy, not backup).
3. **Delete nothing** - SeedSigner doesn't store photos. The image is processed and discarded.
4. **Back up to steel immediately.** Burn your paper copies once steel is verified.
5. **Test recovery** - wipe and re-enter your seed words. Confirm the same xpub and first receive address appear.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
