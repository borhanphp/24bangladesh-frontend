// import {
//   FaShare,
//   FaFacebookF,
//   FaWhatsapp,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
//   FaSearch, // 🔍 Search icon
// } from "react-icons/fa";
// import { IoCopy } from "react-icons/io5";
// import { IoMdPrint } from "react-icons/io";
// import { FaXTwitter } from "react-icons/fa6"; // X (Twitter) icon

// function normalizeUrl(url) {
//   if (!url) return "";
//   if (url.startsWith("http://") || url.startsWith("https://")) {
//     return url;
//   }
//   return `https://${url}`;
// }

// function SocialIcon({
//   facebook,
//   whatsapp,
//   twitter,
//   instagram,
//   linkedin,
//   youtube,
//   search,
//   links = {},
// }) {
//   return (
//     <div className="d-flex flex-wrap">
//       {search && (
//         <FaSearch className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//       )}
//       {facebook && (
//         <a
//           href={normalizeUrl(links.facebook)}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaFacebookF className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//         </a>
//       )}
//       {whatsapp && (
//         <a
//           href={normalizeUrl(links.whatsapp)}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaWhatsapp className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//         </a>
//       )}
//       {twitter && (
//         <a
//           href={normalizeUrl(links.twitterX)}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaXTwitter className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//         </a>
//       )}
//       {instagram && (
//         <a
//           href={normalizeUrl(links.instagram)}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaInstagram className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//         </a>
//       )}
//       {linkedin && (
//         <a
//           href={normalizeUrl(links.linkedin)}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaLinkedinIn className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//         </a>
//       )}
//       {youtube && (
//         <a
//           href={normalizeUrl(links.youtube)}
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <FaYoutube className="pointer bg-light border border-dark p-1 fs-2 mx-2 shadow-sm" />
//         </a>
//       )}
//     </div>
//   );
// }

// export default SocialIcon;
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaSearch,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function normalizeUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
}

function SocialIcon({
  facebook,
  whatsapp,
  twitter,
  instagram,
  linkedin,
  youtube,
  search,
  links = {},
}) {
  const iconList = [
    {
      key: "facebook",
      show: facebook,
      href: links.facebook,
      Icon: FaFacebookF,
      color: "#1877f2",
      label: "Facebook",
    },
    {
      key: "twitter",
      show: twitter,
      href: links.twitterX,
      Icon: FaXTwitter,
      color: "#000",
      label: "Twitter",
    },
    {
      key: "instagram",
      show: instagram,
      href: links.instagram,
      Icon: FaInstagram,
      color:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)",
      label: "Instagram",
    },
    {
      key: "linkedin",
      show: linkedin,
      href: links.linkedin,
      Icon: FaLinkedinIn,
      color: "#0a66c2",
      label: "LinkedIn",
    },
    {
      key: "youtube",
      show: youtube,
      href: links.youtube,
      Icon: FaYoutube,
      color: "#ff0000",
      label: "YouTube",
    },
    {
      key: "whatsapp",
      show: whatsapp,
      href: links.whatsapp,
      Icon: FaWhatsapp,
      color: "#25d366",
      label: "WhatsApp",
    },
  ];

  return (
    <div className="d-flex gap-3 flex-wrap align-items-center">
      {search && (
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{
            backgroundColor: "#6c757d",
            width: "30px",
            height: "30px",
            color: "#fff",
            fontSize: "15px",
            cursor: "pointer",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
          title="Search"
        >
          <FaSearch />
        </div>
      )}

      {iconList.map(
        ({ show, href, Icon, color, label }) =>
          show &&
          href && (
            <a
              key={label}
              href={normalizeUrl(href)}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="text-decoration-none"
            >
              <div
                className="d-flex justify-content-center align-items-center rounded-circle"
                style={{
                  background: color.includes("gradient") ? color : undefined,
                  backgroundColor: !color.includes("gradient")
                    ? color
                    : undefined,
                  width: "30px",
                  height: "30px",
                  color: "#fff",
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                }}
              >
                <Icon />
              </div>
            </a>
          )
      )}
    </div>
  );
}

export default SocialIcon;
