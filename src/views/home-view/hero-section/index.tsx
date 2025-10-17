import React from "react";
import LatestNews from "./latest-news";
import { apiClient } from "@/lib/apiClient";
import PinnedArticles from "./pineed-articles";

const HeroSection = async () => {
  const posts = await apiClient("/api/posts/latest", {
    method: "GET",
    cache: "no-store",
  });
  const pinnedArticles = posts.slice(0, 5);
  const latestNews = posts.slice(5);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 w-full items-stretch">
      <LatestNews posts={latestNews} />
      <PinnedArticles posts={pinnedArticles} />
    </section>
  );
};

export default HeroSection;
