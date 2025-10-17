<<<<<<< HEAD
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
=======
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { Post } from "@/types";
import Link from "next/link";
import { humanizeDate, getReadTime } from "@/lib/utils";

interface NewsItem {
  id: number;
  image: string;
  title: string;
  timeAgo: string;
  readTime: string;
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
  slug: string;
}

interface NewsCardData {
  title: string;
<<<<<<< HEAD
  featured: NewsItem;
=======
  slug: string;
  featured: NewsItem | null;
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
  related: NewsItem[];
}

interface NewsCardProps {
  featured: NewsItem;
  related: NewsItem[];
}

<<<<<<< HEAD
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

=======
const NewsCard = ({ featured, related }: NewsCardProps) => {
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
  return (
    <div className="relative h-full flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-[#00000059]">
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-visible">
        <div className="h-[0.625rem] w-[6.25rem] flex items-center justify-center px-4 py-1 bg-primary"></div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        {/* Featured Article */}
        <div className="mb-6">
<<<<<<< HEAD
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
=======
          <Link href={featured.slug}>
            <div className="rounded-2xl overflow-hidden mb-4 cursor-pointer">
              <Image
                src={featured.image}
                alt={featured.title}
                width={560}
                height={320}
                className="w-full h-48 object-cover"
              />
            </div>
          </Link>
          <Link href={featured.slug} className="hover:text-primary">
            <h1 className="text-[#000000] text-xl font-bold leading-tight mb-2 hover:text-primary ">
              {featured.title}
            </h1>
          </Link>
          <div className="flex items-center justify-between text-[#7f7f7f]">
            <div className="flex items-center">
              <span className="text-sm">{humanizeDate(featured.timeAgo)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">{getReadTime(featured.readTime)}</span>
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
            </div>
          </div>
        </div>

        {/* Related News */}
        <div className="space-y-6">
          {related.map((item) => (
            <div key={item.id} className="flex gap-4">
<<<<<<< HEAD
              <div className="w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={item.thumbnail_url || "/alt-2.png"}
                  alt={item.title || "Related news image"}
=======
              <Link href={item.slug} className="w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
                  width={96}
                  height={96}
                  className="w-full h-full"
                />
<<<<<<< HEAD
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
=======
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <Link href={item.slug} className="hover:text-primary block">
                  <h2 className="text-black/80 font-semibold text-sm leading-tight hover:text-primary line-clamp-3">
                    {item.title}
                  </h2>
                </Link>
                <div className="flex justify-between text-[#7f7f7f] text-xs items-end">
                  <span>{humanizeDate(item.timeAgo)}</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{getReadTime(item.readTime)}</span>
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
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

<<<<<<< HEAD
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
=======
// Slugs for categories you want to show
const categories = [
  { title: "Bitcoin News", slug: "bitcoin-news" },
  { title: "Ethereum News", slug: "ethereum-news" },
  { title: "Altcoin News", slug: "altcoin-news" },
];

export default async function NewsCategory() {
  const newsCards: NewsCardData[] = await Promise.all(
    categories.map(async (cat) => {
      const posts: Post[] = await apiClient(
        `/api/posts/category/${cat.slug}?limit=4`,
        { method: "GET", cache: "no-store" }
      );

      if (!posts || posts.length === 0) {
        return { title: cat.title, slug: cat.slug, featured: null, related: [] };
      }

      const featuredPost = posts[0];
      const relatedPosts = posts.slice(1);

      return {
        title: cat.title,
        slug: cat.slug,
        featured: {
          id: featuredPost.ID,
          image: featuredPost.thumbnail_url || "/placeholder.png",
          title: featuredPost.post_title,
          timeAgo: featuredPost.post_date,
          readTime: featuredPost.post_content,
          slug: featuredPost.slug,
        },
        related: relatedPosts.map((post) => ({
          id: post.ID,
          image: post.thumbnail_url || "/placeholder.png",
          title: post.post_title,
          timeAgo: post.post_date,
          readTime: post.post_content,
          slug: post.slug,
        })),
      };
    })
  );
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)

  return (
    <div className="w-full mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 gap-2 items-stretch">
<<<<<<< HEAD
        {newsCards.map((card) => (
          <div key={`${card.title}-${card.featured.id}`} className="flex flex-col h-full">
            <h2 className="text-3xl font-bold text-[#000] text-center mb-[1.44rem]">
              {card.title}
            </h2>
            <NewsCard featured={card.featured} related={card.related} />
          </div>
        ))}
=======
        {newsCards.map((card) =>
          card.featured ? (
            <div key={card.slug} className="flex flex-col h-full">
              <h2 className="text-3xl font-bold text-[#000] text-center mb-[1.44rem] ">
                {card.title}
              </h2>
              <NewsCard featured={card.featured} related={card.related} />
            </div>
          ) : null
        )}
>>>>>>> 6e8cfc2 (`Updated dependencies and code to reflect changes in package-lock.json and package.json`)
      </div>
    </div>
  );
}
