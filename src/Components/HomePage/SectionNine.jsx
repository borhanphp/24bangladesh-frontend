import Image from "next/image";
import Link from "next/link";

import leadImage from "../../../public/image/leadnews.jpg";
import { useQuery } from "@tanstack/react-query";
import { useVideoNews } from "@/api/news";
import { IMAGE_URL } from "@/api/config";
function SectionNine() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["video-news"],
    queryFn: useVideoNews,
  });

  const Video = data?.news?.[0];
  const VideoMap = data?.news;

  console.log("video Data", data);
  console.log("video Data", `${IMAGE_URL}/${VideoMap?.[0]?.image}`);

  return (
    <div className="section-nine py-4">
      <div className="container">
        <Link className="text-dark" href={`/video`}>
          <h2>ভিডিও</h2>
        </Link>
        <div className="py-3 row ">
          <div className="col-sm-6 mb-3">
            <Link className="text-dark" href={`/video/${Video?.postId}`}>
              <div className="video-lead p-2">
                <Image
                  src={`${IMAGE_URL}/${Video?.image}`}
                  alt={Video?.title || "Video thumbnail"}
                  width={800}
                  height={180}
                  className="img-fluid mb-4"
                />
                <h1 className="mb-3">{Video?.title}</h1>
                <div
                  className="my-3 open-window"
                  dangerouslySetInnerHTML={{
                    __html: Video?.discription,
                  }}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              </div>
            </Link>
          </div>
          <div className="col-sm-6 mb-3">
            {VideoMap?.slice(1, 4).map((video) => (
              <Link className="text-dark" href={`/video/${video?.postId}`} key={video._id}>
                <div className="video-child p-2 mb-2" >
                  <div className="row">
                    <div className="col">
                      <Image
                        src={`${IMAGE_URL}/${video?.image}`}
                        alt={Video?.title || "Video thumbnail"}
                        width={254}
                        height={100}
                        className="img-fluid"
                      />
                    </div>
                    <div className="col">
                      <h1>{video.title}</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionNine;
