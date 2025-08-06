import Image from "next/image";
import Link from "next/link";
import leadImage from "../../public/image/leadnews.jpg";

function SixthNewsCard(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div className=" forth-news-card vertical-bottom ">
        <div className="row">
          <div className="col-sm-6">
            <Image
              className="img-fluid mb-3"
              src={props.imgSRC}
              width={500}
              height={500}
              alt={props.title}
            />
          </div>
          <div className="col-sm-6">
            <h1>{props.title}</h1>
            {/* <p className="my-3">
              ঢাকা মেট্রোপলিটন পুলিশের (ডিএমপি) ট্রাফিক বিভাগ জানিয়েছে, দুটি
              বৃহৎ রাজনৈতিক দলের কর্মসূচির কারণে নগরীর প্রধান সড়কগুলোতে যান
              চলাচল বিপর্যস্ত
            </p> */}
            <div
              className="my-3 open-window"
              dangerouslySetInnerHTML={{
                __html: props.description,
              }}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 5, // Limit to 5 lines
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SixthNewsCard;
