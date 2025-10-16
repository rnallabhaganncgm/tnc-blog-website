export default async function Home() {
  // Fetch posts from your internal API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts`,
    {
      cache: "no-store", // ensures fresh data on every load
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">


        <ul className="space-y-8">
          {posts.map((post: any, index: number) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              {/* Title */}
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {post.post_title}
              </h2>

              {/* Render HTML post content */}
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.post_content }}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
