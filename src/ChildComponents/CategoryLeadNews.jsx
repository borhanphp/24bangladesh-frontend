import React from "react";
import Image from "next/image";
import Link from "next/link";

// lead
import leadImage from "../../public/image/leadnews.jpg";

function CategoryLeadNews(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div className="row ">
        <div className="col-sm-12 col-md-6 open-mobile mb-3">
          <Image
            src={props.imgSRC}
            width={500}
            height={500}
            alt={props.title}
            className="img-fluid"
          />
        </div>
        <div className="col-sm-12 col-md-6 mb-3 category-lead-news">
          <h1 className="h1">{props.title}</h1>
          {/* <p className="my-3 open-window">
            ঢাকা মেট্রোপলিটন পুলিশের (ডিএমপি) ট্রাফিক বিভাগ জানিয়েছে, দুটি বৃহৎ
            রাজনৈতিক দলের কর্মসূচির কারণে নগরীর প্রধান সড়কগুলোতে যান চলাচল
            বিপর্যস্ত হয়ে পড়ে। ঢাকা মেট্রোপলিটন পুলিশের
          </p> */}
          <div
            className="my-3 open-window"
            dangerouslySetInnerHTML={{
              __html: props.discription || "",
            }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
        </div>
        <div className="col-sm-12 col-md-6 mb-3 open-window">
          <Image
            src={props.imgSRC}
            width={500}
            height={500}
            alt={props.title}
            className="img-fluid "
          />
        </div>
      </div>
    </Link>
  );
}

export default CategoryLeadNews;
