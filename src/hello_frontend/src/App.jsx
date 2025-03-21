import React, { useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/CertificateRegistry"   // Import generated IDL
import { Principal } from "@dfinity/principal";
import { Toaster } from "sonner";

import IssueCertificate from "./components/IssueCertificate";
import VerifyCertificate from "./components/VerifyCert";
import UserDashboard from "./components/UserDashboard";

const CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai"; // Replace with deployed canister ID

const agent = new HttpAgent({ host: "http://localhost:4943" }); // Replace with mainnet host if needed
const contract = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

function App({ Component, pageProps }) {


  return (
    <>
      <Toaster richColors position="top-right" />

      {/* <VerifyCertificate canisterId={CANISTER_ID} idlFactory={idlFactory} /> */}
      <IssueCertificate canisterId={CANISTER_ID} idlFactory={idlFactory} />
      {/* <UserDashboard canisterId={CANISTER_ID} idlFactory={idlFactory} /> */}
    </>

  );
}

export default App;
