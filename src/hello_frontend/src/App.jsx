import React, { useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../declarations/CertificateRegistry"   // Import generated IDL
import { Principal } from "@dfinity/principal";
import { Toaster } from "sonner";
import { Routes, Route } from "react-router";

import IssueCertificate from "./components/IssueCertificate";
import VerifyCertificate from "./components/VerifyCert";
import UserDashboard from "./components/UserDashboard";
import Navigator from "./components/Navigator";
import Index from "./components/Index";

const CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai"; // Replace with deployed canister ID

const agent = new HttpAgent({ host: "http://localhost:4943" }); // Replace with mainnet host if needed
const contract = Actor.createActor(idlFactory, { agent, canisterId: CANISTER_ID });

function App({ Component, pageProps }) {


  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/navigate" element={<Navigator />} />
        <Route path="/user" element={<UserDashboard canisterId={CANISTER_ID} idlFactory={idlFactory} />} />
        <Route path="/issue" element={<IssueCertificate canisterId={CANISTER_ID} idlFactory={idlFactory} />} />
        <Route path="/verify" element={<VerifyCertificate canisterId={CANISTER_ID} idlFactory={idlFactory} />} />
      </Routes>

      {/* <VerifyCertificate canisterId={CANISTER_ID} idlFactory={idlFactory} /> */}
      {/* <IssueCertificate canisterId={CANISTER_ID} idlFactory={idlFactory} /> */}
      {/* <UserDashboard canisterId={CANISTER_ID} idlFactory={idlFactory} /> */}
    </>

  );
}

export default App;
