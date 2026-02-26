# Seed Generation Methods — Complete Guide
*Bitcoin Butlers Master Concierge*

---

## Why Seed Generation Matters

Your seed phrase is the master key to your Bitcoin. The quality of randomness (entropy) used to generate it determines its security. There are three approaches:

1. **Let your hardware wallet generate it** — trusting the device's random number generator
2. **Use physical randomness tools** — dice, cards, or pills that you control
3. **Camera entropy** — SeedSigner's approach, using visual noise

Each method has trade-offs between convenience, verifiability, and effort.

---

## Method 1: Hardware Wallet Generation (Easiest)

### How It Works
Your signing device (ColdCard, Passport, Jade, etc.) has a built-in hardware random number generator (TRNG/HRNG) that produces the entropy for your seed.

### Steps
1. During device setup, select **New Wallet** or **Create New Seed**.
2. The device generates 12 or 24 words.
3. Write them down and verify.

### Trust Model
- You're trusting the device manufacturer built a secure random number generator.
- Reputable devices (ColdCard, Passport) use certified entropy sources.
- ColdCard adds environmental noise and user input to the hardware RNG for additional entropy.

### Best For
- Most users. If you trust your hardware wallet enough to sign transactions, you can trust its entropy.
- Getting started quickly.

### Concerns
- If the device's RNG is flawed or backdoored, your seed is compromised.
- You can't independently verify the randomness.

---

## Method 2: Seed Picker Cards (Recommended for DIY)

### What They Are
A deck of physical cards, each representing one of the 2,048 BIP-39 words. You shuffle and draw cards to create your seed phrase.

### What You'll Need
- Seed Picker Cards deck (available in our shop)
- Flat surface
- Paper to write words on
- A way to calculate the checksum word (SeedSigner, Ian Coleman's BIP39 tool offline, or ColdCard's tool)

### Steps

#### 1. Shuffle the Deck
1. Spread all cards face-down on a large flat surface.
2. Mix them thoroughly — push them around, pile them, spread them again.
3. Gather into a deck.
4. Riffle shuffle at least **7 times.** Mathematical research shows 7 riffle shuffles produces near-random ordering.
5. For extra assurance, do a few more overhand shuffles.

#### 2. Draw Cards
1. For a 24-word seed: draw **23 cards** (the 24th is a calculated checksum).
2. For a 12-word seed: draw **11 cards** (the 12th is checksum).
3. Lay each card face-up in order. This is words 1-23 of your seed.
4. Write down each word carefully.

#### 3. Calculate the Checksum (24th Word)
The last word isn't random — it's mathematically derived from the first 23 to ensure the seed is valid.

**Option A: SeedSigner**
1. On SeedSigner: **Seeds → Enter 24 Words**.
2. Enter the 23 words you drew.
3. SeedSigner calculates and shows valid options for word 24.
4. Select one and write it down.

**Option B: ColdCard (Import Existing)**
1. On ColdCard: **Import Existing → 24 Word Seed**.
2. Enter 23 words.
3. ColdCard calculates the final word.

**Option C: Offline BIP-39 Tool**
1. Download Ian Coleman's BIP39 tool from GitHub (save the HTML file).
2. Disconnect from the internet.
3. Open the HTML file in your browser.
4. Enter 23 words — the tool calculates word 24.
5. **Close the browser and clear history when done.**

#### 4. Verify the Complete Seed
1. Enter all 24 words into your hardware wallet using **Import Seed**.
2. If the device accepts the seed, it's valid.
3. Back up to steel.

### Why Cards?
- **Verifiable randomness:** You can see the shuffle happening. No hidden algorithms.
- **No electronics needed** for entropy generation.
- **Educational:** You understand exactly where your seed came from.
- **Reusable:** Reshuffle for future wallets.

---

## Method 3: Dice Rolls (Maximum Verifiability)

### What You'll Need
- Casino-grade dice (1 or more)
- BIP-39 word list (printed — available at github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
- Paper and pen
- Calculator or SeedSigner for checksum

### How It Works
Each BIP-39 word maps to a number from 0-2047. You roll dice to generate random numbers, then convert them to words.

### Steps

#### Method A: 99 Dice Rolls on SeedSigner
SeedSigner has a built-in dice entropy tool:

1. On SeedSigner: **Seeds → New Seed → Dice (99 rolls)**.
2. Roll a single die 99 times, entering each result (1-6).
3. SeedSigner hashes the dice results and generates a 24-word seed.
4. Write down the words.

#### Method B: Manual Binary Conversion
For maximum control and verifiability:

1. Roll a die. Record 1-3 as 0, 4-6 as 1 (binary conversion).
2. Group every 11 rolls into one binary number (11 bits = 0-2047).
3. Convert each 11-bit number to its BIP-39 word using the word list.
4. Repeat for 23 words (253 rolls minimum).
5. Calculate the checksum for word 24.

This is tedious (~45-60 minutes) but provides mathematically provable randomness.

### Why Dice?
- **Physically verifiable randomness.** You can inspect the dice, the surface, and the process.
- **No trust in any device or software** for entropy generation.
- **Auditable:** Anyone can verify the math.

---

## Method 4: Entropia Pills (Physical Entropy Hardware)

### What They Are
3D-printed capsules containing BIP-39 words. You shake, pick randomly, and record. Think of them as a physical, tactile alternative to dice rolls.

### What You'll Need
- Entropia Pills set
- Flat surface
- Paper to write words

### Steps
1. Spread all capsules on a flat surface.
2. Mix them thoroughly.
3. Pick 23 capsules randomly (without looking).
4. Open each capsule and record the word inside, in order.
5. Calculate the 24th word (checksum) using SeedSigner or ColdCard.
6. Verify the complete seed on your hardware wallet.

### Why Pills?
- **Tactile and fun** — especially good for workshops and education.
- **No electronics** for entropy.
- **Verifiable** — you can see and feel the randomness.

---

## Method 5: Camera Entropy (SeedSigner)

### How It Works
SeedSigner captures a photo and hashes the image data to generate entropy.

### Steps
1. On SeedSigner: **Seeds → New Seed → Camera**.
2. Point the camera at something visually complex — tree bark, crumpled paper, a bookshelf, flowing water.
3. SeedSigner captures the image, hashes the pixel data, and generates a seed.
4. Write down the words.

### Why Camera?
- **Fast** — seconds vs. minutes for dice.
- **Good entropy source** — natural scenes have high visual randomness.
- **Verifiable** — SeedSigner's code is open source, you can audit the hashing algorithm.

---

## Comparing Methods

| Method | Entropy Quality | Verifiability | Time | Skill Required |
|--------|----------------|---------------|------|----------------|
| Hardware wallet RNG | High (trusted) | Low (black box) | 1 min | None |
| Seed Picker Cards | High | High | 10 min | Low |
| Dice (99 rolls) | Very High | Very High | 15 min | Low |
| Dice (manual binary) | Very High | Maximum | 45 min | Medium |
| Entropia Pills | High | High | 10 min | None |
| Camera (SeedSigner) | High | High (open source) | 1 min | None |

### Our Recommendations
- **Beginners:** Hardware wallet generation or Seed Picker Cards
- **Intermediate:** Dice rolls on SeedSigner (99 rolls — good balance of verifiability and speed)
- **Advanced/Paranoid:** Manual dice-to-binary conversion (maximum trust minimization)
- **Workshops/Education:** Seed Picker Cards or Entropia Pills (interactive, visual)

---

## Critical Security Rules (All Methods)

1. **Work in a private space.** No cameras, no smart speakers, no other people watching.
2. **Never photograph your seed words.** Not on your phone. Not "just for now."
3. **Never type your seed into a computer or phone.** The only exception: an offline, air-gapped tool for checksum calculation.
4. **Verify your seed works** by importing into your hardware wallet before sending any Bitcoin to it.
5. **Back up to steel immediately.** Paper is temporary. Steel is permanent.
6. **Destroy paper copies** once steel backup is verified.
7. **Test recovery** before depositing significant funds. Set up a new device, import the seed, verify the same addresses appear.

---

*Need help choosing? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
