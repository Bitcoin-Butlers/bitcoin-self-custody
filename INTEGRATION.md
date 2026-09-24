# Integration Guide

Use this repo's guides and concierge manifest in your own Bitcoin self-custody product. Everything is served via GitHub Pages — no API key, no rate limit, no tracking.

## Concierge Manifest

The manifest describes custody models, signers, coordinators, blockchain connections, seed generation methods, and recovery content. It also retains the version 1 device and software collections for compatible consumers.

```
GET https://bitcoin-butlers.github.io/bitcoin-self-custody/concierge.json
```

### Structure

```jsonc
{
  "version": "2.2.3",
  "steps": [                          // 5 steps of the self-custody journey
    { "id": "plan", "number": 0, "title": "Plan Your Setup", ... },
    { "id": "hardware-setup", "number": 1, ... },
    { "id": "seed-generation", "number": 2, ... },
    { "id": "seed-in-use", "number": 3, ... },
    { "id": "seed-at-rest", "number": 4, ... }
  ],
  "builder": {
    "modes": { "build": { ... }, "compare": { ... } },
    "custodyModels": {                 // Single-key and multi-key policies
      "single-sig": { "signerCount": 1, "threshold": 1, ... },
      "multisig": {
        "signerCount": 3,
        "threshold": 2,
        "minimumProjects": 1,
        "recommendedMinimumProjects": 2,
        ...
      }
    },
    "signers": {                       // Physical devices and Bitcoin Core routes
      "seedsigner": {
        "project": "seedsigner",
        "setupGuide": "seedsigner-preparation",
        "custodyModels": ["single-sig", "multisig"],
        "coordinators": ["sparrow-wallet"],
        ...
      }
    },
    "coordinators": { ... },
    "connections": { ... },
    "questions": [ ... ]               // Published comparison rules
  },
  "devices": {                         // Version 1 compatible signing-device data
    "jade": {
      "name": "Blockstream Jade / Jade Plus",
      "guide": "jade",                  // → fetch guide markdown at /guides/{guide}.md
      "summary": "...",
      "setup": { "steps": [...], "prereqs": [...], "time": "10 min" }
    },
    // seedsigner
  },
  "seedMethods": {                     // Seed generation methods
    "gen-seed-picker": {
      "name": "Seed Picker Cards",
      "guide": "gen-seed-picker",
      "summary": "...",
      "devices": ["seedsigner", "jade"],  // compatible devices
      "support": "native"
    },
    // gen-hardware-wallet, gen-dice-rolls, gen-camera-entropy, gen-entropia-pills, gen-codex32
  },
  "software": {                        // Wallet software
    "sparrow-wallet": {
      "name": "Sparrow Wallet",
      "guide": "sparrow-wallet",
      "devices": ["seedsigner", "jade"],
      "type": "coordinator"
    },
    // bull-bitcoin
  },
  "backup": {                          // Backup methods
    "steel-single": { "name": "Steel Backup (Single-Sig)", "guide": "steel-backup", ... },
    "steel-multi": { ... }
  },
  "checklists": { ... },
  "comparisons": { ... },
  "advanced": { ... }
}
```

### Compatibility

Version 2 consumers should start from a custody model. Filter `builder.signers`
by `custodyModels`, then intersect the signers' `coordinators` arrays. Filter
connections through the selected coordinator. Enforce `minimumProjects` against
each signer's `project` field. Treat `recommendedMinimumProjects` as guidance,
not as a validation rule. A person can choose one signer project after reviewing
the implementation-diversity trade-off.

When present, `signer.multisigSetupGuides[coordinator]` prepares that signer
before the selected multisignature coordinator guide. Use it when the signer
needs a coordinator-specific preparation step but the general signer guide
would repeat the complete wallet flow.
`signer.coordinatorGuides[coordinator]` can replace the general guide when one
coordinator requires a different complete flow.

When present, `signer.setupGuide` prepares the tool without creating a wallet.
The concierge uses it before the selected seed-generation and coordinator
guides. `signer.coordinatorsByCustody` can narrow a signer's coordinator list
for one custody model. A coordinator's optional `signerProjects` list limits it
to compatible signer implementations.

The comparison options publish three transparent preference fields:

- `matches` changes the order of compatible signers;
- `custodyModels` limits the custody starting points shown in the results;
- `connections` selects the first compatible connection after the person
  chooses a result.

The person still chooses a result and can change every setup field before the
tutorial is built.

Version 1 consumers can continue to use the existing compatibility fields:

Use the `devices` arrays in `seedMethods` and `software` to filter options based on the user's chosen device:

```ts
// Get seed methods compatible with Blockstream Jade
const compatible = Object.entries(manifest.seedMethods)
  .filter(([, method]) => method.devices.includes("jade"));
```

## Guide Markdown

Fetch any guide's full content as markdown:

```
GET https://bitcoin-butlers.github.io/bitcoin-self-custody/guides/{slug}.md
```

For checklists:

```
GET https://bitcoin-butlers.github.io/bitcoin-self-custody/checklists/{slug}.md
```

### Device-Specific Content

Many guides contain device-specific instructions inside `<details>` blocks:

```markdown
<details>
<summary><strong>Blockstream Jade</strong></summary>

1. Power on your Jade via USB-C...
2. Select **Restore Wallet** → **24 Word Seed**...

</details>

<details>
<summary><strong>SeedSigner</strong></summary>

1. Power on your SeedSigner...

</details>
```

**To filter by device**, strip `<details>` blocks whose `<summary>` doesn't match the user's chosen device. For matching blocks, unwrap the content (remove the `<details>`/`<summary>` tags) to show it inline.

Example filter (TypeScript):

```ts
// Derive the device names from the manifest rather than hardcoding them. A
// hardcoded list silently rots: a device missing from it is not recognised as
// a device block at all, so it is treated as general content and shown to
// EVERY reader. That is a real failure mode, not a theoretical one.
function deviceKeywords(manifest: Manifest): string[] {
  return Object.values(manifest.devices)
    .flatMap((d) => d.name.split(/[\/,]/))
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);
}

// Both summary forms appear in the guides.
const BLOCK =
  /<details>\s*<summary>(?:<strong>)?(.*?)(?:<\/strong>)?<\/summary>([\s\S]*?)<\/details>/g;

function filterGuideByDevice(
  markdown: string,
  deviceName: string,
  keywords: string[]
): string {
  return markdown.replace(BLOCK, (match, summary) => {
    const s = summary.toLowerCase();
    const isDeviceBlock = keywords.some((kw) => s.includes(kw));
    if (!isDeviceBlock) return match; // keep genuinely general blocks

    if (deviceName.toLowerCase().split(/[\/,]/).some((n) => s.includes(n.trim()))) {
      // Unwrap the matching device, so its content shows inline
      return match
        .replace(/<details>\s*<summary>(?:<strong>)?.*?(?:<\/strong>)?<\/summary>/, "")
        .replace(/<\/details>$/, "")
        .trim();
    }
    return ""; // remove blocks belonging to a device the reader did not choose
  });
}
```

Also strip the `## Choose Your Device` heading after filtering, since it's redundant when only one device remains.

## Video Tutorials

The manifest includes a `videos` section mapping guide slugs to video tutorials by different creators:

```jsonc
{
  "videos": {
    "creators": {
      "bitcoin-butlers": { "name": "Bitcoin Butlers" },
      "btc-sessions": { "name": "BTC Sessions" },
      "the-bitcoin-way": { "name": "The Bitcoin Way" }
    },
    "guides": {
      "jade": {
        "bitcoin-butlers": { "url": "https://youtube.com/watch?v=...", "platform": "youtube" },
        "btc-sessions": { "url": "https://youtube.com/watch?v=...", "platform": "youtube" }
      },
      "gen-hardware-wallet": {
        "bitcoin-butlers": { "url": "https://rumble.com/v...", "platform": "rumble" }
      }
    }
  }
}
```

### How to use videos

1. **Show a creator dropdown** — let the user pick whose videos to watch. When they select a creator, show that creator's video for each step.
2. **Lock to one creator** — if your product partners with a specific creator, skip the dropdown and always show their videos.
3. **Hide videos entirely** — set `showVideos: false` if you only want the text guides.

### Fallback logic

If the selected creator doesn't have a video for a specific guide, fall back to `"bitcoin-butlers"` (which will have a video for every guide). If no video exists at all for a guide, don't show a video section for that step.

### Platforms

Videos can be on YouTube (`"youtube"`) or Rumble (`"rumble"`). Extract the video ID from the URL to build an embed:

- YouTube: `https://youtube.com/embed/{id}`
- Rumble: `https://rumble.com/embed/{id}/`

## Caching

All content is served from GitHub Pages with standard HTTP caching. For production use, we recommend:

- **ISR (Next.js)**: `fetch(url, { next: { revalidate: 3600 } })` — revalidate hourly
- **CDN**: Cache at your edge with 1-hour TTL
- **Build-time**: Fetch during build for fully static sites

## Example: Protocol Page

Here's how [Bitcoin Butlers](https://bitcoinbutlers.com) uses this in production for guided self-custody protocols:

1. **Fetch the manifest** at build/ISR time to get device and method metadata
2. **Create a protocol** with ordered steps, each referencing a guide slug and specifying allowed devices
3. **Render each step** with:
   - A title and narrative summary (custom per protocol)
   - A collapsible "Step-by-step guide" that lazy-loads the guide markdown on expand
4. **Filter guide content** by the protocol's device list — only show relevant device instructions
5. **Link products** to each step (e.g., signing device purchase, steel backup plates)

This turns the generic FOSS guides into a focused, device-specific walkthrough tailored to the protocol's recommended setup.

## License

- **Guides and checklists**: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — use freely, share alike, attribution required
- **Code and manifest**: [MIT](LICENSE) — do whatever you want

---

*Maintained by [Bitcoin Butlers](https://bitcoinbutlers.com)*
