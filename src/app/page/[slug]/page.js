import CategoryPage from "@/Page/CategoryPage";
import { BASE_URL } from "@/api/config";
import SingleTextPage from "@/Page/SingleTextPage";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const response = await fetch(`${BASE_URL}/page/web/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    console.log(response.status);
  }

  const page = await response.json();
  return Array.isArray(page?.data)
    ? page?.data.map((e) => {
        const params = { slug: e.slug };
        return params;
      })
    : [];
}

export default async function Page({ params }) {
  const slug = params.slug;
  try {
    const response = await fetch(`${BASE_URL}/page/webPage/${slug}`, {
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
          <p className="text-danger">Page not found or server error.</p>
        </div>
      );
    }

    const page = await response.json();

    return (
      <div className="my-3">
        <SingleTextPage data={page} />
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
