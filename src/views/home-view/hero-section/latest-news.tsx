import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { Post } from "@/types";
import Link from "next/link";
import React from "react";

interface LatestNewsProps {
  posts: Post[];
}

const LatestNews = ({ posts }: LatestNewsProps) => {
  return (
    <div className="flex flex-col gap-12">
      <SectionHeader title="Latest" subTitle="Latest News" />
      <div className="bg-transparent">
        <div className="flex flex-col relative">
          <div className="absolute left-[6px] top-[16px] bottom-[16px] w-[2px] bg-gray-200" />
          <ScrollArea className="h-[50rem] pr-0">
            <div className="flex flex-col space-y-6">
              {posts?.map((post, index) => {
                return (
                  <div key={index} className="flex items-start mb-5">
                    <div className="flex items-center mr-3 relative z-10">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm text-gray-500">
                          {new Date(post.post_date).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span
                          className="ml-2 px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: "#bfe3f8" }}
                        >
                          {post.category_name}
                        </span>
                      </div>
                      <Link
                        href={`/${post.slug}`}
                        className="mt-4 text-base font-medium text-black leading-tight hover:text-primary hover:underline transition-colors"
                      >
                        {post.post_title}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-full mt-4 text-[#7F7F7F] border-[#7F7F7F] hover:cursor-pointer"
      >
        View all
      </Button>
    </div>
  );
};

export default LatestNews;
