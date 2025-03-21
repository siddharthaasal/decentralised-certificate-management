import { motion } from "framer-motion";
import { Shield, Scroll, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Shield,
            title: "Secure Verification",
            description: "Ensure authenticity with blockchain-based certificates.",
        },
        {
            icon: Scroll,
            title: "NFT Certificates",
            description: "Unique, non-transferable certificates for your achievements.",
        },
        {
            icon: User,
            title: "Digital Identity",
            description: "Build a verifiable digital identity for a trusted ecosystem.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center">
            <div className="container px-4 py-16 mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-4 px-4 py-1.5 bg-slate-900 text-white text-sm rounded-full"
                    >
                        Secure & Verified
                    </motion.div>
                    <h1 className="text-5xl font-bold mb-6 tracking-tight">
                        Manage & Verify Certificates Seamlessly
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                        A blockchain-powered platform to issue, manage, and verify certificates with ease.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/navigate")}
                        className="px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                    >
                        Get Started
                    </motion.button>
                </motion.div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 py-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white shadow-lg rounded-xl p-6 border border-slate-300 hover:shadow-2xl transition-transform transform hover:scale-105"
                        >
                            <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center mb-4">
                                {React.createElement(feature.icon, { size: 24 })}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-slate-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
