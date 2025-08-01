"use client";
import Link from "next/link";
import useMeta from "@/providers/useMeta";
// icon
import ShareIcon from "@/ChildComponents/ShareIcon";
import { IoLogoWhatsapp } from "react-icons/io";
import { GrYoutube } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";

import CategoryTitle from "@/ChildComponents/CategoryTitle";

function VideoSinglePage(data) {
  const { data: metaData } = useMeta();
  const viewMetaData = metaData?.data;
  const videos = data?.data;

  const youtubeLink = viewMetaData?.youtube?.startsWith("http")
    ? viewMetaData.youtube
    : `https://${viewMetaData?.youtube}`;

  const getFullUrl = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-sm-8">
          <div className="ratio ratio-16x9 mb-3">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videos.videoURL}`}
              // src={`https://www.youtube.com/embed/lr1G8ra__qc`}
              // title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          {/* title */}

          <h1>{videos.title}</h1>
          <div className="py-3 my-3 border-bottom border-secondary-emphasis border-top">
            <ShareIcon
              facebook={true}
              whatsapp={true}
              share={true}
              copy={true}
            />
          </div>
          <div
            className="my-3 open-window"
            dangerouslySetInnerHTML={{ __html: videos?.discription }}
            style={{
              overflow: "visible",
              textOverflow: "unset",
              transition: "font-size 0.3s ease",
              display: "block",
              visibility: "visible",
            }}
          />
          {/* others static */}
          <div className="mt-5">
            <button
              className="singleShare btn btn-success"
              onClick={() => window.open(youtubeLink, "_blank")}
            >
              ২৪ বাংলাদেশ <IoLogoWhatsapp className="ms-2" /> চ্যানেল ফলো করুন
            </button>
            ;
            <div className="my-3 p-3 border border-secondary-emphasis rounded">
              {/* <Link
                href="https://www.youtube.com/@yourchannel"
                className="video-share color-youtube border mb-3 text-start border-secondary-emphasis p-3 rounded-3 w-100 d-block text-decoration-none"
                target="_blank"
              >
                <GrYoutube className="me-3" /> ইউটিউব এ অনুসরণ করুন
              </Link>

              <Link
                href="https://www.facebook.com/yourpage"
                className="video-share color-fcebook border mb-3 text-start border-secondary-emphasis p-3 rounded-3 w-100 d-block text-decoration-none"
                target="_blank"
              >
                <FaFacebook className="me-3" /> ফেসবুক এ অনুসরণ করুন
              </Link>

              <Link
                href="https://www.instagram.com/yourhandle"
                className="video-share color-instragram border mb-3 text-start border-secondary-emphasis p-3 rounded-3 w-100 d-block text-decoration-none"
                target="_blank"
              >
                <GrInstagram className="me-3" /> ইনস্টাগ্রাম এ অনুসরণ করুন
              </Link> */}
              <Link
                href={getFullUrl(viewMetaData?.youtube)}
                className="video-share color-youtube border mb-3 text-start border-secondary-emphasis p-3 rounded-3 w-100 d-block text-decoration-none"
                target="_blank"
              >
                <GrYoutube className="me-3" /> ইউটিউব এ অনুসরণ করুন
              </Link>

              <Link
                href={getFullUrl(viewMetaData?.facebook)}
                className="video-share color-fcebook border mb-3 text-start border-secondary-emphasis p-3 rounded-3 w-100 d-block text-decoration-none"
                target="_blank"
              >
                <FaFacebook className="me-3" /> ফেসবুক এ অনুসরণ করুন
              </Link>

              <Link
                href={getFullUrl(viewMetaData?.instagram)}
                className="video-share color-instragram border mb-3 text-start border-secondary-emphasis p-3 rounded-3 w-100 d-block text-decoration-none"
                target="_blank"
              >
                <GrInstagram className="me-3" /> ইনস্টাগ্রাম এ অনুসরণ করুন
              </Link>
            </div>
            <div>
              <p className="more-video-text">
                <Link
                  href="/video"
                  className="video-more-btn me-2"
                  target="_blank"
                >
                  ভিডিও
                </Link>
                থেকে আরও দেখুন
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div>
            <CategoryTitle title="আরও পড়ুন" />
            <div className="single-read-more">
              {/* {randomNews?.slice(6, 11).map((e, idx, arr) => (
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
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSinglePage;
