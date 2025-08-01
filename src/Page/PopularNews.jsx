"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAllPopularNews } from "@/api/news";
import { IMAGE_URL } from "@/api/config";
import AdsComponents from "@/ChildComponents/AdsComponents";
import LatestNewsCard from "@/ChildComponents/LatestNewsCard";
import LatestTitle from "@/ChildComponents/LatetestTitle copy";
// image
import ads from "../../public/image/googleAds.png";

function PopularNews() {
  const [limit, setLimit] = useState(12);

  const {
    data: popularNews,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["popular-all-news", limit],
    queryFn: () => useAllPopularNews(limit),
    keepPreviousData: true,
  });

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

  const loadMoreNews = () => {
    setLimit((prev) => prev + 5);
  };

  if (error) return <div>Error loading news.</div>;

  return (
    <div className="container ">
      <LatestTitle
        title="আজকের জনপ্রিয় খবর
"
      />
      <div className="row">
        <div className="col-sm-12 col-md-8 horizontal-right">
          <div className="p-2">
            {isLoading && <div>Loading news...</div>}

            {Array.isArray(popularNews?.news) &&
              popularNews.news.length > 0 &&
              popularNews.news.map((e) => (
                <div key={e._id} className="">
                  <LatestNewsCard
                    discription={e.discription}
                    imgSRC={e.image ? `${IMAGE_URL}/${e.image}` : ads}
                    title={e.title}
                    link={e.postId ? `/${e.postId}` : "#"}
                    date={formatBanglaDateWithAmPm(e.createdAt)}
                  />
                </div>
              ))}

            {/* Show loading more indicator only when fetching more */}
            {isFetching && !isLoading && (
              <div className="text-center my-2">
                {" "}
                <p>Loading more news...</p>
              </div>
            )}

            <div className="d-flex justify-content-center">
              <button
                onClick={loadMoreNews}
                className="search-button d-flex"
                disabled={isFetching}
              >
                আরো
              </button>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-4">
          <AdsComponents
            className="shadow-sm  img-fluid mb-3"
            image={ads}
            width="1300"
            height="80"
          />
          <AdsComponents
            className="shadow-sm  img-fluid mb-3"
            image={ads}
            width="1300"
            height="80"
          />
          <AdsComponents
            className="shadow-sm  img-fluid mb-3"
            image={ads}
            width="1300"
            height="80"
          />
        </div>
      </div>
    </div>
  );
}

export default PopularNews;
