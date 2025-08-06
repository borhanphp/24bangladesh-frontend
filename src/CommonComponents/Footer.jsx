"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useMeta from "@/providers/useMeta";
import useFooter from "@/providers/useFooter";
import usePage from "@/providers/usePage";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { SiGooglenews } from "react-icons/si";
import { IMAGE_URL } from "@/api/config";

import LogoImage from "../../public/image/logoFinal.jpg";

function Footer() {
  const { data: metaData } = useMeta();
  const { data: footerData } = useFooter();
  const { data: pageData } = usePage();
  const viewMetaData = metaData?.data;
  const viewFooterData = footerData?.data;
  const viewPageData = pageData?.data;

  return (
    <div className="footer py-3">
      <div className="container mobile-text-center">
        <div className="row">
          <div className="col-sm-6 mb-3">
            <Image
              src={`${IMAGE_URL}/${viewMetaData?.logo}`}
              width={280}
              height={80}
              alt="Logo"
              className="pointer img-fluid"
            />
          </div>
          <div className="col-sm-6">
            <div
              className="my-3 open-window text-end"
              dangerouslySetInnerHTML={{
                __html: viewFooterData?.details,
              }}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
          </div>
        </div>
        <nav className="navbar navbar-expand-lg w-100">
          <ul className="navbar-nav d-flex flex-wrap justify-content-center px-2 w-100">
            {viewPageData?.map((page) => (
              <li key={page._id} className="nav-item">
                <Link
                  className="nav-link text-nowrap"
                  href={`/page/${page.slug}`}
                >
                  {page.title}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/contact">
                যোগাযোগ
              </Link>
            </li>
          </ul>
          {/* <ul className="navbar-nav d-flex flex-wrap justify-content-center px-2 w-100">
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/singlePage">
                গোপনীয়তার নীতি
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/singlePage">
                ব্যবহারের শর্তাবলি
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/contact">
                যোগাযোগ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/singlePage">
                আমাদের সম্পর্কে
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/team">
                আমরা
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/archive">
                আর্কাইভ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-nowrap" href="/singlePage">
                বিজ্ঞাপন
              </Link>
            </li>
          </ul> */}
        </nav>

        {/* connect  */}
        <div className="d-flex flex-wrap text-center justify-content-center mb-3">
          <div className="d-flex align-items-center me-3 mb-2">
            <p className="mb-0">{viewMetaData?.address}</p>
          </div>

          <div className="d-flex align-items-center me-3 my-2">
            <FaPhoneAlt className="me-1" />
            <p className="mb-0">{viewMetaData?.mobile}</p>
          </div>

          <div className="d-flex align-items-center me-3 mb-2">
            <FaMobile className="me-1" />
            <p className="mb-0">{viewMetaData?.phone}</p>
          </div>

          <div className="d-flex align-items-center me-3 mb-2">
            <IoLogoWhatsapp className="me-1" />
            <p className="mb-0">{viewMetaData?.whatsApps}</p>
          </div>

          <div className="d-flex align-items-center me-3 mb-2">
            <MdEmail className="me-1" />
            <p className="mb-0" style={{ fontFamily: "initial" }}>
              {viewMetaData?.email}
            </p>
          </div>
        </div>
        {/* Social  */}
        <div className="d-flex justify-content-center">
          {viewMetaData && (
            <div className="d-flex flex-wrap gap-2 mt-3">
              <Link
                href={`https://${viewMetaData.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="fs-2 p-1 border rounded text-primary border-primary me-2" />
              </Link>

              <Link
                href={viewMetaData.twitterX}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitterX className="fs-2 p-1 border rounded text-dark border-dark me-2" />
              </Link>

              <Link
                href={viewMetaData.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="fs-2 p-1 border rounded"
                  style={{ color: "#C13584", borderColor: "#C13584" }}
                />
              </Link>

              <Link
                href={`https://${viewMetaData.youtube}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="fs-2 p-1 border rounded text-danger border-danger me-2" />
              </Link>

              <Link
                href={viewMetaData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="fs-2 p-1 border rounded"
                  style={{ color: "#0077B5", borderColor: "#0077B5" }}
                />
              </Link>

              <Link
                href={`https://${viewMetaData.playStore}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGooglePlay
                  className="fs-2 p-1 border rounded"
                  style={{ color: "#34A853", borderColor: "#34A853" }}
                />

                {/* Google News */}
                <Link
                  href={viewMetaData.googleNews}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Google News"
                >
                  <SiGooglenews className="fs-2 p-1 border rounded text-primary border-primary me-2" />
                </Link>

                {/* Google Play Store */}
                <Link
                  href={`https://${viewMetaData.playStore}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Google Play"
                >
                  <FaGooglePlay
                    className="fs-2 p-1 border rounded"
                    style={{ color: "#34A853", borderColor: "#34A853" }}
                  />
                </Link>

                {/* Apple App Store */}
                <Link
                  href={`https://${viewMetaData.appsStore}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Apple App Store"
                >
                  <FaApple className="fs-2 p-1 border rounded text-dark border-dark me-2" />
                </Link>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Footer;
