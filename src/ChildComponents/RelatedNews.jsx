// components/RelatedNews.jsx
import React from "react";
import Link from "next/link";

function RelatedNews({ relatedNews = [] }) {
  if (relatedNews.length === 0) return null;

  return (
    <div className="single-news my-4">
      <h1 className="p-2">আরও পড়ুন</h1>
      <div className="p-3">
        <ul className="m-0">
          {relatedNews.map((item) => (
            <li key={item._id}>
              <Link href={`/${item.postId}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RelatedNews;
