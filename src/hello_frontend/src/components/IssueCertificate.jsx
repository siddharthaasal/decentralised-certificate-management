import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createActor } from "../utils/actor"; // Utility to create an authenticated actor
import { Principal } from "@dfinity/principal";

const IssueCertificate = ({ canisterId, idlFactory }) => {
    const [recipientPrincipal, setRecipientPrincipal] = useState("");
    const [recipientName, setRecipientName] = useState("");
    const [ipfsHash, setIpfsHash] = useState("");
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
        connectPlug(); // Ensure Plug is connected when the component mounts
    }, []);

    // Function to issue a certificate

    const handleIssueCertificate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!actor) {
                toast.error("Actor is not initialized. Please reload the page.");
                setIsLoading(false);
                return;
            }

            if (!recipientPrincipal) {
                toast.error("Recipient Principal ID is required!");
                setIsLoading(false);
                return;
            }

            // Check if Principal format is valid
            let principalObj;
            try {
                principalObj = Principal.fromText(recipientPrincipal.trim());
            } catch (err) {
                toast.error("Invalid Principal ID format. Ensure it follows the correct structure.");
                setIsLoading(false);
                return;
            }

            console.log("Issuing Certificate for:", recipientName, principalObj.toString(), ipfsHash);
            const response = await actor.issueCertificate(recipientName, principalObj, ipfsHash);

            toast.success("Certificate Issued Successfully!");
            console.log("Certificate Issued:", response);
        } catch (error) {
            toast.error("Error Issuing Certificate. Check console for details.");
            console.error("Issue Certificate Error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Issue Certificate
                </h2>

                <form onSubmit={handleIssueCertificate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Recipient Principal ID</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            value={recipientPrincipal}
                            onChange={(e) => setRecipientPrincipal(e.target.value.trim())}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">IPFS Hash</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            value={ipfsHash}
                            onChange={(e) => setIpfsHash(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 border rounded-md bg-green-600 text-white"
                    >
                        {isLoading ? "Issuing..." : "Issue Certificate"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IssueCertificate;


