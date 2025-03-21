import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Principal } from "@dfinity/principal";
import { CertificateRegistry } from "../declarations/CertificateRegistry";

const Register = ({ identity }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        ipfsHash: "",
    });

    useEffect(() => {
        if (!identity) {
            toast.error("Please log in with Internet Identity");
        }
    }, [identity]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!identity) throw new Error("No Internet Identity found");

            const principal = identity.getPrincipal();
            const certId = await CertificateRegistry.issueCertificate(
                formData.name,
                principal,
                formData.ipfsHash
            );

            toast.success(`Certificate issued with ID: ${certId}`);
        } catch (error) {
            console.error("Error issuing certificate:", error);
            toast.error("Failed to issue certificate");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Issue a Certificate
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter recipient details to issue a blockchain-based certificate
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Recipient Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label htmlFor="ipfsHash" className="block text-sm font-medium text-gray-700">
                                IPFS Hash (Certificate Document)
                            </label>
                            <input
                                id="ipfsHash"
                                name="ipfsHash"
                                type="text"
                                required
                                className="appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                value={formData.ipfsHash}
                                onChange={(e) => setFormData({ ...formData, ipfsHash: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !identity}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                        {isLoading ? "Issuing Certificate..." : "Issue Certificate"}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
