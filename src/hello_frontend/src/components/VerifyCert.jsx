import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createActor } from "../utils/actor"; // Utility to create an authenticated actor

const VerifyCertificate = ({ canisterId, idlFactory }) => {
    const [certificateId, setCertificateId] = useState("");
    const [verificationResult, setVerificationResult] = useState(null);
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

    // Function to verify a certificate
    const handleVerifyCertificate = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!actor) {
                toast.error("Actor is not initialized. Please reload the page.");
                setIsLoading(false);
                return;
            }

            console.log("Verifying Certificate ID:", certificateId);
            const isValid = await actor.verifyCertificate(certificateId);

            setVerificationResult(isValid);
            toast.success(isValid ? "Certificate is valid!" : "Certificate is invalid.");
        } catch (error) {
            toast.error("Error verifying certificate. Check console for details.");
            console.error("Verify Certificate Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Verify Certificate
                </h2>

                <form onSubmit={handleVerifyCertificate} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">User ID</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            value={certificateId}
                            onChange={(e) => setCertificateId(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                    >
                        {isLoading ? "Verifying..." : "Verify User"}
                    </button>
                </form>

                {verificationResult !== null && (
                    <p className="text-center text-lg font-semibold mt-4">
                        {verificationResult ? "✅ Certificate is valid!" : "❌ Certificate is invalid!"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerifyCertificate;
