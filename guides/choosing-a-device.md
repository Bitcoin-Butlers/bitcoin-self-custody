# Choosing Your First Signing Device
*Bitcoin Butlers Master Concierge*
*Last updated: Feb 2026*

---

You've decided to hold your own keys. Now you need a signing device (sometimes called a "hardware wallet"). This guide compares the major options so you can pick the right one for your situation.

## The Short Version

| Device | Best For | Price | Display | Camera | Air-Gapped |
|--------|----------|-------|---------|--------|------------|
| **ColdCard Mk4** | Security maximalists | ~$150 | Small OLED | No | Yes (MicroSD) |
| **ColdCard Q** | Power users who want a keyboard | ~$240 | Large color + QWERTY | Yes | Yes (QR + MicroSD) |
| **Passport** | Design-conscious Bitcoiners | ~$200 | Color touchscreen | Yes | Yes (QR + MicroSD) |
| **Jade** | Budget-conscious, travel-friendly | ~$65 | Color | Yes | Yes (QR) |
| **SeedSigner** | DIY builders, education | ~$50 (parts) | Color | Yes | Yes (QR) |

All five are **Bitcoin-only** and **open source**. None of them connect to the internet. You can't go wrong with any of them.

## What Actually Matters

### Air Gap
Every device on this list is air-gapped, meaning it never connects to the internet. Transactions are moved between your computer and the device using QR codes or MicroSD cards.

- **QR codes** — scan with the device's camera. Fastest, most intuitive.
- **MicroSD** — save transaction files to a card, physically move it. Works in all lighting conditions.
- **Both** — ColdCard Q and Passport support both methods.

### Build Quality
You're trusting this device with your savings. It should feel like it.

- **Passport** — machined aluminum, premium feel, best-looking device on the market
- **ColdCard Q** — solid plastic with QWERTY keyboard, industrial feel
- **ColdCard Mk4** — small, light, plastic. Designed to be hidden, not displayed
- **Jade** — compact, smooth plastic. Travels well
- **SeedSigner** — DIY assembly (Raspberry Pi + camera + screen). Functional, not pretty

### Secure Element
A secure element is a dedicated chip that protects your private keys from physical extraction.

- **ColdCard Mk4/Q** — dual secure elements (ATECC608B). Most paranoid hardware security
- **Passport** — single secure element (ATECC608B)
- **Jade** — no secure element. Uses a "virtual secure element" model where Blockstream's server participates in unlocking (or you can use a fully offline PIN)
- **SeedSigner** — no secure element, no key storage. Seeds are generated fresh each session or loaded via QR. This is a feature, not a bug: there's nothing to extract because nothing is stored

### Multisig Support
Multisig means requiring multiple devices to approve a transaction (e.g., 2-of-3). This is the gold standard for securing large amounts.

Every device on this list supports multisig. The experience varies:

- **ColdCard** — the original multisig champion. Supports PSBT natively
- **Passport** — clean multisig flow with QR codes
- **SeedSigner** — built for multisig from day one. QR-based PSBT signing
- **Jade** — supports multisig, better with Blockstream Green

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

**Best for:** People who prioritize security above all else and don't mind a learning curve.

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
- Largest and most expensive option (~$240)
- Overkill for simple single-sig setups
- QWERTY keyboard adds attack surface (theoretically)

**Best for:** Power users who want maximum features and don't mind the size/price.

→ [Setup Guide](coldcard-q.md) · [Try the simulator](../emulators/coldcard/)

---

### Foundation Passport
The best-looking signing device. Premium build quality, intuitive interface, camera for QR scanning.

**Strengths:**
- Machined aluminum body (feels expensive because it is)
- Clean, intuitive UI
- Camera for QR code scanning
- MicroSD support
- Secure element
- Excellent documentation and support from Foundation

**Trade-offs:**
- Higher price point (~$200)
- Battery is internal (rechargeable via USB-C)
- Newer company than Coinkite (less track record)
- USB-C port exists (for charging only, but purists dislike any port)

**Best for:** People who want security AND good design. Great first device.

→ [Setup Guide](passport.md) · [Try the simulator](../emulators/passport/)

---

### Blockstream Jade
The budget-friendly option. Compact, capable, and backed by Blockstream.

**Strengths:**
- Most affordable option (~$65)
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

**Best for:** Budget-conscious buyers, travelers, mobile-first users.

→ [Setup Guide](jade.md) · [Try the emulator](../emulators/jade/)

---

### SeedSigner
The DIY option. Build it yourself from off-the-shelf parts. No key storage by design.

**Strengths:**
- Build from commodity parts (Raspberry Pi Zero, camera, screen) — ~$50
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

**Best for:** DIY builders, educators, multisig enthusiasts, people who want to understand their tools from the ground up.

→ [Setup Guide](seedsigner.md) · [Try the web emulator](../emulators/seedsigner/)

---

## Recommendations by Situation

### "I'm new to self-custody and want something easy"
**Passport** or **Jade**. Both have cameras for QR scanning (the easiest communication method), color displays, and intuitive interfaces. Passport if budget isn't a concern, Jade if it is.

### "I want maximum security"
**ColdCard Mk4** or **ColdCard Q**. Dual secure elements, duress features, longest track record. The Mk4 is more discreet, the Q is more usable.

### "I'm setting up multisig"
**SeedSigner** (for the signing devices) + **Sparrow** (for the coordinator). SeedSigner is built for multisig, costs ~$50 per unit, and you need multiple devices. Three SeedSigners for a 2-of-3 multisig costs less than one ColdCard Q.

### "I want to learn how it all works"
**SeedSigner**. Building it teaches you about the hardware. The open-source code is readable Python. And you can [practice in the browser emulator](../emulators/seedsigner/) before buying parts.

### "I travel a lot"
**Jade**. Smallest, lightest, no batteries to worry about (charges via USB-C). Looks like a generic USB device to anyone who doesn't know what it is.

### "Money is no object"
**ColdCard Q** + **Passport**. Use the ColdCard Q for your cold storage vault, Passport for regular spending. Both support multisig if you want to combine them.

---

## One More Thing

The best signing device is the one you actually use. All five options on this page will protect your Bitcoin. Pick one, set it up, and move your coins off the exchange.

Don't overthink it. Act.

Need help? [Bitcoin Butlers](https://bitcoinbutlers.com) connects you with experts who walk you through the whole process, step by step.
