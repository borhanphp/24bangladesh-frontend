import Image from "next/image";
import Link from "next/link";
import leadImage from "../../public/image/leadnews.jpg";
import { IMAGE_URL } from "@/api/config";

function LeadBottomSection(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div className={`row lead-bottom ${props.className} `}>
        <div className="col-6">
          <h1>{props.title}</h1>
          <div
            className="my-3 open-window"
            dangerouslySetInnerHTML={{
              __html: props.discription,
            }}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          />
        </div>
        <div className="col-6">
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

export default LeadBottomSection;
