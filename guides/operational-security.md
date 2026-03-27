# Operational Security - Using Your Wallet Safely

---

## Receiving Bitcoin Safely

Every time you share a receive address, verify it on your signing device screen first. Clipboard malware can replace the address displayed on your computer with an attacker's address. Your signing device is the source of truth.

### How to Verify a Receive Address

Check the **first 6 and last 6 characters** of the address. This is sufficient to catch clipboard replacement attacks, which swap the entire address.

<details>
<summary>ColdCard Mk4</summary>

1. In Sparrow, go to the **Receive** tab. An address appears.
2. On ColdCard, go to **Address Explorer**.
3. Navigate to the same address index.
4. Compare first 6 and last 6 characters between Sparrow and ColdCard.
5. ColdCard displays addresses on its own screen, independent of your computer.

</details>

<details>
<summary>ColdCard Q</summary>

1. In Sparrow, go to the **Receive** tab.
2. On ColdCard Q, go to **Address Explorer**.
3. The Q's large color display shows the full address clearly.
4. Compare first 6 and last 6 characters.
5. You can also scan a QR of the address with the Q's camera to verify.

</details>

<details>
<summary>SeedSigner</summary>

1. In Sparrow, go to the **Receive** tab.
2. Load your seed on SeedSigner.
3. Go to **Verify Address** and scan the QR code shown in Sparrow.
4. SeedSigner confirms whether the address belongs to your seed or shows a warning.
5. This is a cryptographic verification, not just a visual check.

</details>

<details>
<summary>Foundation Passport</summary>

1. In Sparrow, go to the **Receive** tab.
2. On Passport, go to **Verify Address**.
3. Scan the QR code from Sparrow using Passport's camera.
4. Passport confirms the address belongs to your wallet.

</details>

<details>
<summary>Blockstream Jade / Jade Plus</summary>

1. In Sparrow or Green Wallet, go to the **Receive** tab.
2. On Jade, the address displays on the device screen during receive.
3. Compare first 6 and last 6 characters.
4. Jade Plus with QR mode: scan the receive QR to verify on-device.

</details>

<details>
<summary>Sparrow Wallet</summary>

Sparrow highlights address differences when comparing. When you verify an address on your hardware device:
- The full address is shown in the **Receive** tab
- Sparrow supports QR display for easy scanning by camera-equipped devices
- Always cross-reference with your signing device, never trust Sparrow alone

</details>

---

## Sending Bitcoin Safely

When signing a transaction, your signing device displays the destination address and amount. **Always verify both on the device screen before approving.**

Your computer could be compromised. The transaction displayed in Sparrow could show one address while actually sending to another. Your signing device shows the real destination.

### Before You Sign

1. **Verify the destination address** on your device screen. Check first 6 and last 6 characters against what the recipient gave you.
2. **Verify the amount** on your device screen. Make sure it matches what you intended.
3. **Check the fee.** Unusually high fees could indicate a fee-manipulation attack.
4. If anything looks wrong, reject the transaction on your device.

---

## Firmware Updates

Keep your signing device firmware current. Updates fix security vulnerabilities and add features.

**Safe update process:**
1. Only download firmware from the official manufacturer website or GitHub releases
2. Verify the firmware signature or checksum (ColdCard, Passport, and SeedSigner all support this)
3. Update via MicroSD card or QR code, not USB (maintains air-gap)
4. After updating, verify your wallet still loads correctly and addresses match

**Do not:**
- Download firmware from third-party sites
- Skip signature verification
- Update from files sent to you by anyone, even someone claiming to be support

---

## Physical Security

- **Do not tell people you own Bitcoin.** The less people know, the safer you are.
- **Store your signing device and steel backup in separate locations.** A thief who finds both has everything.
- **Be aware of your surroundings** when using your device. Shoulder surfing is real.
- **At home:** consider a small safe for your device. Your steel backup should be in a different location entirely.

### The $5 Wrench Attack

If someone physically threatens you, compliance is the correct response. Your life is worth more than your Bitcoin.

Mitigation strategies:
- **Passphrase/decoy wallet:** Hand over the device, it opens the decoy wallet with a small balance. Real funds are behind the passphrase.
- **Multisig:** No single device can spend. Even under coercion, you physically cannot send funds with one device.
- **Time locks:** Some advanced setups can delay transactions, giving time to alert authorities.
- **Do not resist.** No amount of Bitcoin is worth physical harm.

---

## Digital Hygiene

### Never Do These Things

- **Never photograph your seed words.** Photos sync to cloud services, get backed up automatically, and persist in deleted-photo recovery.
- **Never type your seed into a computer or phone.** Keyloggers, clipboard monitors, and screen recording malware are common.
- **Never enter your seed on a website.** There is no legitimate reason for any website to ask for your seed. Ever.
- **Never store your seed digitally.** Not in a notes app, not in a password manager, not in an encrypted file. Steel or nothing.
- **Never share your screen** while your wallet is open. Screen-sharing software captures everything.

### If You Think Your Seed Was Compromised

Act immediately:
1. Generate a new seed on your signing device
2. Create a new wallet with the new seed
3. Transfer all funds from the old wallet to the new wallet
4. Create a new steel backup for the new seed
5. Destroy the old steel backup

Speed matters. If an attacker has your seed, they can drain the wallet at any time.

---

## Regular Maintenance

Every 6-12 months:
- [ ] Check that your steel backup is still in its location and readable
- [ ] Verify your device powers on and functions correctly
- [ ] Check for firmware updates
- [ ] Confirm your wallet software is up to date
- [ ] Review your inheritance plan (do your heirs still know where things are?)
