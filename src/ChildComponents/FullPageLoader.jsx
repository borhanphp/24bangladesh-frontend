const FullPageLoader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-white position-fixed top-0 start-0"
      style={{ zIndex: 1050 }}
    >
      <div className="text-center">
        {/* SVG Logo with spinning circle */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          className="rotate-animation"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#007bff"
            strokeWidth="8"
            fill="none"
          />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fill="#333"
            fontSize="24"
            fontFamily="sans-serif"
          >
            24
          </text>
        </svg>
        {/* Logo text (you can style this to match your logo font) */}
        <div
          className="mt-3 fw-bold text-primary"
          style={{ fontSize: "20px", fontFamily: "Kalpurush, sans-serif" }}
        >
          বাংলাদেশ.নেট
        </div>
        <div className="text-secondary mt-1">Loading...</div>
      </div>

      <style jsx>{`
        .rotate-animation {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;
