# Contributing to Bitcoin Self-Custody Docs

Thanks for helping make Bitcoin self-custody more accessible.

## Guidelines

### Writing Style

- **Assume the reader is a beginner.** No jargon without explanation.
- **Write for someone with the device in hand.** Every step should be actionable.
- **Be honest about tradeoffs.** Don't claim any device is "the best." State features, let the reader decide.
- **Steel backup, not paper.** Always recommend steel for seed storage.
- **Show optionality for seed generation.** Devices can generate words, or you can pick your own (dice, Seed Picker cards, Entropia Pills). If you can't read code, picking your own may be smarter.
- **Don't assume KYC.** Not everyone uses exchanges. Respect privacy.

### Technical Accuracy

- Verify every claim. If you're unsure, search first, write second.
- "Air-gapped" means no data connection. QR and MicroSD are both air-gapped methods.
- "Hardware wallet" is the generic term. "Signing device" specifically means stateless devices (like SeedSigner) that don't persist keys.
- Say "12 or 24 words" not just "24 words." Both exist.
- Don't use "true" as an intensifier (e.g., "true air-gap"). State the mechanism plainly.

### Structure

Each guide should include:
1. **What it is** — one paragraph, what the device/software does
2. **What you need** — hardware, software, accessories
3. **Setup steps** — numbered, follow-along
4. **Verify it works** — how to confirm setup succeeded
5. **Backup** — how to back up and verify the backup
6. **Common mistakes** — what people get wrong

### Formatting

- Markdown only
- No HTML
- Use `code blocks` for on-screen text the user needs to find or type
- Use **bold** for physical buttons or menu items
- One sentence per line (makes diffs readable)

## How to Submit

1. Fork this repo
2. Create a branch (`your-username/what-you-changed`)
3. Make your changes
4. Submit a pull request with a clear description of what changed and why

## Code of Conduct

Be helpful. Be honest. Don't shill products. Don't add affiliate links.

## Questions?

Open an issue or reach out at [bitcoinbutlers.com/contact](https://bitcoinbutlers.com/contact).
