# Prepare Blockstream Jade
*Last verified against Blockstream Jade documentation: Sep 2026*

---

## Purpose

Prepare and verify Jade before it creates or imports a key.
The next tutorial section handles the selected seed-generation method.

## What You Need

- A Blockstream Jade or Jade Plus
- A compatible power and data cable
- The official firmware and verification instructions
- A private workspace

## Prepare the Device

1. Inspect the packaging and device for damage or unexpected changes.
2. Charge the device and power it on.
3. Compare the installed firmware with the current official release.
4. Follow Blockstream's verification and update instructions if an update is
   required.
5. Review the standard PIN, QR PIN, and stateless modes before you choose one.
6. Choose the USB, Bluetooth, or QR communication method that your Jade model
   and coordinator support.
7. Stop before you create or import a seed.

Use the next tutorial section to create or import the selected key.

## Verify It Works

- The device boots and reports the expected firmware release.
- The controls, display, and selected communication method work.
- You understand whether the selected mode stores the seed between sessions.

## Backup

Device preparation does not create a key backup.
The next tutorial sections create the key and its recovery material.
Test that recovery material before you receive meaningful funds.

## Trade-offs to Keep in Mind

- The standard PIN flow uses Blockstream's blind-oracle service unless you
  configure an alternative.
- Stateless mode does not retain the seed between sessions, but it requires you
  to load the key again.
- Jade Plus supports direct QR scanning. Earlier Jade models have different QR
  capabilities.

## Common Mistakes

- Continuing after packaging or firmware verification fails
- Choosing a PIN or stateless mode without understanding its recovery process
- Creating a real key before the recovery process is ready
- Assuming the device PIN replaces the key backup

## Official Sources

- [Blockstream Jade documentation](https://help.blockstream.com/hc/en-us/categories/900000056183-Blockstream-Jade)
- [Jade firmware source](https://github.com/Blockstream/Jade)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
