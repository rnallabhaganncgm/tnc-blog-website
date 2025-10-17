import MaxWidthWrapper from "@/components/max-width-wrapper";
import { apiClient } from "@/lib/apiClient";
import React from "react";
import SocialShare from "./social-share";
import BlogBreadcrumb from "./blog-breadcrumb";
import PostHeader from "./post-header";
import { Thumbnail } from "./thumbnail";
import styles from "./styles.module.css";
import { BlogContent } from "./blog-content";
import { Separator } from "@/components/ui/separator";
import { PostTags } from "./post-tags";
import AuthorBio from "./author-bio";
import Subscriber from "./subscriber";
import { BannerSidebar } from "./banner-sidebar";
import { Post } from "@/types";

interface PostViewProps {
  slug: string;
}
const PostView = async ({ slug }: PostViewProps) => {
  const post = await apiClient<Post>(`/api/posts/${slug}`, {
    method: "GET",
    cache: "no-store",
  });

  return (
    <MaxWidthWrapper className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[auto_4fr_1.5fr] gap-8 mt-5">
        <SocialShare />
        <div className="flex flex-col space-y-10">
          <div className="space-y-6">
            <BlogBreadcrumb
              categoryName={post.category_name || "Uncategorized"}
            />
            <PostHeader
              title={post.post_title}
              description={post.post_excerpt || ""}
              author={{
                name: post.author_name,
                avatarUrl: post.author_avatar_url,
              }}
              readTime="5 min read"
              published={new Date(post.post_date).toLocaleDateString()}
              updated={
                post.post_modified
                  ? new Date(post.post_modified).toLocaleDateString()
                  : undefined
              }
            />
            <Thumbnail thumbnailUrl={post.thumbnail_url} />
          </div>

          <div className={styles.sectionSpacing}>
            <BlogContent content={post.post_content} />
            <Separator className={styles.separatorCustom} />
            <PostTags tags={post.tags?.split(", ") || []} />
          </div>

          <div className={styles.sectionSpacing}>
            <AuthorBio
              author={{
                name: post.author_name,
                slug: post.author_slug,
                image: post.author_avatar_url || "",
                bio: post.author_bio || "",
              }}
            />
            <Subscriber />
          </div>
        </div>
        <aside className={styles.sidebar}>
          <BannerSidebar />
        </aside>
      </div>
    </MaxWidthWrapper>
  );
};

export default PostView;
