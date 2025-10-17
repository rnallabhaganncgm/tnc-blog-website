import PostView from "@/views/post-view";
import React from "react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}
async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  return <PostView slug={slug} />;
}

export default PostPage;
