# Prepare SeedSigner
*Last verified against SeedSigner documentation: Sep 2026*

---

## Purpose

Prepare and verify the SeedSigner before it creates or imports a key.
The next tutorial section handles the selected seed-generation method.

## What You Need

- A supported Raspberry Pi model without wireless hardware
- A compatible display and camera
- A MicroSD card
- A power cable or power bank
- A private workspace

## Prepare the Device

1. Download the current SeedSigner image from the official project release.
2. Verify the download by following the release instructions.
3. Flash the verified image to the MicroSD card.
4. Assemble the Raspberry Pi, display, and camera in the selected case.
5. Insert the MicroSD card and power on the device.
6. Confirm that the display, controls, and camera work.
7. Stop before you create or import a seed.

Use the next tutorial section to create the selected key. Power off SeedSigner
after each signing session so it clears the key from memory.

## Verify It Works

- The device boots from the verified MicroSD image.
- The controls, display, and camera work.
- The device has no enabled network connection.

## Backup

The flashed MicroSD card is not a key backup.
The next tutorial sections create the key and its recovery material.
Test that recovery material before you receive meaningful funds.

## Trade-offs to Keep in Mind

- SeedSigner is stateless. The recovery backup is the key's durable copy.
- A DIY build requires you to verify the parts and software.
- QR communication avoids a data cable but still requires careful address and
  transaction review.

## Common Mistakes

- Using a Raspberry Pi model with wireless hardware without accounting for it
- Flashing an image without verifying the release
- Creating a real key before the device and recovery process are tested
- Treating the MicroSD card as the wallet backup

## Official Sources

- [SeedSigner documentation](https://seedsigner.com/)
- [SeedSigner releases](https://github.com/SeedSigner/seedsigner/releases)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
