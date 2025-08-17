import React from "react";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";

function HomeTopNav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="home-top-nav-wrapper">
          <ul className="navbar-nav home-top-nav d-flex flex-row mt-3">
            <li className="nav-item">
              <Link className="nav-link fw-bold me-2 text-nowrap" href="/">
                গোপনীয়তার নীতি <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold mx-2 text-nowrap" href="/">
                ব্যবহারের শর্তাবলি <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold mx-2 text-nowrap" href="/">
                যোগাযোগ <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold mx-2 text-nowrap" href="/">
                আমাদের সম্পর্কে <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold mx-2 text-nowrap" href="/">
                আমরা <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold mx-2 text-nowrap" href="/archive">
                আর্কাইভ <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-bold mx-2 text-nowrap" href="/">
                বিজ্ঞাপন <IoIosArrowForward className="mt-0" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default HomeTopNav;
