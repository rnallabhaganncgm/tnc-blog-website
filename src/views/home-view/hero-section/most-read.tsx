"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Post } from "@/types";
import API from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";

function timeAgoFromDate(postDateStr: string): string {
  const postDate = new Date(postDateStr);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 60) return `${diffMins} mins ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hrs ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

// ✅ Updated with longer-range time filters
const timesOptions = [
  "All",
  "2 days ago",
  "3 days ago",
  "5 days ago",
  "7 days ago",
  "3 months",
  "6 months",
];

export default function MostRead() {
  const { data: posts = [] } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await API.get("/api/posts");
      return response.data;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await API.get("/api/categories");
      return response.data;
    },
  });

  const [category, setCategory] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(timesOptions[0]); // Default: "All"
  }, []);

  useEffect(() => {
    setCategory(categories[0]?.name ?? null);
  }, [categories]);

  // ✅ Improved accurate filtering logic
  const filteredPosts = posts.filter((post: Post) => {
    if (category && post.category_name !== category) return false;

    if (time && time !== "All") {
      const postDate = new Date(post.post_date);
      const now = new Date();

      switch (time) {
        case "2 days ago":
          if (now.getTime() - postDate.getTime() > 2 * 24 * 60 * 60 * 1000)
            return false;
          break;
        case "3 days ago":
          if (now.getTime() - postDate.getTime() > 3 * 24 * 60 * 60 * 1000)
            return false;
          break;
        case "5 days ago":
          if (now.getTime() - postDate.getTime() > 5 * 24 * 60 * 60 * 1000)
            return false;
          break;
        case "7 days ago":
          if (now.getTime() - postDate.getTime() > 7 * 24 * 60 * 60 * 1000)
            return false;
          break;
        case "3 months": {
          const limit = new Date();
          limit.setMonth(limit.getMonth() - 3);
          if (postDate < limit) return false;
          break;
        }
        case "6 months": {
          const limit = new Date();
          limit.setMonth(limit.getMonth() - 6);
          if (postDate < limit) return false;
          break;
        }
      }
    }

    return true;
  });

  return (
    <div className="w-full lg:w-[21rem] mx-auto bg-foreground text-white p-6 rounded-3xl relative overflow-hidden">
      <div className="absolute right-[-8.0625rem] top-[-5rem] w-[10.375rem] h-64 bg-[rgba(46,252,252,0.65)] blur-[62px] rounded-full" />

      <div className="relative mb-8 mt-4 z-10">
        <h1 className="text-5xl text-[#ffffff1a] absolute bottom-1.5 font-black left-0">
          Most Read
        </h1>
        <h1 className="text-3xl font-medium">Most Read</h1>
      </div>

      <div className="flex gap-2 mb-8 z-10">
        <Select value={category || ""} onValueChange={setCategory}>
          <SelectTrigger className="flex-1 bg-[#d9d9d9]/20 rounded-full py-1 px-2 text-gray-400 border border-[#ffffff1a]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category: Category, index: number) => (
              <SelectItem key={index} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={time || ""} onValueChange={setTime}>
          <SelectTrigger className="flex-1 bg-[#d9d9d9]/20 rounded-full py-1 px-2 text-gray-400 border border-[#ffffff1a]">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {timesOptions.map((t, index) => (
              <SelectItem key={index} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-10 z-10">
        {filteredPosts.slice(0, 3).map((article: Post) => (
          <article key={article.ID} className="space-y-2">
            <Link
              href={`/${article.slug}`}
              className="text-[0.875rem] font-medium leading-tight uppercase hover:text-primary"
            >
              {article.post_title}
            </Link>
            <div className="flex justify-between items-center text-gray-400 text-[0.8125rem]">
              <div className="flex items-center gap-2">
                <span>{timeAgoFromDate(article.post_date)}</span>
                <span>•</span>
                <span className="text-primary">{article.category_name}</span>
              </div>
              <span>{new Date(article.post_date).toLocaleDateString()}</span>
            </div>
          </article>
        ))}
      </div>
      <Button
        variant={"ghost"}
        className="w-full text-gray-400 mt-5 z-1 hover:cursor-pointer hover:bg-transparent hover:underline hover:text-white"
      >
        View More
      </Button>
    </div>
  );
}
