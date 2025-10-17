import React from "react";
import LatestNews from "./latest-news";
import { apiClient } from "@/lib/apiClient";

const HeroSection = async () => {
  const posts = await apiClient("/api/posts/latest", {
    method: "GET",
    cache: "no-store",
  });
  const latestFive = posts.slice(0, 5);
  const latestNews = posts.slice(5);

  return (
    <section className="grid grid-cols-3">
      <LatestNews posts={latestNews} />
    </section>
  );
};

export default HeroSection;
