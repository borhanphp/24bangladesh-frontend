import ForthNewsCard from "@/ChildComponents/ForthNewsCard";
import SectionTitle from "@/ChildComponents/SectionTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import AdsComponents from "@/ChildComponents/AdsComponents";
import { IMAGE_URL } from "@/api/config";
// ads
import ads from "../../../public/image/googleAds.png";
function SectionTen({ data, title, dataTwo, titleTwo }) {
  const news = Array.isArray(data) && data.length > 0 ? data : null;
  const newsTwo = Array.isArray(dataTwo) && dataTwo.length > 0 ? dataTwo : null;
  const newsOne = news ? news[0] : null;

  console.log("newsTwo", newsTwo);

  return (
    <div className="my-4 vertical-bottom pb-4">
      <div className="row">
        <div className="col-sm-8">
          <SectionTitle title={title} />
          <div className="row">
            <div className="col-sm-6">
              <div className="horizontal-right">
                <ForthNewsCard
                  imgSRC={
                    newsOne?.image ? `${IMAGE_URL}/${newsOne.image}` : ads
                  }
                  title={newsOne.title}
                  discription={newsOne.discription}
                  link={newsOne?.postId ? `/${newsOne.postId}` : "#"}
                />
              </div>
            </div>
            <div className="col-sm-6 horizontal-right">
              {Array.isArray(news) &&
                news.length > 4 &&
                news.slice(1, 4).map((e, index, arr) => (
                  <div
                    key={e._id}
                    className={
                      index === arr.length - 1 ? "" : "vertical-bottom"
                    }
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
          </div>
        </div>
        <div className="col-sm-4">
          <SectionTitle title={titleTwo} />
          <div>
            {Array.isArray(newsTwo) &&
              newsTwo.length > 4 &&
              newsTwo.slice(0, 3).map((e, index, arr) => (
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
        </div>
      </div>
    </div>
  );
}

export default SectionTen;
