"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLatestNews } from "@/api/news";
import AdsComponents from "@/ChildComponents/AdsComponents";
import CategoryTitle from "@/ChildComponents/CategoryTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import TopicNewsCard from "@/ChildComponents/TopicNewsCard";
import TopicTitle from "@/ChildComponents/TopicTitle";

// image
import ads from "../../public/image/googleAds.png";
import { IMAGE_URL } from "@/api/config";

function TopicPage(data) {
  const { news, topic } = data?.data;

  const {
    data: latestNews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-news"],
    queryFn: getLatestNews,
  });

  // ✅ State for controlling visible news
  const [visibleCount, setVisibleCount] = useState(6);

  // ✅ Format Bangla Date with AM/PM
  function formatBanglaDateWithAmPm(dateString) {
    const date = new Date(dateString);
    const optionsDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const optionsTime = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const banglaDate = date.toLocaleDateString("bn-BD", optionsDate);
    const timeString = date.toLocaleTimeString("en-US", optionsTime);
    return `${banglaDate} | ${timeString}`;
  }

  // ✅ Load More Handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="container my-5">
      <TopicTitle name={topic?.name} description={topic?.details} />

      <div className="row my-4">
        {/* Main News Section */}
        <div className="col-sm-12 col-md-8 horizontal-right">
          <div className="p-2">
            {Array.isArray(news) &&
              news.slice(0, visibleCount).map((e) => (
                <div key={e._id} className="horizontal-right">
                  <TopicNewsCard
                    link={e.postId ? `/${e.postId}` : "#"}
                    imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                    title={e.title}
                    date={formatBanglaDateWithAmPm(e.createdAt)}
                  />
                </div>
              ))}
          </div>

          {/* Load More Button */}
          {visibleCount < news.length && (
            <div className="d-flex justify-content-center">
              <button className="search-button d-flex" onClick={handleLoadMore}>
                আরো
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="col-sm-12 col-md-4">
          <div className="vertical-bottom pb-3">
            <AdsComponents
              className="img-fluid"
              image={ads}
              width="500"
              height="200"
            />
          </div>

          <div className="my-3">
            <CategoryTitle title="সর্বশেষ" />
            {Array.isArray(latestNews?.news) &&
              latestNews?.news?.length > 0 &&
              latestNews?.news.slice(0, 5).map((e, index, arr) => (
                <div
                  key={e._id}
                  className={`pb-2 vertical-bottom ${
                    index === arr.length - 1 ? "" : "vertical-bottom"
                  }`}
                >
                  <ThirdNewsCard
                    link={e.postId ? `/${e.postId}` : "#"}
                    title={e.title}
                    imgSRC={e.image ? `${IMAGE_URL}/${e.image}` : ads}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
