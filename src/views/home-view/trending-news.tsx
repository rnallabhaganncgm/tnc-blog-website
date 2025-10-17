"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface NewsItem {
  id: number;
  title: string;
  thumbnail_url?: string;
  post_content: string;
  slug: string;
}

export default function TrendingNews() {
  const [featured, setFeatured] = useState<NewsItem | null>(null);
  const [moreArticles, setMoreArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/posts/category/trending?limit=6");
        const posts: NewsItem[] = await res.json();

        if (posts.length > 0) {
          setFeatured(posts[0]);
          setMoreArticles(posts.slice(1));
        } else {
          // Fallback if API returns nothing
          setFeatured({
            id: 0,
            title: "No trending news available",
            slug: "#",
            post_content: "Please check back later.",
          });
        }
      } catch (err) {
        console.error(err);
        setFeatured({
          id: 0,
          title: "Failed to load trending news",
          slug: "#",
          post_content: "Please check your connection.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading)
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white text-xl">
        Loading Trending News...
      </div>
    );

  if (!featured)
    return (
      <div className="w-full min-h-screen flex items-center justify-center text-white text-xl">
        No trending news found.
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#121212] text-white relative overflow-hidden px-4 sm:px-12 py-16">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-12 flex items-center">
          <span className="w-2 h-5 bg-[#09c1bf] mr-2 inline-block"></span>
          Trending News
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <div>
            <div className="rounded-lg overflow-hidden mb-6">
              <Link href={`/posts/${featured.slug}`}>
                <Image
                  src={featured.thumbnail_url || "/trending-news.png"}
                  alt={featured.title || "Trending news image"}
                  width={640}
                  height={360}
                  className="w-full h-fit object-contain"
                />
              </Link>
            </div>
            <Link
              href={`/posts/${featured.slug}`}
              className="text-primary text-3xl font-medium leading-[-0.045rem] mb-4 hover:underline block"
            >
              {featured.title}
            </Link>
            <p className="text-[#FFFFFF80] text-lg font-light">
              {featured.post_content.slice(0, 100)}...
            </p>
          </div>

          {/* More Articles */}
          <div className="flex flex-col">
            <h3 className="text-4xl font-medium text-[#FFFFFF3B] mb-8">More article</h3>

            <div className="space-y-2 2xl:space-y-9">
              {moreArticles.length > 0 ? (
                moreArticles.map((item) => (
                  <ArticleLink key={item.id} title={item.title} slug={item.slug} />
                ))
              ) : (
                <p className="text-white">No more articles.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical "STORY" text */}
      <div className="absolute right-0 top-5 h-full flex items-center">
        <div className="transform -rotate-90 origin-center translate-x-70 2xl:translate-x-80">
          <span className="text-[linear-gradient(270deg,_rgba(255,255,255,0.19)_38.49%,_rgba(153,153,153,0.19)_96.65%)]  text-6xl 2xl:text-7xl font-bold tracking-widest opacity-20 uppercase">
            TheNewsCrypto
          </span>
        </div>
      </div>
    </div>
  );
}

function ArticleLink({ title, slug }: { title: string; slug: string }) {
  return (
    <div className="border-b border-[#d9d9d9]/20 pb-6">
      <div className="flex justify-between items-center">
        <Link href={`/posts/${slug}`} className="text-lg font-normal pr-4 hover:underline">
          {title}
        </Link>
        <ArrowRight className="text-[#d9d9d9] flex-shrink-0 mr-8" />
      </div>
    </div>
  );
}
