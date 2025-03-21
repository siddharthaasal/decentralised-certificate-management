const BackgroundWrapper = ({ children }) => {
    return (
        <div className="relative min-h-screen">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-white -z-10"></div>

            {/* Content */}
            <div className="relative">{children}</div>
        </div>
    );
};

export default BackgroundWrapper;
