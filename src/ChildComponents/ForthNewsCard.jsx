import Image from "next/image";
import Link from "next/link";
import leadImage from "../../public/image/leadnews.jpg";

function ForthNewsCard(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div className=" forth-news-card">
        <Image
          className="img-fluid mb-3"
          src={props.imgSRC}
          width={500}
          height={500}
          alt="Lead News"
        />
        <h1>{props.title}</h1>
        <div
          className="my-3 open-window"
          dangerouslySetInnerHTML={{
            __html: props.discription,
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
    </Link>
  );
}

export default ForthNewsCard;
