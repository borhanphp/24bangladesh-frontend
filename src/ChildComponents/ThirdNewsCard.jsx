import Image from "next/image";
import Link from "next/link";
import leadImage from "../../public/image/leadnews.jpg";

function ThirdNewsCard(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div className={`my-3 third-news-card ${props.className}`}>
        <div className="row ">
          <div className="col-6">
            <h2
              className="h2"
              style={{ fontWeight: props.bold ? "bold" : "normal" }}
            >
              {props.title}{" "}
            </h2>
          </div>
          <div className="col-6">
            <Image
              src={props.imgSRC}
              width={500}
              height={200}
              alt={props.title}
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ThirdNewsCard;
