# Choosing Your First Signing Device
*Last updated: Feb 2026*

---

You've decided to hold your own keys. Now you need a signing device (sometimes called a "hardware wallet"). This guide compares the major options so you can pick the right one for your situation.

## The Short Version

| Device | Best For | Display | Camera | Air-Gapped |
|--------|----------|---------|--------|------------|
| **ColdCard Mk4** | Security maximalists | Small OLED | No | Yes (MicroSD) |
| **ColdCard Q** | Power users who want a keyboard | Large color + QWERTY | Yes | Yes (QR + MicroSD + NFC) |
| **Passport** | Design-conscious Bitcoiners | Color touchscreen | Yes | Yes (QR + MicroSD) |
| **Jade** | Budget-conscious, travel-friendly | Color | Yes | Yes (QR) |
| **SeedSigner** | DIY builders, education | Color | Yes | Yes (QR) |

*Prices change frequently. Check each manufacturer's website for current pricing.*

All five are **Bitcoin-only** and none of them connect to the internet. **SeedSigner** and **Jade** are fully free and open-source software (FOSS) under permissive licenses. **ColdCard**, **Passport**, and their firmware are source-available and auditable, but carry more restrictive licensing terms.

## What Actually Matters

### Air Gap
Every device on this list is air-gapped, meaning it never connects to the internet. Transactions are moved between your computer and the device using QR codes or MicroSD cards.

- **QR codes** - scan with the device's camera. Fastest, most intuitive.
- **MicroSD** - save transaction files to a card, physically move it. Works in all lighting conditions.
- **Both** - ColdCard Q and Passport support both methods.

### Build Quality
You're trusting this device with your savings. It should feel like it.

- **Passport** - machined aluminum, premium feel
- **ColdCard Q** - solid plastic with QWERTY keyboard, industrial feel
- **ColdCard Mk4** - small, light, plastic. Designed to be hidden, not displayed
- **Jade** - compact, smooth plastic. Travels well
- **SeedSigner** - DIY assembly (Raspberry Pi + camera + screen). Customizable enclosures available

### Secure Element
A secure element is a dedicated chip that protects your private keys from physical extraction.

- **ColdCard Mk4/Q** - dual secure elements (ATECC608B). Most paranoid hardware security
- **Passport** - single secure element (ATECC608B)
- **Jade** - no secure element. Uses a "virtual secure element" model where Blockstream's server participates in unlocking (or you can use a fully offline PIN)
- **SeedSigner** - no secure element, no key storage. Seeds are generated fresh each session or loaded via QR. There's nothing to extract because nothing is stored

### Multisig Support

With single-sig, one device controls your Bitcoin. If that device has a flaw, a backdoor, or gets compromised, your Bitcoin is gone. Multisig eliminates that single point of failure by requiring multiple keys from different devices to approve a transaction (e.g., 2-of-3).

Using devices from **different manufacturers** (multi-vendor multisig) means a vulnerability in one manufacturer's hardware or firmware can't compromise your funds on its own. For example, a 2-of-3 multisig using a ColdCard, a Passport, and a SeedSigner means an attacker would need to independently compromise two different companies' security models simultaneously.

Every device on this list supports multisig. The experience varies:

- **ColdCard** - supports PSBT natively. Longest multisig track record
- **Passport** - clean multisig flow with QR codes
- **SeedSigner** - built for multisig from day one. QR-based PSBT signing
- **Jade** - supports multisig, integrates with Blockstream Green

## Device Deep Dives

### ColdCard Mk4
The original Bitcoin-only signing device. Small, discreet, and packed with security features.

**Strengths:**
- Dual secure elements
- Brick Me PIN (self-destruct if coerced)
- Duress wallet (plausible deniability)
- MicroSD-only communication (no camera, no wireless)
- Countdown login delay (anti-brute-force)
- Longest track record of any Bitcoin signing device

**Trade-offs:**
- Small OLED display (harder to verify addresses)
- No camera (can't scan QR codes, MicroSD only)
- Numeric keypad only (entering passphrases is tedious)
- Not the most intuitive for beginners


→ [Setup Guide](coldcard-mk4.md) · [Try the simulator](../emulators/coldcard/)

---

### ColdCard Q
ColdCard's premium model. Full QWERTY keyboard, large color display, camera for QR scanning.

**Strengths:**
- Everything the Mk4 has, plus a real keyboard
- Large color display (easy to verify addresses)
- Camera for QR code scanning
- Both QR and MicroSD communication
- NFC support (optional, can be disabled)
- Battery-powered (3x AAA)

**Trade-offs:**
- Largest and most expensive option
- Overkill for simple single-sig setups
- QWERTY keyboard adds attack surface (theoretically)


→ [Setup Guide](coldcard-q.md) · [Try the simulator](../emulators/coldcard/)

---

### Foundation Passport
Premium build quality, intuitive interface, camera for QR scanning.

**Strengths:**
- Machined aluminum body (feels expensive because it is)
- Clean, intuitive UI
- Camera for QR code scanning
- MicroSD support
- Secure element
- Excellent documentation and support from Foundation

**Trade-offs:**
- Higher price point
- Battery is internal (rechargeable via USB-C)
- Newer company than Coinkite (less track record)
- USB-C port exists (for charging only, but purists dislike any port)


→ [Setup Guide](passport.md) · [Try the simulator](../emulators/passport/)

---

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
