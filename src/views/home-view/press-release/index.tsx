// app/components/PressReleaseServer.tsx
import { apiClient } from "@/lib/apiClient";
import { Post } from "@/types";
import PressReleaseSwiper from "./press-release-swiper";

const PressReleaseServer = async () => {
  const posts: Post[] = await apiClient("/api/posts/category/press-release?limit=6", {
    method: "GET",
    cache: "no-store",
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500 text-lg">
        No press releases available 😕
      </div>
    );
  }

  return <PressReleaseSwiper posts={posts} />;
};

export default PressReleaseServer;
