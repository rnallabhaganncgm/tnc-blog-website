import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { Post } from "@/types";
import Link from "next/link";

export default async function TrendingNews() {
  // Fetch latest posts
  const posts: Post[] = await apiClient("/api/posts/latest", {
    method: "GET",
    cache: "no-store",
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        No trending news available 😕
      </div>
    );
  }

  const featuredPost = posts[0];
  // Show only 6 posts on the right side
  const sidePosts = posts.slice(1, 5);

  return (
    <div className="relative overflow-hidden">
      <div className="px-12 py-16 w-full">
        <h1 className="text-4xl font-bold mb-12 flex items-center">
          <span className="w-2 h-5 bg-[#09c1bf] mr-2 inline-block"></span>
          Trending News
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <div>
            <div className="rounded-lg overflow-hidden mb-6">
              <Link href={featuredPost.slug || "#"}>
                <Image
                  src={featuredPost.thumbnail_url || "/placeholder.png"}
                  alt={featuredPost.post_title}
                  width={640}
                  height={360}
                  className="w-full h-fit object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Link>
            </div>
            <h2 className="text-primary text-3xl font-medium leading-[-0.045rem] mb-4">
              {featuredPost.post_title}
            </h2>
            <p className="text-[#FFFFFF80] text-lg font-light">
              {featuredPost.excerpt || stripHtml(featuredPost.post_content).slice(0, 120) + "..."}
            </p>
          </div>

          {/* More Articles */}
          <div className="flex flex-col">
            <h3 className="text-4xl font-medium text-[#FFFFFF3B] mb-8">More article</h3>
            <div className="space-y-2 2xl:space-y-9">
              {sidePosts.map((post) => (
                <ArticleLink key={post.ID} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical "STORY" text */}
      <div className="absolute right-0 top-5 h-full flex items-center pointer-events-none">
        <div className="transform -rotate-90 origin-center translate-x-70 2xl:translate-x-80">
          <span className="text-[linear-gradient(270deg,_rgba(255,255,255,0.19)_38.49%,_rgba(153,153,153,0.19)_96.65%)] text-6xl 2xl:text-7xl font-bold tracking-widest opacity-20 uppercase">
            TheNewsCrypto
          </span>
        </div>
      </div>
    </div>
  );
}

function ArticleLink({ post }: { post: Post }) {
  return (
    <div className="border-b border-[#d9d9d9]/20 pb-6">
      <div className="flex justify-between items-center">
        <Link href={post.slug || "#"} className="text-lg font-normal pr-4 hover:text-primary">
          {post.post_title}
        </Link>
        <ArrowRight className="text-[#d9d9d9] flex-shrink-0 mr-8" />
      </div>
    </div>
  );
}

function stripHtml(htmlString: string): string {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim();
}
