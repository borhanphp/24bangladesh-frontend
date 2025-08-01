import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import AdsComponents from "@/ChildComponents/AdsComponents";
import { IMAGE_URL } from "@/api/config";
import ads from "../../../public/image/googleAds.png";
function SectionTwo(data) {
  const allNews = Array.isArray(data?.data) ? data.data : [];
  console.log(allNews);
  return (
    <div className="row ">
      <div className="col-sm-12 ">
        <div className="row">
          {Array.isArray(allNews) &&
            allNews.length > 3 &&
            allNews.slice(2, 8).map((e, index, arr) => {
              const isLastThree = index >= arr.length - 3;
              return (
                <div key={e._id} className="col-sm-12 col-md-6 col-lg-4">
                  <div
                    className={
                      index === arr.length - 1 ? "" : "horizontal-right"
                    }
                  >
                    <ThirdNewsCard
                      length="32"
                      bold
                      title={e.title}
                      imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                      link={e.postId ? `/${e.postId}` : "#"}
                      className={isLastThree ? "" : "vertical-bottom"}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {/* <div className="col-sm-3">
        <AdsComponents
          className="img-fluid shadow-sm"
          image={ads}
          width="1300"
          height="80"
        />
      </div> */}
    </div>
  );
}

export default SectionTwo;
