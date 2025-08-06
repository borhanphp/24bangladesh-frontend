import React from "react";
import Image from "next/image";
import Link from "next/link";

function LeadNews(props) {
  return (
    <Link className="text-dark" href={props.link}>
      <div className="row ">
        <div className="col-sm-12 col-md-6 open-mobile mb-3">
          <div>
            <Image
              src={props.imgSRC}
              width={400}
              height={400}
              alt={props.alt}
              className="img-fluid"
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6 mb-3  lead-news">
          <h1 className="h1">
            {(props.headline || "").length > 80
              ? `${props.headline.slice(0, 80)}...`
              : props.headline}
          </h1>

          <div
            className="my-3 open-window"
            dangerouslySetInnerHTML={{
              __html: props.description,
            }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
          <button className="lead-btn open-window">{props.topic}</button>
        </div>
        <div className="col-sm-12 col-md-6 mb-3 open-window">
          <Image
            src={props.imgSRC}
            width={500}
            height={500}
            alt="Lead News"
            className="img-fluid "
          />
        </div>
      </div>
    </Link>
  );
}

export default LeadNews;
