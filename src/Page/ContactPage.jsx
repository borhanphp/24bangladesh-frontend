"use client";
import CategoryTitle from "@/ChildComponents/CategoryTitle";
import useMeta from "@/providers/useMeta";
// icon
import { FaPhoneAlt } from "react-icons/fa";
import { FaMobile } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function ContactPage() {
  const { data: metaData, loading } = useMeta();
  const viewMetaData = metaData?.data;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-4 container">
      <CategoryTitle title="Contact Us" />
      <div className="my-2 row contact vertical-bottom pb-4">
        <div className="col-sm-4 d-flex horizontal-right">
          <FaPhoneAlt className="icon fs-1 me-2 mt-2" />
          <p>
            Phone : <br /> <span>{viewMetaData?.phone}</span>{" "}
          </p>
        </div>
        <div className="col-sm-4 d-flex horizontal-right">
          <FaMobile className="icon fs-1 me-2 mt-2" />
          <p>
            Mobile: <br /> <span>{viewMetaData?.mobile}</span>{" "}
          </p>
        </div>
        <div className="col-sm-4 d-flex horizontal-right">
          <IoLocationSharp className="icon fs-1 me-2 mt-2" />
          <p>
            Address : <br /> <span>{viewMetaData?.address}</span>{" "}
          </p>
        </div>
        <div className="col-sm-4 d-flex horizontal-right">
          <FaWhatsapp className="icon fs-1 me-2 mt-2" />
          <p>
            What's Apps |:
            <br /> <span>{viewMetaData?.whatsapps}</span>{" "}
          </p>
        </div>
        <div className="col-sm-4 d-flex horizontal-right">
          <MdEmail className="icon fs-1 me-2 mt-2" />
          <p>
            Email :
            <br /> <span>{viewMetaData?.email}</span>{" "}
          </p>
        </div>
      </div>
      {/* ads */}
      <div className="vertical-bottom text-center py-3 mb-4">
        <p>
          বিজ্ঞাপন প্রকাশের জন্য যোগাযোগ করুন {viewMetaData?.mobile} নাম্বারে
        </p>
      </div>
      <div className="ratio ratio-16x9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233667.49930919538!2d90.25487760231928!3d23.781067235123995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1748598755610!5m2!1sen!2sbd"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export default ContactPage;
