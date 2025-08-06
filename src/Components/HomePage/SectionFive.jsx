import SectionTitle from "@/ChildComponents/SectionTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import AdsComponents from "@/ChildComponents/AdsComponents";
import LeadBottomSection from "@/ChildComponents/LeadBottomSection";
import { IMAGE_URL } from "@/api/config";
// image
import ads from "../../../public/image/googleAds.png";

function SectionFive({ data, title }) {
  const news = Array.isArray(data) && data.length > 0 ? data : null;
  const newsOne = news ? news[0] : null;
  console.log("section five -", data);
  return (
    <div className="my-4 vertical-bottom pb-4">
      {" "}
      <SectionTitle title={title} />
      <div className="row">
        <div className="col-sm-12 col-md-9 col-xl-9">
          <div className="horizontal-right">
            <div className="vertical-bottom pb-4 ">
              <LeadBottomSection
                imgSRC={`${IMAGE_URL}/${newsOne?.image}`}
                title={newsOne?.title}
                link={newsOne?.postId ? `/${newsOne.postId}` : "#"}
                discription={newsOne?.discription}
              />
            </div>
            <div className="row">
              {Array.isArray(news) &&
                news.length > 3 &&
                news.slice(1, 5).map((e, index, arr) => (
                  <div key={e._id} className="col-sm-12 col-md-12 col-xl-6">
                    <div
                      className={
                        index === arr.length - 1 ? "" : "horizontal-right"
                      }
                    >
                      <ThirdNewsCard
                        length="90"
                        link={e.postId ? `/${e.postId}` : "#"}
                        title={e.title}
                        imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3 col-xl-3">
          {Array.isArray(news) &&
            news.length > 3 &&
            news.slice(5, 9).map((e, index, arr) => (
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
          <div className="my-4">
            <AdsComponents
              className="shadow-sm img-fluid"
              image={ads}
              width="1300"
              height="80"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionFive;
