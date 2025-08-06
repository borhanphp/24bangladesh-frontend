import React from "react";
import SectionTitle from "@/ChildComponents/SectionTitle";
import FifthNewsCard from "@/ChildComponents/FifthNewsCard";
import { IMAGE_URL } from "@/api/config";
function SectionEleven(data) {
  const news =
    Array.isArray(data?.data) && data.data.length > 0 ? data.data : null;
  const newsOne = news ? news[0] : null;

  return (
    <div className="vertical-bottom pb-4">
      <SectionTitle title="এক্সক্লুসিভ" />
      <div className="row">
        {Array.isArray(news) &&
          news.length > 4 &&
          news.slice(0, 4).map((e, index, arr) => (
            <div className="col-sm-3" key={e._id}>
              <FifthNewsCard
                link={e.postId ? `/${e.postId}` : "#"}
                imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                title={e.title}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SectionEleven;
