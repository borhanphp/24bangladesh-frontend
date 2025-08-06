"use client";
import React from "react";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import useMenus from "@/providers/useMenus";

function SiteVarNav({ off }) {
  const { data, isLoading, error } = useMenus();
  const siteMenu = data?.navigation?.find((m) => m.idNumber === "2");

  return (
    <div className="site-var-nav">
      <div className="inner-var p-2">
        <div className="text-end mt-2 me-2">
          <ImCross onClick={off} className="pointer" />
        </div>
        {/* nav */}
        <nav className="navbar ms-3 side-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link onClick={off} className="nav-link " href="/latest-news">
                সর্বশেষ
              </Link>
            </li>
            {siteMenu?.categories
              ?.sort((a, b) => a.order - b.order)
              ?.map((cat) => (
                <li className="nav-item" key={cat._id}>
                  <Link
                    className="nav-link "
                    href={`/category/${cat.categorySlug}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SiteVarNav;
