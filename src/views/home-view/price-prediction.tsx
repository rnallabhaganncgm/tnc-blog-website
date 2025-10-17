import Image from "next/image";
import { BookOpen, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/apiClient";
import { Post } from "@/types";
import { humanizeDate, getReadTime } from "@/lib/utils";
import Link from "next/link";

export default async function PricePrediction() {
  // Fetch data from server
  const posts: Post[] = await apiClient("/api/posts/category/price-prediction?limit=5", {
    method: "GET",
    cache: "no-store",
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        No price prediction articles available 😕
      </div>
    );
  }

  const featuredPost = posts[0];
  const sidePosts = posts.slice(1);



  return (
    <div className="w-full mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative w-full">
          <h1 className="text-5xl text-[#0303031f] absolute bottom-3.5 font-black left-0">
            Prediction
          </h1>
          <div className="flex flex-row items-center space-x-1">
            <div className="w-2 h-5 bg-primary"></div>
            <h1 className="text-3xl font-medium">Price Prediction</h1>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm text-[#1C1B1F]"
        >
          More Articles <StickyNote />
        </Button>
      </div>

      {/* Mobile top featured card */}
      <div className="xl:hidden mb-6">
        <FeaturedCryptoCard post={featuredPost} />
      </div>

      {/* Grid layout */}
      <div className="xl:grid xl:grid-cols-10 gap-5">
        {/* Left side cards */}
        <div className="hidden xl:flex xl:flex-col xl:col-span-3 gap-5">
          {sidePosts.slice(0, 2).map((post) => (
            <CryptoCard key={post.ID} post={post} />
          ))}
        </div>

        {/* Center featured */}
        <div className="hidden xl:block xl:col-span-4">
          <FeaturedCryptoCard post={featuredPost} />
        </div>

        {/* Right side cards */}
        <div className="hidden xl:flex xl:flex-col xl:col-span-3 gap-5">
          {sidePosts.slice(2).map((post) => (
            <CryptoCard key={post.ID} post={post} />
          ))}
        </div>

        {/* Mobile & Tablet layout */}
        <div className="xl:hidden">
          {/* Tablet grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-5">
            {sidePosts.map((post) => (
              <CryptoCard key={post.ID} post={post} />
            ))}
          </div>

          {/* Mobile stack */}
          <div className="flex flex-col md:hidden gap-5">
            {sidePosts.map((post) => (
              <CryptoCard key={post.ID} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function stripHtml(htmlString: string): string {
  if (!htmlString) return "";
  return htmlString.replace(/<[^>]*>/g, "").replace(/\n/g, " ").trim();
}

function FeaturedCryptoCard({ post }: { post: Post }) {
  return (
    <div className="border border-[#0000004d] overflow-hidden h-full p-4 flex flex-col justify-between space-y-10">
      <Link href={post.slug} className="relative block h-[20rem] bg-[#1c1b1f] overflow-hidden rounded-2xl flex-shrink-0">
        <Image
          src={post.thumbnail_url || "/placeholder.png"}
          alt={post.post_title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col flex-1 justify-between px-4 space-y-4">
        <div className="space-y-4">
          <Link href={post.slug} className="hover:text-primary block">
            <h2 className="text-2xl font-medium line-clamp-2">{post.post_title}</h2>
          </Link>
          <p className="text-[#000000A8] text-base line-clamp-3 mt-5">
            {post.excerpt || stripHtml(post.post_content).slice(0, 160) + "..."}
          </p>
        </div>

        <div className="flex justify-between text-sm text-[#7f7f7f] pt-4">
          <span>{humanizeDate(post.post_date)}</span>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <BookOpen className="w-4 h-4" />
            <span>{getReadTime(post.post_content)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


function CryptoCard({ post }: { post: Post }) {
  return (
    <div className="rounded-lg overflow-hidden">
      <Link href={post.slug} className="relative block h-[11.5rem] bg-[#1c1b1f] overflow-hidden rounded-2xl">
        <Image
          src={post.thumbnail_url || "/placeholder.png"}
          alt={post.post_title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
      <div className="p-4">
        <Link href={post.slug} className="hover:text-primary block">
          <h2 className="text-xl font-medium mb-4 line-clamp-2">{post.post_title}</h2>
        </Link>
        <div className="flex justify-between text-sm text-[#7f7f7f]">
          <span>{humanizeDate(post.post_date)}</span>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <BookOpen className="w-4 h-4" />
            <span>{getReadTime(post.post_content)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

