import { apiClient } from "@/lib/apiClient";


export default async function Home() {
  const posts = await apiClient("/api/posts", { method: "GET", cache: "no-store" });

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <ul className="space-y-8">
          {posts.map((post: any, index: number) => (
            <li
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {post.post_title}
              </h2>
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
