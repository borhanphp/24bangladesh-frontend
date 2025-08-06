// export default function Page() {
//   return (
//     <div className="my-3">
//
//     </div>
//   );
// }

import VideoSinglePage from "@/Page/VideoSinglePage";
import { BASE_URL } from "@/api/config";

export async function generateStaticParams() {
  const response = await fetch(`${BASE_URL}/video/videoNews/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.log(response.status);
  }
  const video = await response.json();

  return Array.isArray(video.news)
    ? video.news.map((item) => ({
        id: item.postId,
      }))
    : [];
}

export default async function Page({ params }) {
  const id = params.id;

  try {
    const response = await fetch(`${BASE_URL}/video/video/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // ✅ Place `next: { revalidate: 10 }` outside the `headers` object
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch video: ${response.status}`);
      return (
        <div className="my-3">
          <p className="text-danger">Video not found or server error.</p>
        </div>
      );
    }

    const { video } = await response.json(); // assuming the API returns { video: {...} }

    return (
      <div className="my-3">
        <VideoSinglePage data={video} />
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="my-3">
        <p className="text-danger">
          Something went wrong while loading video data.
        </p>
      </div>
    );
  }
}
