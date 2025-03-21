import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../utils/actor";
import { Principal } from "@dfinity/principal";
import { motion } from "framer-motion";

const UserDashboard = ({ canisterId, idlFactory }) => {
    const [userPrincipal, setUserPrincipal] = useState("");
    const [certificates, setCertificates] = useState([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [actor, setActor] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        <div className="h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
            <div className="max-w-6xl w-full mx-auto bg-white bg-opacity-90 backdrop-blur-xl rounded-lg shadow-lg p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl font-bold text-slate-900 drop-shadow-xl"
                    >
                        User Dashboard
                    </motion.h2>
                </div>

                {/* User Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 bg-white shadow-md rounded-md border border-slate-300"
                >
                    <h3 className="text-3xl font-semibold text-slate-900">User Info</h3>
                    <p className="text-slate-600 mt-2 text-lg">
                        <strong>Principal ID:</strong> {userPrincipal || "Not connected"}
                    </p>
                </motion.div>

                {/* Issued Certificates */}
                <div className="mt-10">
                    <motion.h3
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl font-semibold text-slate-900 drop-shadow-lg mb-6"
                    >
                        Issued Certificates
                    </motion.h3>

                    {/* Certificates List */}
                    <div className="max-h-[500px] overflow-y-auto">
                        {isLoading ? (
                            <p className="text-slate-600 text-xl">Loading certificates...</p>
                        ) : certificates.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {certificates.slice(0, visibleCount).map((cert, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className="p-6 bg-white shadow-md rounded-md border border-slate-300 hover:shadow-xl transition-all cursor-pointer"
                                    >
                                        <h4 className="text-2xl font-semibold text-slate-900">{cert.name}</h4>
                                        <p className="text-slate-600 mt-2">
                                            <strong>IPFS Hash:</strong> {cert.ipfsHash}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center py-12 bg-white shadow-md rounded-md border border-slate-300"
                            >
                                <p className="text-2xl font-semibold text-slate-900">No Certificates Yet</p>
                                <p className="text-slate-600 mt-2">Your earned certificates will appear here</p>
                            </motion.div>
                        )}
                    </div>

                    {/* Load More Button */}
                    {certificates.length > visibleCount && (
                        <div className="text-center mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                onClick={() => setVisibleCount(certificates.length)}
                            >
                                Load All Certificates
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default UserDashboard;