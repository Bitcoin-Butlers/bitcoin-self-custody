# Blockchain Connection - Your Bitcoin Core Node
*Last verified against Bitcoin Core documentation: Sep 2026*

---

## What It Is

A Bitcoin Core node downloads and verifies the blockchain under rules enforced
by your own software.

A node answers the wallet's blockchain queries.
It does not hold the wallet's private keys unless you also create a Bitcoin Core
wallet on that node.

## Trade-offs

**What this connection gives you:**

- Your software verifies blocks and transactions.
- A public wallet server does not receive your address queries.
- Your wallet does not depend on one external server's view of the blockchain.

**What it requires:**

- Initial synchronization time, bandwidth, and storage
- Software updates and basic maintenance
- Careful RPC configuration if another computer connects to the node
- A private network or protected tunnel for remote access

## What You Need

- A computer that can remain available when you use the wallet
- The current verified Bitcoin Core release
- Storage for an archival or pruned node
- A local network connection if the wallet runs on another computer

## Build the Connection

1. Download Bitcoin Core from the official project site.
2. Verify the download using the project's published process.
3. Install Bitcoin Core and select an archival or pruned node.
4. Let initial block download finish.
5. Keep RPC access bound to the local computer or a trusted private network.
6. If you use Sparrow, follow Sparrow's Bitcoin Core connection guide.
7. Test the connection on the local network.
8. Confirm that the wallet reports your Bitcoin Core node as its server.

## Verify It Works

- Bitcoin Core reports that it is synchronized.
- The wallet connects to the expected local node address.
- New transactions and confirmations appear through that connection.
- Stopping Bitcoin Core makes the wallet report the private server as
  unavailable instead of silently changing to a public server.

## Common Mistakes

- Treating a node as a replacement for secure key storage
- Exposing Bitcoin Core RPC directly to the public internet
- Copying RPC credentials into an untrusted application
- Assuming a pruned node does not verify the full blockchain
- Forgetting that an online node is still a general-purpose online computer

## Official Sources

- [Bitcoin Core documentation](https://github.com/bitcoin/bitcoin/tree/master/doc)
- [Sparrow: Connect to Bitcoin Core](https://sparrowwallet.com/docs/connect-node.html)

---

*Tutorial by [Bitcoin Butlers](https://bitcoinbutlers.com) - CC BY-SA 4.0*
