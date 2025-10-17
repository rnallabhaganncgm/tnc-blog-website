import { Separator } from "@/components/ui/separator";
import { Post } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PinnedArticlesProps {
  posts: Post[];
}

const PinnedArticles = ({ posts }: PinnedArticlesProps) => {
  return (
    <div className="p-4 sm:p-6 sm:pt-0 sm:pb-0 border-t lg:border-t-0 lg:border-l lg:border-r border-border flex flex-col h-full">
      <h1 className="text-2xl font-bold text-center mb-5">
        <Link
          href={`/${posts[0].slug}`}
          className="hover:underline hover:text-primary transition-colors"
        >
          {posts[0].post_title}
        </Link>
      </h1>
      <div className="bg-white rounded-3xl overflow-hidden flex flex-col h-full">
        <div className="relative w-full overflow-hidden h-full">
          <Link href={`/${posts[0].slug}`}>
            {posts[0].thumbnail_url ? (
              <Image
                src={posts[0].thumbnail_url}
                alt={posts[0].post_title}
                fill
                className="object-cover w-full h-full rounded-lg cursor-pointer"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
            ) : (
              <div className="bg-gray-200 w-full h-full" />
            )}
          </Link>
        </div>
      </div>
      <div className="space-y-5 mt-5">
        {posts.map((a, i) => (
          <div key={a.ID}>
            <article className="space-y-2">
              {/* 🔗 clickable smaller articles */}
              <Link
                href={`/${a.slug}`}
                className="text-lg font-medium leading-tight hover:text-primary transition-colors duration-200"
              >
                {a.post_title}
              </Link>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-[0.8125rem]">
                    {new Date(a.post_date).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    ago
                  </span>
                  <span className="text-gray-400 text-[0.8125rem]">•</span>
                  <span className="text-primary text-[0.8125rem]">
                    {a.category_name}
                  </span>
                </div>
                <span className="text-gray-400 text-[0.8125rem]">
                  {new Date(a.post_date).toLocaleDateString()}
                </span>
              </div>
            </article>
            {i !== posts.length - 1 && (
              <Separator className="mt-3 bg-[#00000033]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PinnedArticles;
