"use client";
import ForthNewsCard from "@/ChildComponents/ForthNewsCard";
import Link from "next/link";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import React, { useState } from "react";
import ads from "../../public/image/googleAds.png";
import { IMAGE_URL } from "@/api/config";
import { useNewsStore } from "@/providers/useNewsStore";

function TabSection(data) {
  const [tab, setTab] = useState(1);
  const { allNews } = useNewsStore();

  // Get popular news from the store by visitor count
  const viewPopularNews = allNews
    .filter((news) => news.visitor && news.visitor > 0)
    .sort((a, b) => (b.visitor || 0) - (a.visitor || 0))
    .slice(0, 10);

  const tabAllNews =
    Array.isArray(data?.data) && data.data.length > 0 ? data.data : null;

  console.log("allNews", tabAllNews);


  const tabCounter = (e) => {
    setTab(e);
  };
  return (
    <div>
      <div className="text-center mb-3 buttton-update vertical-bottom">
        <button
          className={tab === 1 && `border-bottom border-secondary border-2`}
          onClick={() => tabCounter(1)}
        >
          সর্বশেষ{" "}
        </button>
        <button
          className={tab === 2 && `border-bottom border-secondary border-2`}
          onClick={() => tabCounter(2)}
        >
          জনপ্রিয়{" "}
        </button>
      </div>
      {tab === 1 && (
        <div>
          {Array.isArray(tabAllNews) &&
            tabAllNews.length > 3 &&
            tabAllNews.slice(1, 5).map((e, index, arr) => (
              <div key={e._id} className="vertical-bottom">
                <div className="vertical-bottom">
                  <ThirdNewsCard
                    title={e.title}
                    imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                    link={e.postId ? `/${e.postId}` : "#"}
                  />
                </div>
              </div>
            ))}

          <div className=" text-center">
            <Link href="/latest-news/">
              <button className="search-button">আরো</button>
            </Link>
          </div>
        </div>
      )}
      {tab === 2 && (
        <div>
          {Array.isArray(viewPopularNews) &&
            viewPopularNews.length > 3 &&
            viewPopularNews.slice(1, 5).map((e, index, arr) => (
              <div key={e._id} className="vertical-bottom">
                <div className="vertical-bottom">
                  <ThirdNewsCard
                    title={e.title}
                    imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                    link={e.postId ? `/${e.postId}` : "#"}
                  />
                </div>
              </div>
            ))}

          <div className=" text-center">
            <Link href={tab === 1 ? `/latest-news/` : `/popular-bangla-news/`}>
              <button className="search-button">আরো</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default TabSection;
