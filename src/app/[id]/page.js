import SinglePage from "@/Page/SinglePage";
import { BASE_URL, WEB_TOKEN } from "@/api/config";
import Image from "next/image";
import { IMAGE_URL } from "@/api/config";
// image
import notFoundImage from "../../../public/image/404.png";

export const revalidate = 10;

// 1. Pre-generate dynamic routes
export async function generateStaticParams() {
  const res = await fetch(`${BASE_URL}/news/web/all`, {
    headers: {
      "Content-Type": "application/json",
      webtoken: WEB_TOKEN,
    },
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error("Failed to fetch news list");
    return [];
  }

  const data = await res.json();
  return Array.isArray(data.news)
    ? // ? data.news.map((item) => ({ id: item.postId }))
      data.news.slice(0, 10).map((item) => ({ id: item.postId }))
    : [];
}

// ✅ Meta tags for Open Graph (used for Facebook sharing)
export async function generateMetadata({ params }) {
  const slug = params.id;
  try {
    const res = await fetch(`${BASE_URL}/news/web/${slug}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) return {};

    const result = await res.json();
    const singleNews = result?.news?.[0];

    return {
      title: singleNews?.metaTitle || singleNews?.title,
      description: singleNews?.metaDiscription || singleNews?.subTitle,
      openGraph: {
        title: singleNews?.metaTitle || singleNews?.title,
        description: singleNews?.metaDiscription || singleNews?.subTitle,
        url: `https://24bangladesh.net/${slug}`,
        type: "article",
        images: [
          {
            url: `${IMAGE_URL}/${singleNews?.image}`,
            width: 800,
            height: 600,
            alt: singleNews?.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata error:", error);
    return {};
  }
}

export default async function Page({ params }) {
  const slug = params.id;

  try {
    const response = await fetch(`${BASE_URL}/news/web/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch category: ${response.status}`);
      return (
        <div className="my-3 text-center">
          <Image
            className="img-fluid my-5"
            src={notFoundImage}
            width={500}
            height={500}
            alt="Lead News"
          />
        </div>
      );
    }
    const news = await response.json();

    return (
      <div className="my-3">
        <SinglePage data={news} />
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="my-3 text-center">
        <Image
          className="img-fluid my-5"
          src={notFoundImage}
          width={500}
          height={500}
          alt="Lead News"
        />
      </div>
    );
  }
}
