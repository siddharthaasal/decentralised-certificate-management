<div align="center">
<pre>
 ██████╗███████╗██████╗ ████████╗██╗███████╗██╗   ██╗      ██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗
██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║██╔════╝╚██╗ ██╔╝     ██╔════╝██║  ██║██╔══██╗██║████╗  ██║
██║     █████╗  ██████╔╝   ██║   ██║█████╗   ╚████╔╝█████╗██║     ███████║███████║██║██╔██╗ ██║
██║     ██╔══╝  ██╔══██╗   ██║   ██║██╔══╝    ╚██╔╝ ╚════╝██║     ██╔══██║██╔══██║██║██║╚██╗██║
╚██████╗███████╗██║  ██║   ██║   ██║██║        ██║        ╚██████╗██║  ██║██║  ██║██║██║ ╚████║
 ╚═════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝        ╚═╝         ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
 -------------------------------------------------
Yes to hiring, No to frauds!
</pre>

[![DFX](https://img.shields.io/badge/DFX-0.x-blue)](https://internetcomputer.org/docs/current/developer-docs/setup/)  
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)  
[![Plug Wallet](https://img.shields.io/badge/Plug_Wallet-Required-green)](https://www.plugwallet.ooo/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  

</div>

# Decentralized Certificate Management System

This project is a **decentralized certificate management system** built on the **Internet Computer Protocol (ICP)**. It enables users to issue, store, and verify certificates using blockchain and IPFS.

## Prerequisites

- **Plug Wallet** installed in your browser
- **Node.js** and **npm** installed
- **DFX SDK** installed (for Internet Computer development)

## Installation & Setup

1. **Start the Internet Computer local network**
   ```sh
   dfx stop
   dfx start --background
   ```

2. **Deploy the project to the Internet Computer**
   ```sh
   dfx deploy
   ```

3. **Generate TypeScript bindings** (if applicable)
   ```sh
   dfx generate
   ```

4. **Replace the Canister ID** in `App.jsx`
   - Locate the Canister ID generated in `dfx deploy`
   - Replace the old Canister ID in `App.jsx`

5. **Navigate to the frontend directory**
   ```sh
   cd hello_frontend
   ```

6. **Start the frontend application**
   ```sh
   npm start
   ```

## Features & Routes

### `/issue` (Certificate Issuance)
Allows authorized users to issue new certificates by entering:
- **Certificate Name**
- **Recipient's Principal ID**
- **IPFS Certificate Hash**

#### **Test Hashes for Authentication**
Use the following test hashes for authentication:
- `bafybeifjnuxc3u4uzeae5a7m56ogjwamnhjxbv2hlhseeiawgsrrqauohq`
- `bafkreifadclxwtjugeohx632vqp77gy44at4nngt7fukbdmot6sfdlf7eu`
- `bafybeig2kwlilgjw6o46xabp3l6bbjlikkkqesiausm54r72dddoplo4xi`

### `/user` (User Dashboard)
Displays all certificates associated with the logged-in user. Certificates are **loaded automatically** from the blockchain.

### `/verify` (Certificate Verification)
Allows verification of a certificate using the **Principal ID** of the certificate holder.

## License
MIT License

