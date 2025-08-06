import ForthNewsCard from "@/ChildComponents/ForthNewsCard";
import SectionTitle from "@/ChildComponents/SectionTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import AdsComponents from "@/ChildComponents/AdsComponents";
import React from "react";
import TabSection from "../TabSection";
import { IMAGE_URL } from "@/api/config";
import ads from "../../../public/image/googleAds.png";
function SectionThree({ data, title }) {
  const allNews = Array.isArray(data) ? data : [];
  const topNews = allNews?.[0];
  console.log("section 3", allNews);
  return (
    <div className="my-3">
      <div className="row">
        <SectionTitle title={title} />
        <div className="col-sm-12 col-md-8 col-xl-9 horizontal-right">
          <div className="row">
            <div className="col-sm-6">
              <ForthNewsCard
                imgSRC={topNews?.image ? `${IMAGE_URL}/${topNews.image}` : ads}
                title={topNews?.title}
                discription={topNews?.discription}
                link={topNews?.postId ? `/${topNews?.postId}` : "#"}
              />
            </div>
            <div className="col-sm-6">
              {Array.isArray(allNews) &&
                allNews.length > 3 &&
                allNews.slice(1, 4).map((e, index, arr) => (
                  <div key={e._id} className="vertical-bottom">
                    <div className="vertical-bottom">
                      <ThirdNewsCard
                        length="60"
                        title={e.title}
                        imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                        link={e.postId ? `/${e.postId}` : "#"}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-xl-3">
          {Array.isArray(allNews) &&
            allNews.length > 3 &&
            allNews.slice(4, 8).map((e, index, arr) => (
              <div key={e._id} className="vertical-bottom">
                <div className="vertical-bottom">
                  <ThirdNewsCard
                    length="90"
                    title={e.title}
                    imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                    link={e.postId ? `/${e.postId}` : "#"}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SectionThree;
