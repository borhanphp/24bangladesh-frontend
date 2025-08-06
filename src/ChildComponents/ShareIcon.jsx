// import { FaShare } from "react-icons/fa";
// import { IoCopy } from "react-icons/io5";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaFacebookF } from "react-icons/fa";
// import { IoMdPrint } from "react-icons/io";

// function ShareIcon({ facebook, whatsapp, share, copy, print }) {
//   return (
//     <div className="d-flex flex-wrap">
//       {facebook && (
//         <FaFacebookF className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//       )}
//       {whatsapp && (
//         <FaWhatsapp className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//       )}
//       {share && (
//         <FaShare className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//       )}
//       {copy && (
//         <IoCopy className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//       )}
//       {print && (
//         <IoMdPrint className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//       )}
//     </div>
//   );
// }

// export default ShareIcon;

"use client";
import { FaShare } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";

function ShareIcon({ facebook, whatsapp, share, copy, print }) {
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const handleFacebookShare = () => {
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentURL
    )}&quote=${encodeURIComponent(document.title)}`;
    window.open(
      fbShareUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleWhatsappShare = () => {
    const waShareUrl = `https://wa.me/?text=${encodeURIComponent(currentURL)}`;
    window.open(
      waShareUrl,
      "_blank",
      "noopener,noreferrer,width=600,height=400"
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentURL);
      alert("লিংক কপি করা হয়েছে!");
    } catch (err) {
      alert("কপি করা যায়নি!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="d-flex flex-wrap">
      {facebook && (
        <FaFacebookF
          className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm"
          onClick={handleFacebookShare}
        />
      )}
      {whatsapp && (
        <FaWhatsapp
          className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm"
          onClick={handleWhatsappShare}
        />
      )}
      {share && (
        <FaShare
          className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: document.title,
                  text: "এই খবরটি দেখুন",
                  url: window.location.href,
                })
                .then(() => console.log("Shared successfully"))
                .catch((error) => console.error("Share failed:", error));
            } else {
              alert("আপনার ব্রাউজার শেয়ার ফিচার সাপোর্ট করে না।");
            }
          }}
        />
      )}
      {copy && (
        <IoCopy
          className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm"
          onClick={handleCopy}
        />
      )}
      {print && (
        <IoMdPrint
          className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm"
          onClick={handlePrint}
        />
      )}
    </div>
  );
}

export default ShareIcon;
