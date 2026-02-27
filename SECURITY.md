# Security Policy

## Reporting Vulnerabilities

If you find a security issue in the emulator code or a dangerous error in a guide, please report it privately.

**Email:** security@bitcoinbutlers.com

**Do NOT open a public issue for security vulnerabilities.**

We will acknowledge your report within 48 hours and provide an update within 7 days.

## Scope

### In Scope
- Emulator code that could leak data or execute unintended commands
- Guide instructions that could lead to loss of funds
- Dependencies with known vulnerabilities

### Out of Scope
- The upstream device firmware (report to the manufacturer directly)
- Theoretical attacks that require physical access to a real device
- Social engineering

## Important Reminder

The emulators in this repository are for **learning and testing only**. They run on general-purpose computers that are NOT secure environments for real Bitcoin operations.

**Never enter a real seed phrase into any emulator.**

**Never use an emulator-generated seed for real funds.**

The emulators do not have secure elements, secure boot, or any of the hardware protections that make signing devices safe. They are educational tools, nothing more.
