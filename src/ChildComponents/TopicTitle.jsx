// import Link from "next/link";
// import { FaShare } from "react-icons/fa";
// import { IoCopy } from "react-icons/io5";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";

// function LatestTitle(props) {
//   return (
//     <div className="my-5 latest-title">
//       <div className="text-center text-sm-start mb-4">
//         <h3>{props.name}</h3>
//       </div>
//       <div className="d-flex  mb-3">
//         {/* <div className="share-count text-center me-2">
//           <p className="mb-0">
//             7.2k <br />
//             <span>Shares</span>
//           </p>
//         </div> */}
//         <FaFacebookF className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm" />
//         <FaWhatsapp className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm" />
//         <FaShare className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm" />
//         <IoCopy className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm" />
//       </div>
//       <div className="topic-discription vertical-bottom mb-3">
//         <div
//           className="my-3 open-window"
//           dangerouslySetInnerHTML={{
//             __html: props.description,
//           }}
//           style={{
//             display: "-webkit-box",
//             WebkitLineClamp: 5, // Limit to 5 lines
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         />
//       </div>
//       <div className="tranding">
//         <div className="overflow-auto">
//           <ul className="list-unstyled d-flex flex-nowrap gap-2">
//             <li>
//               <Link
//                 href="/topic"
//                 className="border border-primary text-nowrap rounded-pill px-3 py-1 text-dark text-decoration-none d-inline-block"
//               >
//                 আগামীকালের আবহাওয়া
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/topic"
//                 className="border border-primary text-nowrap rounded-pill px-3 py-1 text-dark text-decoration-none d-inline-block"
//               >
//                 নামাজের সময়সূচি
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/topic"
//                 className="border border-primary text-nowrap rounded-pill px-3 py-1 text-dark text-decoration-none d-inline-block"
//               >
//                 চাকরির খবর
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LatestTitle;

"use client";
import Link from "next/link";
import { FaShare, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { useEffect, useState } from "react";

function LatestTitle(props) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank");
  };

  const handleWhatsAppShare = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(currentUrl)}`;
    window.open(url, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: currentUrl,
        });
      } catch (error) {
        console.error("Share cancelled or failed", error);
      }
    } else {
      alert("আপনার ব্রাউজার Share API সাপোর্ট করে না।");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("লিংক কপি হয়েছে!");
    } catch (err) {
      alert("লিংক কপি করা যায়নি।");
    }
  };

  return (
    <div className="my-5 latest-title">
      <div className="text-center text-sm-start mb-4">
        <h3>{props.name}</h3>
      </div>
      <div className="d-flex mb-3">
        <FaFacebookF
          onClick={handleFacebookShare}
          title="Facebook এ শেয়ার করুন"
          className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm"
        />
        <FaWhatsapp
          onClick={handleWhatsAppShare}
          title="WhatsApp এ শেয়ার করুন"
          className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm"
        />
        <FaShare
          onClick={handleNativeShare}
          title="Share অপশন খুলুন"
          className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm"
        />
        <IoCopy
          onClick={handleCopyLink}
          title="লিংক কপি করুন"
          className="pointer bg-light border border-dark p-2 fs-2 mx-2 shadow-sm"
        />
      </div>

      <div className="topic-discription vertical-bottom mb-3">
        <div
          className="my-3 open-window"
          dangerouslySetInnerHTML={{
            __html: props.description,
          }}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </div>

      <div className="tranding">
        <div className="overflow-auto">
          <ul className="list-unstyled d-flex flex-nowrap gap-2">
            <li>
              <Link
                href="/topic"
                className="border border-primary text-nowrap rounded-pill px-3 py-1 text-dark text-decoration-none d-inline-block"
              >
                আগামীকালের আবহাওয়া
              </Link>
            </li>
            <li>
              <Link
                href="/topic"
                className="border border-primary text-nowrap rounded-pill px-3 py-1 text-dark text-decoration-none d-inline-block"
              >
                নামাজের সময়সূচি
              </Link>
            </li>
            <li>
              <Link
                href="/topic"
                className="border border-primary text-nowrap rounded-pill px-3 py-1 text-dark text-decoration-none d-inline-block"
              >
                চাকরির খবর
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LatestTitle;
