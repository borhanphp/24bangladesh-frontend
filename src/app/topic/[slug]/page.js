import TopicPage from "@/Page/TopicPage";
import { BASE_URL } from "@/api/config";

export async function generateStaticParams() {
  try {
    const response = await fetch(`${BASE_URL}/topic/news`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch topic list:", response.status);
      return [];
    }

    const topic = await response.json();

    if (Array.isArray(topic.categorys)) {
      return topic.categorys.map((e) => ({
        slug: e.topicSlug,
      }));
    }
    return [];
  } catch (error) {
    console.error("generateStaticParams error:", error);
    return [];
  }
}

export default async function Page({ params }) {
  const slug = params.slug;

  try {
    const response = await fetch(`${BASE_URL}/topic/singlenews/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      console.error(`Failed to fetch category: ${response.status}`);
      return (
        <div className="my-3">
          <p className="text-danger">Category not found or server error.</p>
        </div>
      );
    }

    const singleNews = await response.json();

    return (
      <div className="my-3">
        <TopicPage data={singleNews} />
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="my-3">
        <p className="text-danger">
          Something went wrong while loading category data.
        </p>
      </div>
    );
  }
}
