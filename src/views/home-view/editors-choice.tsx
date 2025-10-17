import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"; // Import shadcn Card components
import { BiFilter } from "react-icons/bi";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/apiClient";
import { Post } from "@/types";
import { getReadTime, humanizeDate } from "@/lib/utils";
import Link from "next/link";

const EditorsChoice = async () => {
  const posts: Post[] = await apiClient(
    "/api/posts/category/editors-news?limit=4",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!posts) return;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short", // "Nov"
      day: "2-digit", // "11"
      year: "numeric", // "2024"
    });
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="relative w-full sm:w-auto">
          <h1 className="text-5xl text-[#0303031f] absolute bottom-3.5 font-black left-0">
            Editors
          </h1>
          <div className="flex flex-row items-center space-x-1">
            <div className="w-2 h-5 bg-primary"></div>
            <h1 className="text-3xl font-medium">Editors</h1>
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            className="px-4 py-[0.62rem] rounded-[0.5625rem] text-base"
          >
            More Articles
          </Button>
          <Button
            variant="default"
            className="text-base px-5 py-3 rounded-[0.5625rem] font-normal flex items-center gap-2"
          >
            Customize News <BiFilter className="size-5" />
          </Button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {posts.map((post, index) => (
          <Card
            key={index}
            className="rounded-xl overflow-hidden p-0 border border-[#00000033] gap-0"
          >
            <CardHeader className="p-[0.88rem] gap-0">
              <div className="relative h-48 w-full">
                <Image
                  src={post?.thumbnail_url ?? ""}
                  alt={post.post_title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-2 pb-0 gap-0">
              <Link
                href={post.slug}
                className="text-base font-medium mb-2 hover:text-primary line-clamp-2"
              >
                {post.post_title}
              </Link>
            </CardContent>
            <CardFooter className="px-4 pb-4  gap-0">
              <div className="flex flex-wrap items-center justify-between w-full text-xs text-[#222222]/70">
                <div className="flex items-center gap-1">
                  <span>{humanizeDate(post.post_date)}</span>
                  <span className="mx-1">•</span>
                  <span>{formatDate(post.post_date)}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <BookOpen className="w-4 h-4" />
                  <span>{getReadTime(post.post_content)}</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EditorsChoice;
