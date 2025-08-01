import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";

import { BASE_URL } from "../api/config";

// header and Footer
import Header from "@/CommonComponents/Header";
import Footer from "@/CommonComponents/Footer";
// import GoogleTranslateLoader from "@/app/helper/GoogleTranslateLoader";
import LanguageSwitcher from "@/app/helper/LanguageSwitcher";
// providers
import Provider from "@/providers/index";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata = {
//   title: "24 Bangladesh",
//   description: "Most Popular News Portal in Bangladesh",
// };

export async function generateMetadata() {
  try {
    const res = await fetch(`${BASE_URL}/meta/web`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch metadata");
    }

    const data = await res.json();

    return {
      title: data?.data?.websiteTitle || "24 Bangladesh",
      description: data?.data?.tagLine || "Default Description",
      keywords: data?.data?.websiteTitle || "default, keywords",
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);

    return {
      title: "Fallback Title",
      description: "Fallback description if metadata fetch fails",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
          crossOrigin="true"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
          crossOrigin="true"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
          crossOrigin="true"
        />

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
          integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.maateen.me/adorsho-lipi/font.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        // className={` antialiased`}
      >
        {/* <GoogleTranslateLoader /> */}
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
