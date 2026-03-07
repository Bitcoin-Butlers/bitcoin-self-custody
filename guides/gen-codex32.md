# Seed Generation - Codex32

Generate and back up your Bitcoin seed entirely by hand using pen, paper, and math. No electronics needed at any step - not even for the checksum.

---

## What Is Codex32?

Codex32 (BIP-93) is a way to encode a Bitcoin seed as a string of characters that you can generate, verify, and split into shares entirely on paper. Unlike BIP-39 (the 24-word system), Codex32 lets you:

- **Generate your seed with dice** and convert it to Codex32 format by hand
- **Verify your backup's checksum by hand** using a paper computer (volvelles) - no device needed
- **Split your seed into shares** using Shamir's Secret Sharing, so no single piece reveals your seed

## What You'll Need

- Casino-grade dice
- Codex32 worksheets (printable from the official repo)
- Codex32 volvelles (paper computation wheels, printable)
- Pen or pencil
- A flat, private workspace
- 1-3 hours depending on your pace
- A signing device to import the final seed (SeedSigner recommended)

## How It Works

A Codex32 string looks like this:
```
ms10testsxxxxxxxxxxxxxxxxxxxxxxxxxx
```

It contains:
- `ms1` - the Codex32 prefix (always the same)
- `0` - the threshold (how many shares needed to reconstruct)
- `test` - a 4-character identifier you choose
- `s` - the share index (`s` means this is the full secret, `a`/`b`/`c` etc. are shares)
- The remaining characters encode your seed data + a checksum

The checksum can be verified entirely by hand using the volvelle wheels. If even one character is wrong, the checksum fails.

## Step 1: Generate Entropy with Dice

1. Roll a single die to generate random data.
2. Using the Codex32 worksheet, convert each roll to a Bech32 character (the character set Codex32 uses).
3. Continue rolling until you have enough characters for your desired seed length:
   - **16-byte seed (128 bits)**: 26 data characters + checksum
   - **32-byte seed (256 bits)**: 52 data characters + checksum
4. Record each character carefully on the worksheet.

## Step 2: Calculate the Checksum

This is where Codex32 is unique. You verify (and generate) the checksum using paper volvelles:

1. Print and cut out the Codex32 volvelles from the official materials.
2. Follow the worksheet instructions to rotate the volvelle wheels for each character in your string.
3. The volvelle produces the checksum characters.
4. Append them to your string.
5. To verify, run the entire string (including checksum) through the volvelle process. If the result is all `s` characters, your string is valid.

No electronics involved at any point.

## Step 3: Split into Shares (Optional)

Codex32 supports Shamir's Secret Sharing natively. You can split your seed into multiple shares where only a threshold number are needed to reconstruct it.

For example, a **2-of-3 split**:
- You create 3 shares (indexed `a`, `b`, `c`)
- Any 2 shares can reconstruct the seed
- Any single share reveals nothing about the seed

The splitting process is done on the worksheets using the volvelles. Each share is a separate Codex32 string that you can stamp into steel independently.

## Step 4: Import to a Signing Device

Once you have your Codex32 string, you need to convert it to a format your signing device understands.

<details>
<summary><strong>SeedSigner</strong></summary>

SeedSigner has native Codex32 support:

1. Power on your SeedSigner.
2. Navigate to **Seeds** > **Enter Codex32**.
3. Enter your Codex32 string character by character using the joystick.
4. SeedSigner validates the checksum and derives the seed.
5. SeedSigner displays the equivalent 24-word BIP-39 seed phrase.
6. Write down the 24 words as a secondary backup if desired.
7. The seed is in volatile memory - erased on power-off.

- Review SeedSigner's Codex32 implementation: [seed.py on GitHub](https://github.com/SeedSigner/seedsigner/blob/dev/src/seedsigner/models/seed.py)

</details>

<details>
<summary><strong>ColdCard Q</strong></summary>

ColdCard Q supports Codex32 import:

1. Power on your ColdCard Q and log in with your PIN.
2. Navigate to **Import Existing** > **Codex32**.
3. Enter your Codex32 string using the QWERTY keyboard.
4. ColdCard validates the checksum.
5. If valid, ColdCard imports the seed and stores it in the secure element.

- Review ColdCard's seed handling code: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>ColdCard Mk4</strong></summary>

Same Codex32 import as the Q, navigated with joystick and numeric keypad:

1. Power on your ColdCard Mk4 and log in with your PIN.
2. Navigate to **Import Existing** > **Codex32** using the joystick.
3. Enter the Codex32 string using the numeric keypad (T9-style input).
4. ColdCard validates the checksum.
5. If valid, ColdCard imports the seed and stores it in the secure element.

- Review ColdCard's seed handling code: [seed.py on GitHub](https://github.com/Coldcard/firmware/blob/master/shared/seed.py)

</details>

<details>
<summary><strong>Jade</strong></summary>

Jade does not currently support direct Codex32 import. To use a Codex32-generated seed with Jade:

1. Import your Codex32 string into SeedSigner first (see above).
2. SeedSigner will show the equivalent 24-word BIP-39 seed phrase.
3. Write down the 24 words.
4. On Jade, select **Restore Wallet** > **24 words**.
5. Enter all 24 words.
6. Set your PIN.

- Review Jade's randomness code: [random.c on GitHub](https://github.com/Blockstream/Jade/blob/master/main/random.c)

</details>

<details>
<summary><strong>Passport</strong></summary>

Passport does not currently support direct Codex32 import. To use a Codex32-generated seed with Passport:

1. Import your Codex32 string into SeedSigner first (see above).
2. SeedSigner will show the equivalent 24-word BIP-39 seed phrase.
3. Write down the 24 words.
4. On Passport, select **Import Seed** > **Enter 24 Words**.
5. Enter all 24 words using the keypad.
6. Set your PIN.

- Review Passport's security model: [SECURITY.md on GitHub](https://github.com/Foundation-Devices/passport2/blob/main/SECURITY/SECURITY.md)

</details>

## Why Codex32?

- **Zero electronic trust for generation and verification.** You don't need to trust any chip, any screen, any software to generate and verify your seed.
- **Hand-verifiable checksums.** You can prove your backup is correct with paper and a volvelle. Try doing that with a BIP-39 seed.
- **Built-in secret sharing.** Split your seed into shares without any software. Each share has its own checksum.
- **Survives on steel.** Codex32 strings are compact and use a character set designed for legibility. Easy to stamp.

## Trade-offs

- **Time-intensive.** Generating and verifying takes 1-3 hours vs. seconds for a hardware wallet.
- **Learning curve.** You need to understand the worksheet and volvelle process before starting.
- **Not widely supported yet.** Only SeedSigner and ColdCard support direct Codex32 import as of early 2026. Other devices require converting to BIP-39 words first.
- **Shares add complexity.** If you use Shamir splitting, you must keep track of which shares exist and where they are stored.

## Resources

- [BIP-93: Codex32 specification](https://github.com/bitcoin/bips/blob/master/bip-0093.mediawiki)
- [Codex32 worksheets and volvelles](https://secretcodex32.com)
- [SeedSigner Codex32 support](https://github.com/SeedSigner/seedsigner)

---

## Security Rules

1. **Work in a private space.** No cameras, no smart speakers.
2. **Never photograph your Codex32 string or shares.**
3. **Verify your checksum by hand** before trusting the string.
4. **Back up to steel immediately.** Codex32 strings are designed for stamping.
5. **If using shares, distribute them** to separate locations. No single location should hold enough shares to meet the threshold.
6. **Burn all paper worksheets** once your steel backups are verified. Ash is unreadable, shredded paper isn't.

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
