# Backup Verification Checklist

Your backup is only real if you've proven it works. Do this before you send significant funds.

## Why Verify

A backup you've never tested is a backup that might not work. Steel plates get stamped wrong. Words get transposed. Passphrases get misremembered. Find out now, not when you need it.

## What You Need

- Your signing device or hardware wallet
- Your steel backup plate with seed words
- Your wallet software (Sparrow, Electrum, etc.)
- A pen and paper for noting addresses (temporary, shred after)

## Verification Steps

### Step 1: Record Your Current Addresses

- [ ] Open your wallet software
- [ ] Note the first 3 receive addresses (copy them exactly)
- [ ] Note the balance if any funds are present

### Step 2: Wipe and Restore

**Option A: Device has a "verify backup" feature**
- [ ] Use the built-in verification (ColdCard has this, some others do)
- [ ] Enter your seed words when prompted
- [ ] Device confirms match or mismatch

**Option B: Full wipe and restore**
- [ ] Factory reset your device
- [ ] Restore from your steel backup (enter all seed words)
- [ ] If you use a passphrase, enter it exactly as stored
- [ ] Open your wallet software and connect the restored device

### Step 3: Compare

- [ ] Check that the first 3 receive addresses match what you noted
- [ ] If they match, your backup is verified
- [ ] If they DON'T match, check for:
  - Transposed words
  - Wrong word (similar-looking BIP-39 words)
  - Missing or extra passphrase
  - Wrong derivation path in wallet software

### Step 4: Clean Up

- [ ] Shred the paper with noted addresses
- [ ] Your steel backup is now confirmed good

## How Often to Verify

- After initial setup (mandatory)
- After any change to your setup (new passphrase, new device)
- Once a year as a sanity check
- Before sending large amounts to the wallet

## Common Mistakes

- **Skipping verification entirely** — the most common and most dangerous mistake
- **Testing with a different passphrase** — if you use a passphrase, verify with the exact same one
- **Checking only one address** — check at least 3 to rule out coincidence
- **Verifying on a compromised computer** — use a clean machine or your hardware wallet's built-in verification
