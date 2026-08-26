# Seed Generation - Hardware Wallet

Let your signing device generate the seed using its built-in random number generator.

---

## How It Works

Your device has a built-in random number generator that creates your seed phrase. You press a button, the device does the rest. You're trusting that the manufacturer built it correctly.

## Choose Your Device

<details>
<summary><strong>SeedSigner</strong></summary>

SeedSigner is stateless. It never stores your seed. You generate it, write it down, and the seed is gone when the device powers off.

SeedSigner does not use a hardware random number generator. Instead, it uses your camera to capture an image and converts that into your seed. For dice-based generation, see the [Dice Rolls guide](#gen-dice-rolls).

### Steps

1. Power on your SeedSigner and navigate to **Seeds** from the main menu.
2. Select **Create a seed**.
3. Select **Create via image capture**.
4. Point the camera at something visually complex (crumpled paper, tree bark, a bookshelf).
5. Press the joystick to capture.
6. SeedSigner displays your **24-word seed phrase**.
7. Write down each word carefully, in order, on paper.
8. SeedSigner will quiz you. Confirm each word to prove you wrote it correctly.
9. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).
10. Power off the device. The seed is erased from memory.

### Notes
- Every time you power on, you must re-enter your seed to use it. This is a security feature.
- Review how SeedSigner generates seeds from camera images: [models/seed.py on GitHub](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py)

</details>

<details>
<summary><strong>Jade</strong></summary>

Jade generates your seed and encrypts it on the device. Instead of a physical secure element chip, Jade uses a "virtual secure element" where Blockstream's server (or your own) holds a blinding key needed to unlock your seed. The server never sees your seed.

### Steps

1. Power on your Jade. Select **Setup Jade**.
2. Choose **New Wallet**.
3. Jade generates a **12-word seed phrase**.
4. Jade displays the words one at a time. Write down each word carefully, in order.
5. Jade quizzes you - select the correct word for each position.
6. Set a **6-digit PIN**. This PIN unlocks the device daily.
7. Jade connects to Blockstream's server to complete setup:
   - Connect via **Bluetooth** (pair with Blockstream Green app) or **USB**.
   - You can self-host this server if you prefer not to rely on Blockstream.
8. Once verified, your seed is encrypted and stored on Jade.
9. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- Jade defaults to 12 words. For 24 words, generate externally and import.
- If Blockstream's servers go down, you recover with your seed words on any BIP-39 compatible wallet.
- For air-gapped operation, use QR mode after initial setup.
- Review how Jade generates randomness: [random.c on GitHub](https://github.com/Blockstream/Jade/blob/master/main/random.c)

</details>

---

## Security Rules

1. **Work in a private space.** No cameras, no smart speakers, no one watching.
2. **Never photograph your seed words.** Not on your phone. Not "just for now."
3. **Never type your seed into a computer or phone.**
4. **Verify your seed works** before sending any Bitcoin to it. Wipe the device, re-enter your seed words manually, and confirm it generates the same wallet (same xpub, same first receive address).
5. **Back up to steel immediately.** Paper is temporary.
6. **Burn your paper copies** once your steel backup is verified. Don't just cut or tear - ash is unreadable, shredded paper isn't.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
