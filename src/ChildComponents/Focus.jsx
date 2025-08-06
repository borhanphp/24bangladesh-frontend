import React from "react";
import ads from "../../public/image/googleAds.png";
import Image from "next/image";
import Link from "next/link";

function Focus(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div style={{ position: "relative" }}>
        <Image
          src={props.imgSRC || ads}
          width={900}
          height={250}
          alt={props.title || "24 Bangladesh "}
          className="img-fluid"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100px",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.93), transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            zIndex: 2,
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
          }}
        >
          {props.title}
        </div>
      </div>
    </Link>
  );
}

export default Focus;
