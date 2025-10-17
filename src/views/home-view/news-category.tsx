"use client"; // required for client components

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import Link from "next/link";

// Define the post types
interface NewsItem {
  id: number;
  title: string;
  thumbnail_url: string;
  post_date: string;
  post_content: string;
  slug: string;
}

interface NewsCardData {
  title: string;
  featured: NewsItem;
  related: NewsItem[];
}

interface NewsCardProps {
  featured: NewsItem;
  related: NewsItem[];
}

// NewsCard component (UI unchanged)
const NewsCard = ({ featured, related }: NewsCardProps) => {
  const formatTimeAgo = (date: string) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (diff < 60) return `${diff} mins ago`;
    return `${Math.floor(diff / 60)} hrs ago`;
  };

  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return `${Math.ceil(words / 200)} mins read`;
  };

  return (
    <div className="relative h-full flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-[#00000059]">
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-visible">
        <div className="h-[0.625rem] w-[6.25rem] flex items-center justify-center px-4 py-1 bg-primary"></div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        {/* Featured Article */}
        <div className="mb-6">
          <div className="rounded-2xl overflow-hidden mb-4">
            <Image
              src={featured.thumbnail_url || "/alt.png"}
              alt={featured.title || "Featured news image"}
              width={560}
              height={320}
              className="w-full h-48 object-cover"
            />
          </div>
          <Link
            href={`/posts/${featured.slug}`}
            className="text-[#000000] text-xl font-bold leading-tight mb-2 hover:text-primary"
          >
            {featured.title}
          </Link>
          <div className="flex items-center justify-between text-[#7f7f7f]">
            <div className="flex items-center">
              <span className="text-sm">{formatTimeAgo(featured.post_date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">{getReadTime(featured.post_content)}</span>
            </div>
          </div>
        </div>

        {/* Related News */}
        <div className="space-y-6">
          {related.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={item.thumbnail_url || "/alt-2.png"}
                  alt={item.title || "Related news image"}
                  width={96}
                  height={96}
                  className="w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <Link
                  href={`/posts/${item.slug}`}
                  className="text-black/80 font-semibold text-sm leading-tight hover:text-primary"
                >
                  {item.title}
                </Link>
                <div className="flex justify-between text-[#7f7f7f] text-xs items-end">
                  <div className="flex items-center">
                    <span>{formatTimeAgo(item.post_date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{getReadTime(item.post_content)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component
export default function NewsCategory() {
  const [newsCards, setNewsCards] = useState<NewsCardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const categories = ["bitcoin-news", "ethereum-news", "altcoin-news"];
        const results: NewsCardData[] = [];

        for (const category of categories) {
          const res = await fetch(`/api/posts/category/${category}?limit=4`);
          const postsData = await res.json();

          // Map API response to expected structure
          const posts: NewsItem[] = postsData.map((p: any) => ({
            id: p.ID,
            title: p.post_title,
            thumbnail_url: p.thumbnail_url || "/alt.png",
            post_date: p.post_date,
            post_content: p.post_content,
            slug: p.slug || p.ID.toString(),
          }));

          if (posts.length > 0) {
            results.push({
              title: category.replace("-", " ").toUpperCase(),
              featured: posts[0],
              related: posts.slice(1),
            });
          }
        }

        setNewsCards(results);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 gap-2 items-stretch">
        {newsCards.map((card) => (
          <div key={`${card.title}-${card.featured.id}`} className="flex flex-col h-full">
            <h2 className="text-3xl font-bold text-[#000] text-center mb-[1.44rem]">
              {card.title}
            </h2>
            <NewsCard featured={card.featured} related={card.related} />
          </div>
        ))}
      </div>
    </div>
  );
}
