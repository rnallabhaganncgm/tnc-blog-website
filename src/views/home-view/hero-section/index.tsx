import React from "react";
import LatestNews from "./latest-news";
import { apiClient } from "@/lib/apiClient";
import PinnedArticles from "./pineed-articles";
import MostRead from "./most-read";

const HeroSection = async () => {
  const posts = await apiClient("/api/posts/latest", {
    method: "GET",
    cache: "no-store",
  });
  const pinnedArticles = posts.slice(0, 5);
  const latestNews = posts.slice(5);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr_.75fr] gap-4 w-full items-stretch">
      <LatestNews posts={latestNews} />
      <PinnedArticles posts={pinnedArticles} />
      <div className="w-full">
        <div className="space-y-6 mb-5">
          <div className="bg-muted rounded-2xl p-4 shadow-md text-center">
            <p className="text-sm font-semibold">Advertisement</p>
            <div className="mt-3 aspect-[4/4] bg-gray-200 rounded-xl" />
          </div>
        </div>
        <MostRead />
      </div>
    </section>
  );
};

export default HeroSection;
