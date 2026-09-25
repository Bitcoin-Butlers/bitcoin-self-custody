# FOSS Concierge Flow

## Goal

Help a person build and understand a Bitcoin self-custody setup.

The concierge explains choices and trade-offs. It does not label one setup as
the best setup for a person. Every result shows why it fits the person's stated
preferences and which risks remain.

The FOSS repository owns the neutral decision model, guides, and standalone
wizard. A host site can add products, regional shops, video creators, or human
help without changing the neutral guidance.

## Entry routes

### Build my setup

Use this route when the person already knows what they want.

1. Select a custody model.
2. Select compatible tools.
3. Review the combined trade-offs.
4. Build the tutorial.

### Help me compare

Use this route when the person is not sure.

1. Ask how many keys the person can manage, how much setup and maintenance is
   acceptable, which equipment they prefer, and whether privacy or convenience
   matters more when connecting the wallet.
2. Order the compatible setups by how closely they match those answers.
3. Explain each match and its remaining trade-offs.
4. Let the person choose a setup.
5. Build the same tutorial as the first route.

This route uses a published rules table. It does not use a hidden AI decision.

## Setup model

A setup is composed from five layers.

### 1. Custody policy

- Single-key
- Multi-key

The multi-key route uses a 2-of-3 multisignature policy. The person can use the
same signer project for every key, use signers from different projects, or use
Bitcoin Core for all three keys. The concierge recommends independent signer
projects because this reduces reliance on one implementation. It does not
require this choice.

Every multisignature key must use a different seed or wallet. Repeating one seed
does not create independent keys.

### 2. Signer

- A supported commercial FOSS signing device
- A DIY stateless signer such as SeedSigner
- Bitcoin Core on an online computer
- Bitcoin Core on a dedicated offline computer

The Bitcoin Core-only multisignature route follows Bitcoin Core's descriptor
wallet and PSBT flow. A mixed route uses Sparrow as the coordinator. It imports
the Core key as a watch-only xpub and returns PSBTs to the offline Core wallet
for signing.

An online Bitcoin Core wallet is a hot wallet. The concierge presents it as a
learning or active-use option. It does not describe it as cold storage.

The offline Bitcoin Core route uses two computers. The offline computer holds
the private keys. The online computer holds a watch-only wallet. They exchange
PSBTs for signing.

### 3. Coordinator

- Bitcoin Core
- Sparrow Wallet

The coordinator creates addresses and transactions. It is separate from the
signer and from the node.

### 4. Blockchain connection

- A third-party server
- A private Bitcoin Core node

Running a node improves verification and privacy. It does not replace key
storage or a backup.

### 5. Recovery

- Seed backup where the signer uses a seed
- Passphrase backup where the setup uses a passphrase
- Wallet descriptor backup for multisignature and watch-only setups
- A tested recovery exercise before meaningful funds are received

## Tutorial result

The result is one ordered plan, not a list of unrelated articles.

1. Acquire or prepare the selected tools.
2. Verify downloads, firmware, and hardware where applicable.
3. Create the keys.
4. Create the coordinator or watch-only wallet.
5. Verify receive addresses on an independent device where possible.
6. Back up every required recovery item.
7. Complete a recovery test.
8. Receive a small test amount.
9. Create, sign, and broadcast a test transaction.
10. Show ongoing maintenance and inheritance tasks.

Each tutorial section comes from a maintained guide in this repository.

## Content updates

An update job may monitor official project and vendor documentation. It creates
a review request when a source changes. It never publishes security instructions
automatically.

A future update system should record:

- its official source URL;
- the source version or revision;
- the date that a human last verified it;
- which setup and tutorial steps use it.

AI may compare a source revision and draft an update. A maintainer must verify
and merge that update.

## Host integration

The public manifest exposes the setup model, compatibility rules, trade-offs,
and guide references. The standalone wizard consumes that manifest directly.

Bitcoin Butlers consumes the same manifest and adds:

- local and partner products;
- Butler videos;
- Butler booking;
- commercial disclosures.

Commercial data never decides which custody setup appears first.

## Repository scope

This repository publishes the standalone wizard, neutral compatibility rules,
and maintained self-custody guides.
Host applications consume the public manifest and add their own commercial
features.
Exchange import modules remain outside this repository.
