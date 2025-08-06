// components/LanguageSwitcher.jsx
"use client"; // This component must be a Client Component

import { useEffect } from "react";
import Script from "next/script";

const LanguageSwitcher = () => {
  const googleTranslateElementInit = () => {
    if (window.google && window.google.translate) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "bn", // Your original page language (Bengali)
          includedLanguages: "en,bn", // Languages you want to offer (English, Bengali)
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false, // Prevents the default Google Translate bar from showing
        },
        "google_translate_element" // The ID of the div where the widget would normally render (it will be hidden by CSS)
      );
    }
  };

  useEffect(() => {
    // Expose the initialization function globally for the Google Translate script
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Clean up when the component unmounts
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      {/* Load the Google Translate script */}
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        key="google-translate-script"
      />

      {/* This div is the target for the Google Translate widget. We'll hide its default UI with CSS. */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Your custom language selection buttons */}
      <div className="language-buttons">
        <button onClick={() => (window.location.href = "#googtrans(bn|en)")}>
          English
        </button>
        <button onClick={() => (window.location.href = "#googtrans(bn|bn)")}>
          বাংলা
        </button>
      </div>

      {/* Global styles to hide the default Google Translate UI */}
      <style jsx global>{`
        /* Hide the default Google Translate banner and dropdown */
        .goog-te-banner-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmCD {
          display: none !important;
        }
        body {
          top: 0px !important; /* Resets the body top margin added by Google Translate */
        }
        /* Optional: Hide Google Translate's highlight on translated text */
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }
        /* Style for your custom buttons */
        .language-buttons {
          display: flex;
          gap: 10px; /* Space between buttons */
          align-items: center;
        }
        .language-buttons button {
          padding: 8px 15px;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          cursor: pointer;
          border-radius: 5px;
          font-weight: 500;
          color: #333;
          transition: background-color 0.2s ease;
        }
        .language-buttons button:hover {
          background-color: #e0e0e0;
        }
      `}</style>
    </>
  );
};

export default LanguageSwitcher;
