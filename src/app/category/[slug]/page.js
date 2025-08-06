import CategoryPage from "@/Page/CategoryPage";
import { BASE_URL } from "@/api/config";

export async function generateStaticParams() {
  const response = await fetch(`${BASE_URL}/news/category/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    console.log(response.status);
  }
  const news = await response.json();
  return Array.isArray(news.categories)
    ? news.categories.map((c) => {
        const params = { slug: c.categorySlug };
        return params;
      })
    : [];
}

export default async function Page({ params }) {
  const slug = params.slug;

  try {
    const response = await fetch(`${BASE_URL}/news/web/category/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 }, // ISR - Revalidate every 10 seconds
    });

    if (!response.ok) {
      console.error(`Failed to fetch category: ${response.status}`);
      return (
        <div className="my-3">
          <p className="text-danger">Category not found or server error.</p>
        </div>
      );
    }

    const categoryNews = await response.json();

    return (
      <div className="my-3">
        <CategoryPage data={categoryNews} />
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
