import Image from "next/image";
import Link from "next/link";

// image
import notFoundImage from "../../public/image/404.png";

function NotFound() {
  return (
    <div className="text-center">
      <Image
        className="img-fluid my-5"
        src={notFoundImage}
        width={500}
        height={500}
        alt="Lead News"
      />
      <br />
      <Link className="btn btn-dark my-5" href="/">
        হোম পেজ
      </Link>
    </div>
  );
}

export default NotFound;
