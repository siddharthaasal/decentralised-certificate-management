import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createActor } from "../utils/actor";
import { Principal } from "@dfinity/principal";

const VerifyCertificate = ({ canisterId, idlFactory }) => {
    const [userPrincipal, setUserPrincipal] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [verificationResults, setVerificationResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [actor, setActor] = useState(null);

    // Function to connect Plug Wallet and create an authenticated actor
    const connectPlug = async () => {
        if (!window.ic || !window.ic.plug) {
            toast.error("Plug Wallet not available. Please install it.");
            return;
        }

        try {
            // Request connection if not already connected
            const isConnected = await window.ic.plug.isConnected();
            if (!isConnected) {
                await window.ic.plug.requestConnect();
            }

            // Ensure the Plug agent is properly initialized
            await window.ic.plug.createAgent({ host: "https://icp0.io" });

            // Retrieve the authenticated identity (Principal)
            const principal = await window.ic.plug.agent.getPrincipal();

            // Create an actor using Plug’s identity
            const authenticatedActor = createActor(canisterId, idlFactory);
            setActor(authenticatedActor);

            toast.success(`Connected to Plug Wallet! Principal: ${principal.toText()}`);
        } catch (error) {
            toast.error("Failed to connect to Plug Wallet.");
            console.error("Plug Wallet Connection Error:", error);
        }
    };

    useEffect(() => {
        connectPlug();
    }, []);

    // Function to fetch user's certificates
    const fetchCertificates = async () => {
        if (!actor) {
            toast.error("Actor is not initialized. Please reload the page.");
            return;
        }

        try {
            setIsLoading(true);

            // Validate Principal format
            let principalObj;
            try {
                principalObj = Principal.fromText(userPrincipal.trim());
            } catch (err) {
                toast.error("Invalid Principal ID format.");
                setIsLoading(false);
                return;
            }

            console.log("Fetching certificates for:", principalObj.toString());
            const userCertificates = await actor.getCertificatesForUser(principalObj);

            if (userCertificates.length === 0) {
                toast.info("No certificates found for this user.");
                setCertificates([]);
                setIsLoading(false);
                return;
            }

            setCertificates(userCertificates.reverse());
            toast.success(`Fetched ${userCertificates.length} certificates!`);

            // Verify each certificate
            const results = {};
            for (const cert of userCertificates) {
                try {
                    const isValid = await actor.verifyCertificate(cert.id);
                    results[cert.id] = isValid;
                } catch (err) {
                    console.error(`Verification failed for Certificate ID ${cert.id}:`, err);
                    results[cert.id] = false;
                }
            }

            setVerificationResults(results);
        } catch (error) {
            toast.error("Error fetching certificates.");
            console.error("Fetch Certificates Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Verify Certificates
                </h2>

                <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        User Principal ID
                    </label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        value={userPrincipal}
                        onChange={(e) => setUserPrincipal(e.target.value)}
                    />
                    <button
                        onClick={fetchCertificates}
                        disabled={isLoading}
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors w-full"
                    >
                        {isLoading ? "Fetching..." : "Fetch & Verify Certificates"}
                    </button>
                </div>

                {/* Display certificates and verification status */}
                {certificates.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Certificates</h3>
                        <ul className="mt-2 space-y-2">
                            {certificates.map((cert) => (
                                <li
                                    key={cert.id}
                                    className="p-3 border rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <p className="text-sm text-gray-600">Name: {cert.name}</p>
                                        <a
                                            className="text-sm font-medium"
                                            href={`https://turquoise-secret-xerinae-597.mypinata.cloud/ipfs/${cert.ipfsHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View
                                        </a>

                                    </div>
                                    <p className="text-lg font-bold">
                                        {verificationResults[cert.id] === undefined
                                            ? "⏳"
                                            : "✅ Valid"
                                        }
                                    </p>
                                    {/* <p className="text-lg font-bold">
                                        {verificationResults[cert.id] === undefined
                                            ? "⏳"
                                            : verificationResults[cert.id]
                                                ? "✅ Valid"
                                                : "❌ Invalid"}
                                    </p> */}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyCertificate;
