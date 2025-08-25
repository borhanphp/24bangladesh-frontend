"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useMenus from "@/providers/useMenus";
import useMeta from "@/providers/useMeta";
import useLiveNews from "@/providers/useLiveNews";
// icon
import { MdOutlineDarkMode } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import SiteVarNav from "@/ChildComponents/SiteVarNav";
import GoogleSearch from "@/Components/GoogleSearch";

import LogoImage from "../../public/image/logoFinal.jpg";

import Calendar from "date-bengali-revised";
import SocialIcon from "@/ChildComponents/SocialIcon";
import { IMAGE_URL } from "@/api/config";

const englishToBanglaNumbers = (num) => {
  const bnNums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((d) => bnNums[parseInt(d)] || d)
    .join("");
};

function Header() {
  const { data, isLoading, error } = useMenus();
  const { data: liveNewsData } = useLiveNews();
  const { data: metaData } = useMeta();
  const viewMetaData = metaData?.data;
  console.log(viewMetaData);

  const liveNews = liveNewsData?.news || [];

  const today = new Date();

  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [hoveredCatId, setHoveredCatId] = useState(null);
  const topMenu = data?.navigation?.find((m) => m.idNumber === "1");
  const searchRef = useRef(null);

  const setGoogleTranslateLanguage = (fromLang, toLang) => {
    try {
      const domain = window.location.hostname;
      const cookieValue = `/${fromLang}/${toLang}`;
      // Set cookies for both root and current domain to be safe
      document.cookie = `googtrans=${cookieValue};path=/;`; // root
      document.cookie = `googtrans=${cookieValue};path=/;domain=.${domain}`; // domain
      // Update hash so the script picks it up
      window.location.hash = `#googtrans(${fromLang}|${toLang})`;
      // If translator is already loaded, reload ensures full-page application
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (e) {
      console.error("Failed to switch language via Google Translate", e);
    }
  };

  const onEnglishClick = (e) => {
    e.preventDefault();
    setGoogleTranslateLanguage("bn", "en");
  };

  // Using date-bengali-revised to get Bangla date
  const cal = new Calendar();
  cal.fromDate(today);

  // Format Bangla date: যেমন "বৃহস্পতিবার, ১২ আষাঢ়, ১৪৩২ বঙ্গাব্দ"
  const banglaDayMonth = cal.format("dddd, D MMMM"); // দিন, তারিখ মাস
  const banglaYear = cal.year; // বাংলা সাল (সংখ্যা)

  // বাংলা বছর সংখ্যাটিকে বাংলা ডিজিটে রূপান্তর
  const banglaYearBn = englishToBanglaNumbers(banglaYear);

  const banglaDateStr = `${banglaDayMonth}, ${banglaYearBn} বঙ্গাব্দ`;

  // ইংরেজি তারিখ ফরম্যাট
  const engDateStr = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(today);

  const finalDate = `${banglaDateStr} / ${engDateStr}`;

  const off = () => {
    setShowNav(!showNav);
  };

  const translateToEnglish = () => {
    let retries = 0;
    const maxRetries = 15;

    const attempt = () => {
      const iframe = document.querySelector("iframe.goog-te-menu-frame");
      if (!iframe) {
        if (retries < maxRetries) {
          retries++;
          setTimeout(attempt, 500);
        } else {
          alert("Google Translate failed to load. Please try again later.");
        }
        return;
      }

      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
      const englishOption = iframeDoc?.querySelector('a[href*="en"]');
      if (englishOption) {
        englishOption.click();
      } else {
        alert("English option not found.");
      }
    };

    attempt();
  };

  // Hide search bar when clicking outside or pressing Escape
  useEffect(() => {
    if (!showSearch) return;

    const handleOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowSearch(false);
    };

    document.addEventListener("mousedown", handleOutside, true);
    document.addEventListener("touchstart", handleOutside, true);
    document.addEventListener("keydown", handleEsc, true);

    return () => {
      document.removeEventListener("mousedown", handleOutside, true);
      document.removeEventListener("touchstart", handleOutside, true);
      document.removeEventListener("keydown", handleEsc, true);
    };
  }, [showSearch]);

  return (
    <>
            <div className="container-fluid">
        <div className="d-flex flex-row justify-content-between">
          
          {/* Logo */}
          <div className="d-flex align-items-center">
            <div className="d-flex justify-content-center align-items-center">
              {/* logo */}
              <Link className="" href="/">
                <Image
                  // src={LogoImage}
                  src={`${IMAGE_URL}/${viewMetaData?.logo}`}
                  width={100}
                  height={100}
                  alt="Logo"
                  className="pointer"
                  style={{ width: '170px', height: '170px' }}
                />
              </Link>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-end">
                         {/* Desktop: Social Icons and Links Side by Side */}
             <div className="d-none d-md-flex mt-3 mt-md-5 flex-column flex-md-row align-items-center gap-3">
               <SocialIcon
                 search={true}
                 facebook={!!viewMetaData?.facebook}
                 whatsapp={!!viewMetaData?.whatsapp}
                 twitter={!!viewMetaData?.twitterX}
                 instagram={!!viewMetaData?.instagram}
                 linkedin={!!viewMetaData?.linkedin}
                 youtube={!!viewMetaData?.youtube}
                 onSearchClick={() => setShowSearch((s) => !s)}
                 links={viewMetaData}
               />

               <div className="d-none d-md-block vr"></div>

               <div className="d-flex gap-2 rounded-3">
                 <Link href="/archive" className="p-1 rounded-3 border border-black text-decoration-none text-muted">
                   আর্কাইভ
                 </Link>
                 <a href="#" onClick={onEnglishClick} className="p-1 rounded-3 border border-black text-decoration-none text-muted">
                   English
                 </a>
               </div>
             </div>

                         {/* Mobile: Social Icons and Date in same div */}
              <div className="d-flex d-md-none flex-column align-items-end gap-2">
               <SocialIcon
                 search={true}
                 facebook={!!viewMetaData?.facebook}
                 whatsapp={!!viewMetaData?.whatsapp}
                 twitter={!!viewMetaData?.twitterX}
                 instagram={!!viewMetaData?.instagram}
                 linkedin={!!viewMetaData?.linkedin}
                 youtube={!!viewMetaData?.youtube}
                 onSearchClick={() => setShowSearch((s) => !s)}
                 links={viewMetaData}
               />
               
               <div className="d-flex gap-2">
                 <Link href="/archive" className="text-decoration-none text-muted small">
                   আর্কাইভ
                 </Link>
                 <a href="#" onClick={onEnglishClick} className="text-decoration-none text-muted small">
                   English
                 </a>
               </div>
               
               <div className="text-end small">
                 {finalDate}
               </div>
             </div>

                         {/* Desktop: Date */}
             <div className="d-none d-md-flex align-items-center justify-content-center justify-content-md-end text-center text-md-end mt-1 mt-md-0">
             {finalDate}
           </div>
          </div>
        </div>
      </div>
      {/* nav */}
      <div className="header sticky-top">
        <div className="d-flex justify-content-end gap-2">
          {/* <Link href="/search" className="btn text-white fs-4">
            <FaSearch />
          </Link> */}
          <button className="btn text-white fs-3 mobile-nav-show" onClick={off}>
            <IoMdMenu />
          </button>
        </div>
        <div className="container mobile-nav-hide">
          {/* nav */}
          <nav className="navbar navbar-expand-lg">
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link
                  className="nav-link nav-hover fw-bold mx-2 text-nowrap"
                  href="/"
                >
                  প্রচ্ছদ
                </Link>
              </li>
              {topMenu?.categories
                ?.sort((a, b) => a.order - b.order)
                ?.map((cat) => (
                  <li
                    key={cat._id}
                    className="nav-item position-relative"
                    onMouseEnter={() => setHoveredCatId(cat._id)}
                    onMouseLeave={() => setHoveredCatId(null)}
                  >
                    <Link
                      className="nav-link fw-bold nav-hover mx-2 text-nowrap"
                      href={`/category/${cat.categorySlug}`}
                    >
                      {cat.name}
                    </Link>

                    {cat.subCategories?.length > 0 &&
                      hoveredCatId === cat._id && (
                        <ul
                          className="submenu position-absolute bg-white shadow rounded p-2"
                          style={{
                            top: "100%",
                            left: 0,
                            zIndex: 1000,
                            display: "flex",
                            flexDirection: "column",
                            margin: 0,
                            padding: 0,
                          }}
                          onClick={(e) => e.stopPropagation()}
                          onMouseLeave={() => setHoveredCatId(null)}
                        >
                          {cat.subCategories.map((subCat) => (
                            <li
                              key={subCat._id}
                              className="nav-item"
                              style={{
                                listStyle: "none",
                                margin: 0,
                                padding: 0,
                              }}
                            >
                              <Link
                                href={`/category/${subCat.categorySlug}`}
                                className="nav-link dropdown-item text-dark fw-medium"
                              >
                                {subCat.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
            </ul>
          </nav>
        </div>
        {showNav && <SiteVarNav off={() => setShowNav(false)} />}
        {/* Inline search bar below navbar */}
        <div ref={searchRef} className={`w-100 bg-white border-top ${showSearch ? "d-block" : "d-none"}`} style={{ zIndex: 1500 }}>
          <div className="container py-3" onClick={(e) => e.stopPropagation()}>
            <GoogleSearch />
          </div>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-text">
          আজকের শিরোনাম:
          {liveNews?.map((item, index) => (
            <span className="mx-4 text-dark" key={item.postId}>
              <span className="live-beep" />{" "}
              <Link
                href={`/${item.postId}`}
                className="text-dark hover:underline"
              >
                {item.title}
              </Link>
              {index !== liveNews.length - 1 && " "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
