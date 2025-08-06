"use client";
import { getLatestNews } from "@/api/news";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryLeadNews from "@/ChildComponents/CategoryLeadNews";
import CategoryTitle from "@/ChildComponents/CategoryTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import AdsComponents from "@/ChildComponents/AdsComponents";
import { IMAGE_URL, BASE_URL } from "@/api/config";
import ads from "../../public/image/googleAds.png";

function CategoryPage(data) {
  console.log(data);
  const { category, posts: initialPosts, topics } = data?.data || {};
  const [posts, setPosts] = useState(initialPosts || []);
  const [limit, setLimit] = useState(11); // already loaded
  const [loading, setLoading] = useState(false);

  // last news
  const {
    data: latestNews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-news"],
    queryFn: getLatestNews,
  });

  const loadMorePosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${BASE_URL}/news/web/category/${category?.categorySlug}?limit=${
          limit + 10
        }`
      );
      const result = await res.json();
      setPosts(result.posts);
      setLimit(limit + 10);
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <CategoryTitle
        title={category?.name}
        subnav={topics?.map((topic) => ({
          name: topic.name,
          slug: topic.topicSlug,
        }))}
      />

      <div className="my-3">
        <div className="row">
          <div className="col-sm-12 col-md-9 horizontal-right">
            <div className="p-2 vertical-bottom">
              <CategoryLeadNews
                link={posts?.[0]?.postId ? `/${posts?.[0]?.postId}` : "#"}
                title={posts?.[0]?.title}
                discription={posts?.[0]?.discription}
                imgSRC={
                  posts?.[0]?.image ? `${IMAGE_URL}/${posts?.[0].image}` : ads
                }
              />
            </div>

            <div className="row">
              {Array.isArray(posts) &&
                posts.length > 1 &&
                posts.slice(1).map((e, index, arr) => (
                  <div key={e._id} className="col-sm-6">
                    <div
                      className={`pb-2 vertical-bottom ${
                        index === arr.length - 1 ? "" : "horizontal-right"
                      }`}
                    >
                      <ThirdNewsCard
                        link={e.postId ? `/${e.postId}` : "#"}
                        title={e.title}
                        imgSRC={e.image ? `${IMAGE_URL}/${e.image}` : ads}
                      />
                    </div>
                  </div>
                ))}
              <div className="d-flex my-5 justify-content-center">
                <button
                  className="search-button d-flex"
                  onClick={loadMorePosts}
                  disabled={loading}
                >
                  {loading ? "লোড হচ্ছে..." : "আরো"}
                </button>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-md-3">
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
                      index === arr.length - 1 ? "" : "vertical-bottom "
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
    </div>
  );
}

export default CategoryPage;
