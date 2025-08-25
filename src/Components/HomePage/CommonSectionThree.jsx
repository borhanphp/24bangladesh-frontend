import SectionTitle from "@/ChildComponents/SectionTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import { IMAGE_URL } from "@/api/config";
// ads
import ads from "../../../public/image/googleAds.png";
function CommonSection({ data, title }) {
  const news = Array.isArray(data) && data.length > 0 ? data : null;
  

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-4 vertical-bottom pb-4">
    
        <div className="">
          <SectionTitle title={title} />
          <div>
            {Array.isArray(news) &&
              news.length > 4 &&
              news.slice(0, 3).map((e, index, arr) => (
                <div
                  key={e._id}
                  className={index === arr.length - 1 ? "" : "vertical-bottom"}
                >
                  <ThirdNewsCard
                    length="90"
                    link={e.postId ? `/${e.postId}` : "#"}
                    imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                    title={e.title}
                  />
                </div>
              ))}
          </div>
        </div>

    </div>
  );
}

export default CommonSection;
