import Image from "next/image";
import Link from "next/link";
// image
import ads from "../../public/image/leadnews.jpg";

function TopicNewsCard(props) {
  return (
    <Link className="text-dark" href={`${props.link}`}>
      <div className="row latest-card vertical-bottom pb-3 mb-4">
        <div className="col-sm-12 col-md-9 ">
          <h3 className="mb-4">{props.title}</h3>
          {/* <p>৩০ মে ২০২৫, ০০:০৩</p> */}
          <p>{props.date}</p>
        </div>
        <div className="col-sm-12 col-md-3">
          <Image
            src={props.imgSRC}
            width={500}
            height={500}
            alt={props.title}
            className="img-fluid"
          />
        </div>
      </div>
    </Link>
  );
}

export default TopicNewsCard;
