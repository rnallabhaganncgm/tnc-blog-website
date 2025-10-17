// app/components/PressReleaseClient.tsx
"use client";

import { ArrowLeft, ArrowRight, BookOpen, StickyNote } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import "swiper/css/navigation";
import Link from "next/link";
import { getReadTime, humanizeDate } from "@/lib/utils";
import { Post } from "@/types";

interface Props {
  posts: Post[];
}

export default function PressReleaseSwiper({ posts }: Props) {
  return (
    <div className="mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="relative">
          <h1 className="text-5xl text-[#0303031f] absolute bottom-3.5 font-black left-0">
            Release
          </h1>
          <div className="flex flex-row items-center space-x-1">
            <div className="w-2 h-5 bg-primary"></div>
            <h1 className="text-3xl font-medium">Press Release</h1>
          </div>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-md border border-black px-3 py-2 text-sm text-[#1C1B1F]"
        >
          More articles <StickyNote />
        </Button>
      </div>

      {/* Swiper */}
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-8 z-10 flex items-center justify-center p-3 rounded-full border border-black/25">
          <Button
            id="prevBtn"
            size="icon"
            className="bg-black rounded-full shadow-lg disabled:opacity-50"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>
        </div>

        {/* Decorative Circle for Next */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-8 z-10 flex items-center justify-center p-3 rounded-full border border-black/25">
          <Button
            id="nextBtn"
            size="icon"
            className="bg-black rounded-full shadow-lg disabled:opacity-50"
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="w-[90%] mx-auto">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{ prevEl: "#prevBtn", nextEl: "#nextBtn" }}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {posts.map((post) => (
              <SwiperSlide key={post.ID}>
                <div className="w-full">
                  <div className="relative w-full h-48">
                    <Image
                      src={post.thumbnail_url || "/placeholder.png"}
                      alt={post.post_title}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                  <div className="mt-3">
                    <Link
                      href={post.slug}
                      className="font-semibold text-black text-lg leading-tight hover:text-primary line-clamp-2"
                    >
                      {post.post_title}
                    </Link>
                    <div className="flex items-center text-sm text-[#717171] mt-2 gap-2">
                      <span>{humanizeDate(post.post_date)}</span>
                      <span>•</span>
                      <span>{getReadTime(post.post_content)}</span>
                      <div className="flex items-center ml-auto gap-2">
                        <BookOpen className="h-4 w-4 text-[#717171]" />
                        <span>Read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
