# Choosing Your First Signing Device
*Last updated: Feb 2026*

---

You've decided to hold your own keys. Now you need a signing device (sometimes called a "hardware wallet"). This guide compares the major options so you can pick the right one for your situation.

## The Short Version

| Device | Best For | Display | Camera | Air-Gapped |
|--------|----------|---------|--------|------------|
| **Jade** | Budget-conscious, travel-friendly | Color | Yes | Yes (QR) |
| **SeedSigner** | DIY builders, education | Color | Yes | Yes (QR) |

*Prices change frequently. Check each manufacturer's website for current pricing.*

Both are **Bitcoin-only** and neither connects to the internet. **SeedSigner** and **Jade** are fully free and open-source software (FOSS) under permissive licenses, so anyone can read, audit, and build the firmware they run.

## What Actually Matters

### Air Gap
Every device on this list is air-gapped, meaning it never connects to the internet. Transactions are moved between your computer and the device using QR codes.

- **QR codes** - scan with the device's camera. Fastest, most intuitive.

Some signing devices we do not cover here move transactions on a MicroSD card instead. Both approaches keep the device off the internet.

### Build Quality
You're trusting this device with your savings. It should feel like it.

- **Jade** - compact, smooth plastic. Travels well
- **SeedSigner** - DIY assembly (Raspberry Pi + camera + screen). Customizable enclosures available

### Secure Element
A secure element is a dedicated chip that protects your private keys from physical extraction.

- **Jade** - no secure element. Uses a "virtual secure element" model where Blockstream's server participates in unlocking (or you can use a fully offline PIN)
- **SeedSigner** - no secure element, no key storage. Seeds are generated fresh each session or loaded via QR. There's nothing to extract because nothing is stored

### Multisig Support

With single-sig, one device controls your Bitcoin. If that device has a flaw, a backdoor, or gets compromised, your Bitcoin is gone. Multisig eliminates that single point of failure by requiring multiple keys from different devices to approve a transaction (e.g., 2-of-3).

Using devices from **different manufacturers** (multi-vendor multisig) means a vulnerability in one manufacturer's hardware or firmware can't compromise your funds on its own. For example, a 2-of-3 multisig using a Jade, a SeedSigner, and a third device from another manufacturer means an attacker would need to independently compromise two different companies' security models simultaneously. This guide covers the first two. Any BIP-39 device that signs PSBTs can hold the third key.

Every device on this list supports multisig. The experience varies:

- **SeedSigner** - built for multisig from day one. QR-based PSBT signing
- **Jade** - supports multisig, integrates with Blockstream Green

## Device Deep Dives

### Blockstream Jade
The budget-friendly option. Compact, capable, and backed by Blockstream.

**Strengths:**
- Most affordable option
- Compact and travel-friendly
- Camera for QR scanning
- Bluetooth available (can be disabled)
- Works great with Blockstream Green app on mobile
- "Virtual secure element" means no single hardware chip to fail

**Trade-offs:**
- No physical secure element
- Default setup requires Blockstream server for PIN verification (can be changed to fully offline)
- Bluetooth and USB connectivity exist (larger attack surface than MicroSD-only devices)
- Plastic build (fine, but not premium)


→ [Setup Guide](jade.md) · [Try the emulator](../emulators/jade/)

---

### SeedSigner
The DIY option. Build it yourself from off-the-shelf parts. No key storage by design.

**Strengths:**
- Build from commodity parts (Raspberry Pi Zero, camera, screen)
- Completely open hardware and software
- No key storage = nothing to extract
- Camera for QR scanning
- Built for multisig workflows
- Active community development

**Trade-offs:**
- Requires assembly (soldering optional, but fiddly)
- No secure element, no persistent storage
- Must re-enter seed via QR code each session
- Raspberry Pi supply chain issues (sometimes hard to find parts)
- Less polished UI than commercial devices


→ [Setup Guide](seedsigner.md) · [Try the web emulator](../emulators/seedsigner/)

---

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
