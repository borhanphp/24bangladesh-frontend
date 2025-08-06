import Focus from "@/ChildComponents/Focus";
import ForthNewsCard from "@/ChildComponents/ForthNewsCard";
import SectionTitle from "@/ChildComponents/SectionTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import { IMAGE_URL } from "@/api/config";

function SectionSix({ data, title }) {
  const news = Array.isArray(data) && data.length > 0 ? data : null;
  const newsOne = news ? news[0] : null;

  return (
    <div className="my-4 vertical-bottom pb-4">
      <SectionTitle title={title} />
      <div className="row">
        <div className="col-sm-8">
          <div className="horizontal-right">
            <Focus
              link={newsOne?.postId ? `/${newsOne.postId}` : "#"}
              title={newsOne?.title}
              imgSRC={`${IMAGE_URL}/${newsOne.image}`}
            />
          </div>
        </div>
        <div className="col-sm-4 horizontal-right">
          {Array.isArray(news) &&
            news.length > 3 &&
            news.slice(1, 4).map((e, index, arr) => (
              <div
                key={e._id}
                className={index === arr.length - 1 ? "" : "vertical-bottom"}
              >
                <ThirdNewsCard
                  length="90"
                  link={e.postId ? `/${e.postId}` : "#"}
                  title={e.title}
                  imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                />
              </div>
            ))}
        </div>
        {/* <div className="col-sm-4">
          {Array.isArray(news) &&
            news.length > 3 &&
            news.slice(4, 8).map((e, index, arr) => (
              <div
                key={e._id}
                className={index === arr.length - 1 ? "" : "vertical-bottom"}
              >
                <ThirdNewsCard
                  link={e.postId ? `/${e.postId}` : "#"}
                  title={e.title}
                  imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                />
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
}

export default SectionSix;
