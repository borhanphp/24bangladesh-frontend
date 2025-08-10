"use client";
import { useEffect } from "react";

const GoogleSearch = () => {
  useEffect(() => {
    // Load Google Custom Search script
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=006cb4e0046a047b4";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="https://cse.google.com/cse.js?cx=006cb4e0046a047b4"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="google-search-container my-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="search-box p-3 bg-light rounded shadow-sm">
              {/* <h4 className="text-center mb-3">সাইটে অনুসন্ধান করুন</h4> */}
              <div className="gcse-search"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleSearch; 