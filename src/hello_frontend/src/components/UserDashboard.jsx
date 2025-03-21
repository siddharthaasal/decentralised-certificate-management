import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../utils/actor";
import { Principal } from "@dfinity/principal";

const UserDashboard = ({ canisterId, idlFactory }) => {
    const [userPrincipal, setUserPrincipal] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [actor, setActor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Connect Plug Wallet and Fetch User Data
    const connectPlug = async () => {
        if (!window.ic || !window.ic.plug) {
            toast.error("Plug Wallet not available. Please install it.");
            return;
        }

        try {
            const isConnected = await window.ic.plug.isConnected();
            if (!isConnected) {
                await window.ic.plug.requestConnect();
            }

            await window.ic.plug.createAgent({ host: "https://icp0.io" });

            const principal = await window.ic.plug.agent.getPrincipal();
            setUserPrincipal(principal.toText());

            const authenticatedActor = createActor(canisterId, idlFactory);
            setActor(authenticatedActor);

            toast.success(`Connected! Principal: ${principal.toText()}`);
        } catch (error) {
            toast.error("Failed to connect to Plug Wallet.");
            console.error("Plug Wallet Connection Error:", error);
        }
    };

    // Fetch user certificates
    const fetchCertificates = async () => {
        if (!actor) return;

        try {
            const certs = await actor.getCertificatesForUser(Principal.fromText(userPrincipal));
            setCertificates(certs);
            toast.success("Certificates loaded successfully!");
        } catch (error) {
            toast.error("Error fetching certificates.");
            console.error("Fetch Certificates Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        connectPlug();
    }, []);

    useEffect(() => {
        if (actor && userPrincipal) {
            fetchCertificates();
        }
    }, [actor, userPrincipal]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-3xl w-full">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">User Dashboard</h2>

                <div className="mt-4 p-4 border rounded-lg bg-white shadow">
                    <h3 className="text-lg font-semibold">User Info</h3>
                    <p><strong>Principal ID:</strong> {userPrincipal || "Not connected"}</p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Issued Certificates</h3>
                    {isLoading ? (
                        <p>Loading certificates...</p>
                    ) : certificates.length > 0 ? (
                        <ul className="space-y-4">
                            {certificates.map((cert, index) => (
                                <li key={index} className="p-4 border rounded-md bg-white shadow">
                                    <p><strong>Name:</strong> {cert.name}</p>
                                    <p><strong>IPFS Hash:</strong> {cert.ipfsHash}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No certificates found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
