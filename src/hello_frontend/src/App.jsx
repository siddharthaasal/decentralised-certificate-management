import React, { useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/CertificateRegistry"   // Import generated IDL
import { Principal } from "@dfinity/principal";

const CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai"; // Replace with deployed canister ID

const agent = new HttpAgent({ host: "http://localhost:4943" }); // Replace with mainnet host if needed
const contract = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

function App() {
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  const [certId, setCertId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [isValid, setIsValid] = useState(null);

  const issueCertificate = async () => {
    try {
      const certId = await contract.issueCertificate(name, Principal.fromText(recipient), ipfsHash);
      setCertId(certId);
      alert(`Certificate Issued! ID: ${certId}`);
    } catch (err) {
      console.error("Error issuing certificate:", err);
    }
  };

  const verifyCertificate = async () => {
    try {
      const result = await contract.verifyCertificate(certId);
      setIsValid(result);
    } catch (err) {
      console.error("Error verifying certificate:", err);
    }
  };

  const getCertificate = async () => {
    try {
      const cert = await contract.getCertificate(certId);
      setCertificate(cert);
    } catch (err) {
      console.error("Error fetching certificate:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>ICP Certificate Registry</h2>

      <h3>Issue Certificate</h3>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Recipient Principal" onChange={(e) => setRecipient(e.target.value)} />
      <input type="text" placeholder="IPFS Hash" onChange={(e) => setIpfsHash(e.target.value)} />
      <button onClick={issueCertificate}>Issue</button>

      <h3>Verify Certificate</h3>
      <input type="text" placeholder="Certificate ID" onChange={(e) => setCertId(e.target.value)} />
      <button onClick={verifyCertificate}>Verify</button>
      {isValid !== null && <p>Certificate is {isValid ? "Valid ✅" : "Revoked ❌"}</p>}

      <h3>Get Certificate Details</h3>
      <button onClick={getCertificate}>Fetch</button>
      {certificate && (
        <pre>{JSON.stringify(certificate, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
