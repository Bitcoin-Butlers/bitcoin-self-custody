# Steel Backup Plates — Complete Guide
*Bitcoin Butlers Master Concierge*

---

## Why Steel?

Paper burns. Paper dissolves in water. Paper fades over decades. Your seed phrase is the ONLY way to recover your Bitcoin if your hardware wallet is lost, stolen, or broken.

Steel survives:
- **Fire:** Melting point of steel is ~1,370°C (2,500°F). House fires reach ~600°C (1,100°F).
- **Water:** Stainless steel doesn't rust or corrode.
- **Time:** No degradation over decades.
- **Physical damage:** Stamped characters are embedded in the metal, not surface-level.

---

## Single-Sig Steel Backup

*For wallets controlled by one signing device (ColdCard, Passport, Jade, SeedSigner, etc.)*

### What You're Backing Up
- Your 24-word recovery phrase (or 12 words)
- That's it. The seed phrase IS your wallet.

### What You'll Need
- Bitcoin Butlers Steel Backup Plate (single-sig)
- Letter stamp set (included with some plates, or purchased separately)
- Hammer
- Hard, flat surface (concrete floor or anvil, NOT a table)
- Pen/marker for alignment (optional)

### Step-by-Step

#### 1. Prepare Your Workspace
1. Work in a private room with no cameras.
2. Place the steel plate on a hard, flat surface. A concrete garage floor works well.
3. Have your written seed words nearby for reference.

#### 2. Understand the Plate Layout
- Most plates have 24 numbered slots (1-24).
- Each slot fits 4-8 characters.
- **You only need the first 4 letters of each word.** In BIP-39, the first 4 letters uniquely identify every word on the 2048-word list.
- Example: "abandon" → "ABAN", "ability" → "ABIL", "abstract" → "ABST"

#### 3. Stamp Your Words
1. Start with word #1.
2. Align the first letter stamp in the slot. Hold it firmly and vertically.
3. Strike the stamp once with the hammer — firm and confident. Hesitation causes double-strikes.
4. Move to the next letter. Use the previous impression as a spacing guide.
5. Stamp all 4 letters for word #1.
6. Move to word #2. Repeat through word #24.

#### 4. Tips for Clean Stamps
- **One firm strike per letter.** Don't tap repeatedly — it blurs the impression.
- **Hold the stamp perpendicular** to the plate. Angled strikes create partial impressions.
- **Use a marker first** to lightly mark where each letter goes (optional — helps with alignment).
- **Don't rush.** This is a permanent backup of your wealth. Take 30-45 minutes.
- **Practice on scrap metal first** if you've never used letter stamps before.

#### 5. Verify Your Backup
1. Read back all 24 words (first 4 letters) from the steel plate.
2. Cross-reference with your paper backup.
3. **Every word must be correct.** Even one wrong letter could make recovery impossible.
4. If a stamp is unclear, re-stamp it next to the original (don't try to stamp on top).

#### 6. Store the Plate
- **Separately from your signing device.** If someone finds both, they have your Bitcoin.
- Fire safe, safety deposit box, buried in a known location, or hidden in your home.
- Consider: if your house burns down, would you still have access to this plate?
- Multiple steel backups in different locations add redundancy.

---

## Multi-Sig Steel Backup

*For wallets that require multiple keys to sign (e.g., 2-of-3 multisig via Sparrow)*

### What You're Backing Up
A multisig wallet has more information than a single-sig wallet:

1. **Each signer's extended public key (xpub/zpub)** — identifies each key in the quorum
2. **The wallet descriptor** — tells software how to reconstruct the wallet
3. **Each signer's seed phrase** — backed up on separate plates
4. **The quorum configuration** — e.g., "2 of 3"

### Why Multisig Backup Is More Complex
In single-sig, your 24 words recover everything. In multisig, your 24 words only recover ONE key. To reconstruct the WALLET, you need:
- The seed phrases for enough signers to meet the quorum (e.g., 2 of 3)
- The wallet descriptor OR all xpubs + derivation paths

**If you lose the descriptor and only have one seed phrase, you cannot spend your Bitcoin** — even though the Bitcoin is technically still "yours."

### What You'll Need
- Bitcoin Butlers Steel Backup Plate Set (multisig — 3 plates)
- Letter stamp set
- Hammer
- Hard, flat surface
- Your wallet descriptor (from Sparrow → File → Export Wallet)
- All xpubs for each signer

### Step-by-Step

#### 1. Understand What Goes on Each Plate

For a 2-of-3 multisig, you create 3 plates. Each plate contains:

**Plate 1 (stored at Location A):**
- Seed words for Key #1 (24 words, first 4 letters each)
- Wallet descriptor (or all 3 xpubs + derivation paths)

**Plate 2 (stored at Location B):**
- Seed words for Key #2
- Wallet descriptor (same as Plate 1)

**Plate 3 (stored at Location C):**
- Seed words for Key #3
- Wallet descriptor (same as Plate 1)

**Why the descriptor on every plate?** Because any 2 plates must be sufficient to recover the wallet. If you only put the descriptor on Plate 1 and lose it, Plates 2+3 have seed words but can't reconstruct the wallet.

#### 2. Stamp the Seed Words
Same process as single-sig — 24 words, first 4 letters, one plate per key.

#### 3. Stamp the Wallet Descriptor
The wallet descriptor is a string like:
```
wsh(sortedmulti(2,[fingerprint1/48'/0'/0'/2']xpub...,[fingerprint2/48'/0'/0'/2']xpub...,[fingerprint3/48'/0'/0'/2']xpub...))
```

This is long. Options for recording it:

**Option A: QR Code on Steel**
- Generate a QR of the descriptor in Sparrow (File → Export → Output Descriptor QR).
- Stamp or etch the QR pattern onto the plate.
- Most durable and compact, but requires precision.

**Option B: Abbreviated xpubs**
- Stamp the first and last 8 characters of each xpub.
- Stamp the derivation path and fingerprint for each.
- Stamp the quorum ("2of3").
- This is enough to identify the correct wallet when combined with the seed phrases.

**Option C: MicroSD + Steel**
- Save the full descriptor file to a MicroSD card.
- Store the MicroSD card WITH each steel plate.
- The steel protects against fire/water; the MicroSD holds the complete descriptor.
- **Risk:** MicroSD cards can fail over time. The steel is the true long-term backup.

#### 4. Verify Each Plate
1. Read back seed words from each plate.
2. Verify the descriptor information is consistent across all plates.
3. **Test recovery:** In Sparrow, create a new wallet using the descriptor from the plate + import one key. Verify it generates the same addresses as your original wallet.

#### 5. Distribute the Plates
- **Location A:** Your home (fire safe, hidden location)
- **Location B:** Trusted family member, safety deposit box, or second property
- **Location C:** Another geographically separate location

**The goal:** No single break-in, fire, flood, or disaster can destroy enough plates to prevent recovery. Any 2 of 3 locations surviving means your Bitcoin is recoverable.

---

## Common Mistakes

| Mistake | Consequence | Prevention |
|---------|------------|------------|
| Wrong word stamped | Recovery fails | Verify against paper backup after every word |
| Unclear stamp impression | Word unreadable in 10 years | One firm strike. Practice first. Re-stamp if unclear. |
| Storing plate with device | Single point of failure — thief gets both | Always separate: device in one location, steel in another |
| Only one copy | House fire = total loss | Multiple steel backups in different locations |
| Multisig: no descriptor backup | Can't reconstruct wallet even with seed phrases | Descriptor on EVERY plate |
| Photographing the plate | Digital copy = hackable | Never. The plate IS the backup. |

---

## Long-Term Considerations

- **Check your backup annually.** Pull the plate out, read the words, verify they're still legible.
- **Tell someone trusted** where the plate is stored — especially for inheritance. Not the contents, just the location.
- **Update if you change wallets.** A plate for an old wallet is useless (or dangerous if the old wallet still has funds).
- **Stainless steel > mild steel.** Stainless resists corrosion better for long-term underground or humid storage.

---

*Need help? Book a consultation with a Bitcoin Butler at bitcoinbutlers.com/booking*
