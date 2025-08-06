"use client";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { IMAGE_URL } from "@/api/config";

// import LogoImage from "../../public/image/leadnews.jpg";
import logoImage from "../../public/image/singlePost.png";
import ads from "../../public/image/googleAds.png";
// components
import AdsComponents from "@/ChildComponents/AdsComponents";

// icon
import ShareIcon from "@/ChildComponents/ShareIcon";
import RelatedNews from "@/ChildComponents/RelatedNews";
import CategoryTitle from "@/ChildComponents/CategoryTitle";
import ThirdNewsCard from "@/ChildComponents/ThirdNewsCard";
import ForthNewsCard from "@/ChildComponents/ForthNewsCard";
import FifthNewsCard from "@/ChildComponents/FifthNewsCard";

function SinglePage(data) {
  const relatedNews = data?.data?.relatedNews;

  const mainData = data?.data;
  const { news, randomNews } = mainData;

  console.log(randomNews);

  const [fontSize, setFontSize] = useState(20);
  function formatBanglaDateWithAmPm(dateString) {
    const date = new Date(dateString);
    const optionsDate = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const optionsTime = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const banglaDate = date.toLocaleDateString("bn-BD", optionsDate);
    const timeString = date.toLocaleTimeString("en-US", optionsTime);
    return `${banglaDate} | ${timeString}`;
  }

  const increaseFont = () => {
    setFontSize((size) => (size < 30 ? size + 2 : size));
  };

  const decreaseFont = () => {
    setFontSize((size) => (size > 10 ? size - 2 : size));
  };
  const description = news?.discription || "";

  const parts = description.split("</p>");
  const midIndex = Math.floor(parts.length / 2);

  const firstHalf = parts.slice(0, midIndex).join("</p>") + "</p>";
  const secondHalf = parts.slice(midIndex).join("</p>");

  return (
    <div className="my-4 container">
      <div className="row">
        <div className="col-sm-12 col-md-9 horizontal-right ">
          <div className="top-single-category">
            <p>{news?.categoryList?.[0]?.name}</p>
          </div>
          {/* headline */}
          <div className="single-headline vertical-bottom pb-1 mb-3">
            <h1>{news?.title}</h1>
          </div>
          {/* infomation news */}
          <div className="row single-information">
            <div className="col-sm-6 d-flex">
              {" "}
              <Image
                src={
                  news?.reporters?.image
                    ? `${IMAGE_URL}/${news?.reporters.image}`
                    : logoImage
                }
                width={50}
                height={50}
                className="me-2"
                alt="Picture of the author"
              />
              <div className="">
                <p className="mb-0">
                  {news?.reporters?.role?.name === "admin" ||
                  news?.reporters?.role?.name === "mainadmin"
                    ? "24 Bangladesh"
                    : news?.reporters?.role?.name}
                </p>
                <p>{formatBanglaDateWithAmPm(news?.createdAt)}</p>
              </div>
            </div>
            <div className="col-sm-6 d-flex justify-content-end mb-3">
              <ShareIcon
                facebook={true}
                whatsapp={true}
                share={true}
                copy={true}
                print={true}
              />
              <div>
                <button
                  onClick={decreaseFont}
                  className="pointer bg-light border p-1 border-dark mx-2 shadow-sm"
                >
                  অ-
                </button>
                <button
                  onClick={increaseFont}
                  className="pointer bg-light border p-1 border-dark mx-2 shadow-sm"
                >
                  অ+
                </button>
              </div>
            </div>
          </div>
          {/* Lead image */}
          <div>
            <Image
              src={`${IMAGE_URL}/${news?.image}`}
              className="img-fluid"
              width={5000}
              height={500}
              alt="Picture of the author"
            />
          </div>
          {news?.subTitle && (
            <div className="mt-3 mb-5">
              <h4 className="py-4 px-2 border-start border-secondary border-5 bg-secondary-subtle">
                {news?.subTitle}
              </h4>
            </div>
          )}

          {/* details */}
          <div className="mt-3">
            <div
              className="my-3 open-window"
              style={{
                overflow: "visible",
                textOverflow: "unset",
                fontSize: `${fontSize}px`,
                transition: "font-size 0.3s ease",
                display: "block",
                visibility: "visible",
              }}
            >
              {/* Render first half of description */}
              <div dangerouslySetInnerHTML={{ __html: firstHalf }} />

              {/* Insert Related News in the middle */}
              {Array.isArray(relatedNews) && relatedNews.length > 0 && (
                <RelatedNews relatedNews={relatedNews.slice(0, 4)} />
              )}

              {/* Render second half of description */}
              <div dangerouslySetInnerHTML={{ __html: secondHalf }} />
            </div>
          </div>
          {/* related News */}
          {/* <div>
            <RelatedNews />
          </div> */}

          {/* topic */}
          <div className="topic-point my-4 vertical-bottom pb-3">
            <ul className="m-0">
              {news?.topicList?.map((topic) => (
                <li key={topic._id}>
                  <Link href={`/topic/${topic.topicSlug}`}>{topic.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* popular news */}
          <div>
            <CategoryTitle title="জনপ্রিয়" />
            <div className="row">
              {randomNews?.slice(0, 3).map((e, idx, arr) => (
                <div
                  className={`col-sm-12 col-md-4 ${
                    idx !== arr.length - 1 ? "" : ""
                  }`}
                  key={e._id}
                >
                  <FifthNewsCard
                    link={e.postId ? `/${e.postId}` : "#"}
                    title={e.title}
                    imgSRC={`${IMAGE_URL}/${e.image}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Update news */}
          <div>
            <CategoryTitle title="সর্বশেষ" />
            <div className="row">
              {randomNews?.slice(3, 6).map((e, idx, arr) => (
                <div
                  className={`col-sm-12 col-md-4 ${
                    idx !== arr.length - 1 ? "" : ""
                  }`}
                  key={e._id}
                >
                  <FifthNewsCard
                    link={e.postId ? `/${e.postId}` : "#"}
                    title={e.title}
                    imgSRC={`${IMAGE_URL}/${e.image}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-3">
          <div className="vertical-bottom pb-3">
            <AdsComponents
              className="img-fluid"
              image={ads}
              width="500"
              height="200"
            />
          </div>
          {/* read more */}
          <div>
            <CategoryTitle title="আরও পড়ুন" />
            <div className="single-read-more">
              {randomNews?.slice(6, 11).map((e, idx, arr) => (
                <div
                  className={` ${idx !== arr.length - 1 ? "" : ""}`}
                  key={e._id}
                >
                  <Link
                    href={e.postId ? `/${e.postId}` : "#"}
                    className="text-decoration-none text-dark"
                  >
                    <h1>{e.title}</h1>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* category */}
    </div>
  );
}

export default SinglePage;
