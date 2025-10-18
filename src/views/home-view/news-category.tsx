import Image from "next/image";
import { BookOpen } from "lucide-react";
import { apiClient } from "@/lib/apiClient";
import { Post } from "@/types";
import Link from "next/link";
import { humanizeDate, getReadTime } from "@/lib/utils";

interface NewsItem {
  id: number;
  image: string;
  title: string;
  timeAgo: string;
  readTime: string;
  slug: string;
}

interface NewsCardData {
  title: string;
  slug: string;
  featured: NewsItem | null;
  related: NewsItem[];
}

interface NewsCardProps {
  featured: NewsItem;
  related: NewsItem[];
}

const NewsCard = ({ featured, related }: NewsCardProps) => {
  return (
    <div className="relative h-full flex flex-col bg-white rounded-3xl p-6 shadow-sm border border-[#00000059]">
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-visible">
        <div className="h-[0.625rem] w-[6.25rem] flex items-center justify-center px-4 py-1 bg-primary"></div>
      </div>

      <div className="flex flex-col justify-between flex-1">
        {/* Featured Article */}
        <div className="mb-6">
          <Link href={featured.slug}>
            <div className="rounded-2xl overflow-hidden mb-4 cursor-pointer">
              <Image
                src={featured.image}
                alt={featured.title}
                width={560}
                height={320}
                className="w-full h-48 object-cover"
              />
            </div>
          </Link>
          <Link href={featured.slug} className="hover:text-primary">
            <h1 className="text-[#000000] text-xl font-bold leading-tight mb-2 hover:text-primary ">
              {featured.title}
            </h1>
          </Link>
          <div className="flex items-center justify-between text-[#7f7f7f]">
            <div className="flex items-center">
              <span className="text-sm">{humanizeDate(featured.timeAgo)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">{getReadTime(featured.readTime)}</span>
            </div>
          </div>
        </div>

        {/* Related News */}
        <div className="space-y-6">
          {related.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Link href={item.slug} className="w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={96}
                  height={96}
                  className="w-full h-full"
                />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <Link href={item.slug} className="hover:text-primary block">
                  <h2 className="text-black/80 font-semibold text-sm leading-tight hover:text-primary line-clamp-3">
                    {item.title}
                  </h2>
                </Link>
                <div className="flex justify-between text-[#7f7f7f] text-xs items-end">
                  <span>{humanizeDate(item.timeAgo)}</span>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{getReadTime(item.readTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Slugs for categories you want to show
const categories = [
  { title: "Bitcoin News", slug: "bitcoin-news" },
  { title: "Ethereum News", slug: "ethereum-news" },
  { title: "Altcoin News", slug: "altcoin-news" },
];

export default async function NewsCategory() {
  const newsCards: NewsCardData[] = await Promise.all(
    categories.map(async (cat) => {
      const posts: Post[] = await apiClient(
        `/api/posts/category/${cat.slug}?limit=4`,
        { method: "GET", cache: "no-store" }
      );

      if (!posts || posts.length === 0) {
        return { title: cat.title, slug: cat.slug, featured: null, related: [] };
      }

      const featuredPost = posts[0];
      const relatedPosts = posts.slice(1);

      return {
        title: cat.title,
        slug: cat.slug,
        featured: {
          id: featuredPost.ID,
          image: featuredPost.thumbnail_url || "/placeholder.png",
          title: featuredPost.post_title,
          timeAgo: featuredPost.post_date,
          readTime: featuredPost.post_content,
          slug: featuredPost.slug,
        },
        related: relatedPosts.map((post) => ({
          id: post.ID,
          image: post.thumbnail_url || "/placeholder.png",
          title: post.post_title,
          timeAgo: post.post_date,
          readTime: post.post_content,
          slug: post.slug,
        })),
      };
    })
  );

  return (
    <div className="w-full mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 gap-2 items-stretch">
        {newsCards.map((card) =>
          card.featured ? (
            <div key={card.slug} className="flex flex-col h-full">
              <h2 className="text-3xl font-bold text-[#000] text-center mb-[1.44rem] ">
                {card.title}
              </h2>
              <NewsCard featured={card.featured} related={card.related} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
