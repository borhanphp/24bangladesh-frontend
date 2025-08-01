"use client";
import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    // Already loaded?
    if (window.google?.translate?.TranslateElement) return;

    // Define callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "bn",
          includedLanguages: "en,bn",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Add the script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => {
      console.error("Google Translate script failed to load.");
    };
    document.body.appendChild(script);
  }, []);

  return <div id="google_translate_element" style={{ display: "none" }} />;
}
