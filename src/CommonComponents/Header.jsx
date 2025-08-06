"use client";
import React, { useState } from "react";
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
  const [hoveredCatId, setHoveredCatId] = useState(null);
  const topMenu = data?.navigation?.find((m) => m.idNumber === "1");

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

  return (
    <>
            <div className="container-fluid">
        <div className="d-flex flex-row justify-content-between mb-2">
          
          {/* Logo */}
          <div className="d-flex align-items-center">
            <div className="my-3 d-flex justify-content-center align-items-center">
              {/* logo */}
              <Link className="my-2" href="/">
                <Image
                  // src={LogoImage}
                  src={`${IMAGE_URL}/${viewMetaData?.logo}`}
                  width={380}
                  height={80}
                  alt="Logo"
                  className="pointer"
                  style={{ width: '80px', height: '80px' }}
                />
              </Link>
            </div>
          </div>

          <div className="d-flex flex-column justify-content-between align-items-end mt-4">
                         {/* Desktop: Social Icons and Links Side by Side */}
             <div className="d-none d-md-flex mt-3 mt-md-5 pt-2 flex-column flex-md-row align-items-center gap-3">
               <SocialIcon
                 search={true}
                 facebook={!!viewMetaData?.facebook}
                 whatsapp={!!viewMetaData?.whatsapp}
                 twitter={!!viewMetaData?.twitterX}
                 instagram={!!viewMetaData?.instagram}
                 linkedin={!!viewMetaData?.linkedin}
                 youtube={!!viewMetaData?.youtube}
                 links={viewMetaData}
               />

               <div className="d-none d-md-block vr"></div>

               <div className="d-flex gap-2">
                 <Link href="/" className="text-decoration-none text-muted">
                   আর্কাইভ
                 </Link>
                 <Link href="/" className="text-decoration-none text-muted">
                   English
                 </Link>
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
                 links={viewMetaData}
               />
               
               <div className="d-flex gap-2">
                 <Link href="/" className="text-decoration-none text-muted small">
                   আর্কাইভ
                 </Link>
                 <Link href="/" className="text-decoration-none text-muted small">
                   English
                 </Link>
               </div>
               
               <div className="text-end small">
                 {finalDate}
               </div>
             </div>

                         {/* Desktop: Date */}
             <div className="d-none d-md-flex align-items-center justify-content-center justify-content-md-end text-center text-md-end mt-2 mt-md-0">
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
                  href="/latest-news"
                >
                  সর্বশেষ
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
