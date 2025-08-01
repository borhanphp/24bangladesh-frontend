import FifthNewsCard from "@/ChildComponents/FifthNewsCard";
import SectionTitle from "@/ChildComponents/SectionTitle";
import SixthNewsCard from "@/ChildComponents/SixthNewsCard";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import { IMAGE_URL } from "@/api/config";

function SectionFourteen({ data, dataTwo, title, titleTwo }) {
  const news = Array.isArray(data) && data.length > 0 ? data : null;
  const newsTwo = Array.isArray(dataTwo) && dataTwo.length > 0 ? dataTwo : null;
  const newsOne = news ? news[0] : null;

  return (
    <div className="my-3 vertical-bottom pb-4">
      <div className="row">
        <div className="col-sm-8">
          <SectionTitle title={title} />
          <SixthNewsCard
            link={newsOne?.postId ? `/${newsOne.postId}` : "#"}
            data={newsOne}
            imgSRC={newsOne?.image ? `${IMAGE_URL}/${newsOne.image}` : ""}
            title={newsOne.title}
            description={newsOne.discription}
          />
          <div className="row my-3">
            {Array.isArray(news) &&
              news.length > 4 &&
              news.slice(1, 4).map((e) => (
                <div className="col-sm-4" key={e._id}>
                  <div className="horizontal-right">
                    <FifthNewsCard
                      link={e.postId ? `/${e.postId}` : "#"}
                      imgSRC={e?.image ? `${IMAGE_URL}/${e.image}` : ads}
                      title={e.title}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="col-sm-4">
          <SectionTitle title={titleTwo} />
          {Array.isArray(newsTwo) &&
            newsTwo.length > 4 &&
            newsTwo.slice(1, 4).map((e, index, arr) => (
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

export default SectionFourteen;
