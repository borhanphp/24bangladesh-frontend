"use client";
import React from "react";
import HomeTopNav from "@/ChildComponents/HomeTopNav";
import LeadNews from "@/ChildComponents/LeadNews";
import AdsComponents from "@/ChildComponents/AdsComponents";
import Image from "next/image";
import TabSection from "@/Components/TabSection";
import SectionTwo from "@/Components/HomePage/SectionTwo";

// image
import ads from "../../../public/image/googleAds.png";
import leadImage from "../../../public/image/leadnews.jpg";
import LeadBottomSection from "@/ChildComponents/LeadBottomSection";
import SectionTitle from "@/ChildComponents/SectionTitle";
import { IMAGE_URL } from "@/api/config";

function SectionOne({ data, latestNews }) {
  const leadView = data?.data;
  const allNews = data?.data;
  console.log(`allNews`, allNews);

  return (
    <div>
      {/* <HomeTopNav /> */}
      <div className="row my-3 mt-5  pb-3 mb-3">
        <div className="col-sm-12 col-md-9 col-xl-9 horizontal-right ">
          <div className="vertical-bottom pb-4 mb-3">
            <LeadNews
              imgSRC={`${IMAGE_URL}/${leadView?.image}`}
              headline={leadView?.title}
              description={leadView?.discription}
              topic={leadView?.categoryList?.[0]?.name}
              link={`${leadView?.postId}`}
            />
          </div>
          <div className="row vertical-bottom ">
            {latestNews?.slice(0, 2).map((e, idx, arr) => (
              <div
                className={`col-sm-6 mb-3 ${
                  idx !== arr.length - 1 ? "horizontal-right" : ""
                }`}
                key={e._id}
              >
                <LeadBottomSection
                  discription={e.discription}
                  title={e.title}
                  imgSRC={`${IMAGE_URL}/${e.image}`}
                  link={e.postId ? `/${e.postId}` : "#"}
                />
              </div>
            ))}
          </div>
          {/* 2nd lead */}
          <SectionTwo data={latestNews} />
        </div>
        <div className=" col-sm-12 col-md-3 col-xl-3 mb-3">
          {/* video ads */}
          {/* <AdsComponents
            className="img-fluid"
            image={ads}
            width="500"
            height="200"
          /> */}
          <div className="ratio ratio-16x9 mb-3">
            <iframe
              src="https://www.youtube.com/embed/1rbImrdq-eA?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=1rbImrdq-eA"
              title="Video Ad"
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
            ></iframe>
          </div>
          {/* <video
            src="/video/ads.mp4"
            controls
            autoPlay
            muted
            loop
            style={{ width: "100%", maxWidth: "600px" }}
          /> */}
          <div>
            <TabSection data={latestNews} />
          </div>
          {/* <SectionTitle title="মতামত" />
          <div className="opinion row">
            <div className="col-sm-12 col-md-12 col-xl-3 mb-3">
              <Image src={leadImage} width={50} height={50} alt="Lead News" />
            </div>
            <div className="col-sm-12 col-md-12 col-xl-9">
              <h5>কর্মচারীদের দাবি প্রধান উপদেষ্টার কাছে</h5>
              <p className="my-3">ঢাকা মেট্রোপলিটন</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default SectionOne;
