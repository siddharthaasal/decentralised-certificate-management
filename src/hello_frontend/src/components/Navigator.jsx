import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
    const navigate = useNavigate();

    const sections = [
        { title: "User Dashboard", route: "/user" },
        { title: "Issue Certificate", route: "/issue" },
        { title: "Verify Certificate", route: "/verify" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-6">

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mb-12"
            >
                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="inline-block px-4 py-1.5 bg-slate-900 text-white text-sm rounded-full"
                >
                    Built on ICP
                </motion.div>
                <h1 className="text-5xl font-bold mt-4 text-slate-900">
                    A Smarter Way to Manage Digital Credentials
                </h1>
                <p className="text-lg text-slate-600 mt-4 mb-8">
                    Issue, store, and verify digital records with complete trust.
                </p>
            </motion.div>

            {/* Navigation Cards */}
            <div className="mt-8">
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-24">
                    {sections.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="cursor-pointer bg-white shadow-lg rounded-xl p-6 text-center border border-slate-300 hover:shadow-2xl transition"
                            onClick={() => navigate(section.route)}
                        >
                            <h3 className="text-2xl font-semibold text-slate-900">{section.title}</h3>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Additional Information */}
            {/* <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="max-w-4xl text-center mt-16 p-6 bg-white rounded-xl shadow-md border border-slate-300"
            >
                <h2 className="text-3xl font-semibold text-slate-900">Built for Security & Trust</h2>
                <p className="text-slate-600 mt-4">
                    Traditional record-keeping is prone to errors and fraud. Our system ensures
                    <span className="text-slate-900 font-medium"> authenticity, security, and seamless verification.</span>
                </p>
            </motion.div> */}

        </div>
    );
};

export default Navigator;
