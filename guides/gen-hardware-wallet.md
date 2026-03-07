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
<summary><strong>ColdCard Q</strong></summary>

ColdCard Q generates your seed using its built-in random number generator, combined with button presses you make during setup for extra randomness.

### Steps

1. Power on your ColdCard Q. On first boot you'll see the Terms of Sale - press **OK** to accept.
2. Set your **PIN code**. ColdCard uses a two-part PIN:
   - Enter the **first part** (prefix). Press **OK**.
   - The ColdCard displays two **anti-phishing words**. Write these down - they prove your ColdCard is genuine on future logins.
   - Enter the **second part** (suffix). Press **OK**.
3. After PIN setup, select **New Seed Words** from the menu.
4. Choose **24 Words** (recommended) or **12 Words**.
5. ColdCard will ask you to press buttons and add randomness. Press keys randomly.
6. ColdCard displays your **24-word seed phrase**, 6 words at a time.
   - Press **1** to see words 1-6.
   - Press **2** for words 7-12.
   - Press **3** for words 13-18.
   - Press **4** for words 19-24.
7. Write down every word, in order, on paper.
8. ColdCard will quiz you on specific words. Enter the correct word when prompted.
9. Once verified, the seed is stored encrypted on the ColdCard's secure element.
10. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- ColdCard stores your seed in dual secure elements. It persists across power cycles.
- You can also save an encrypted backup to MicroSD: **Advanced/Tools > Backup > Backup System**.
- The anti-phishing words are unique to your PIN + device. If they ever change, someone has tampered with your ColdCard.
- Review how ColdCard generates seeds: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>ColdCard Mk4</strong></summary>

Same security model and firmware as the Q, but with a numeric keypad and smaller screen.

### Steps

1. Power on your ColdCard Mk4. Accept the Terms of Sale - press **OK** (checkmark button).
2. Set your **PIN code**. ColdCard uses a two-part PIN:
   - Use the **numeric keypad** to enter the first part (prefix). Press **OK**.
   - The ColdCard displays two **anti-phishing words**. Write these down.
   - Enter the second part (suffix). Press **OK**.
3. After PIN setup, select **New Seed Words** using the **5-way joystick** to navigate the menu.
4. Choose **24 Words** (recommended) or **12 Words**.
5. ColdCard asks you to add randomness. Press the number keys randomly.
6. ColdCard displays your **24-word seed phrase** on the small OLED screen:
   - Scroll through with the joystick - words are shown in groups.
   - Take your time. The screen is small so read carefully.
7. Write down every word, in order, on paper.
8. ColdCard quizzes you on specific words. Use the joystick to scroll to the correct word and press **OK**.
9. The seed is stored encrypted on the dual secure elements.
10. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).

### Notes
- Navigation is via the 5-way joystick + numeric keypad (no QWERTY keyboard).
- Encrypted MicroSD backup: **Advanced/Tools > Backup > Backup System**.
- Review how ColdCard generates seeds: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

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

<details>
<summary><strong>Passport</strong></summary>

Passport generates your seed using its built-in random number generator, combined with button presses you make during setup for extra randomness.

### Steps

1. Power on your Passport. Follow the on-screen welcome.
2. Passport runs a **Supply Chain Validation** - scan the QR code shown on screen with the Envoy app to verify your device hasn't been tampered with.
3. Once validated, select **Create New Seed**.
4. Passport asks you to **add randomness** by pressing random buttons on the device. Mash the keypad.
5. Passport generates and displays your **24-word seed phrase**.
6. Write down every word carefully, in order.
7. Passport quizzes you on specific words to verify your backup.
8. Set a **6-digit PIN** for daily access.
9. The seed is stored encrypted in Passport's secure element.
10. **Back up to steel immediately.** See the [At Rest guides](#steel-backup).
11. Passport also prompts you to **save a backup to MicroSD**. Insert a MicroSD card and confirm.

### Notes
- Passport's MicroSD backup is encrypted with your PIN. Keep the MicroSD card stored separately from the device and your steel plate.
- The Envoy companion app (mobile) is used for wallet coordination but never sees your seed.
- Passport is fully air-gapped. All communication is via QR codes or MicroSD. No USB data, no Bluetooth, no WiFi.
- Review how Passport handles seed generation and security: [SECURITY.md on GitHub](https://github.com/Foundation-Devices/passport2/blob/main/SECURITY/SECURITY.md)

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
