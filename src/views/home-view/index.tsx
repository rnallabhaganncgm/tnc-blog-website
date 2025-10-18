import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import HeroSection from "./hero-section";
import EditorsChoice from "./editors-choice";
import NewsCategory from "./news-category";
import TrendingNews from "./trending-news";
import Image from "next/image";
import PressRelease from "./press-release";
import PricePrediction from "./price-prediction";
import TwitterInterface from "./twitter-interface-card";
import Heatmap from "./heatmap";
import ExchangeNews from "./exchange-news";
import UpcomingEvents from "./events";
import Newsletter from "./news-letter";


function HomeView() {
  return (
    <div className="flex flex-col gap-20">
      <Image
        src="/assets/trending.png"
        alt="Hero Image"
        width={1920}
        height={1080}
        className="w-full h-full px-24"
      />
      <MaxWidthWrapper>
        <HeroSection />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <EditorsChoice />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <PressRelease />
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <PricePrediction />
      </MaxWidthWrapper>

      <Image
        src="/assets/banner-2.png"
        alt="Banner Image"
        width={1920}
        height={1080}
        className="w-full h-full px-64"
      />
      <MaxWidthWrapper>
        <div className="flex xl:flex-row flex-col items-center xl:items-start xl:justify-around gap-10">
          <TwitterInterface />
          <Heatmap />
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper>
        <ExchangeNews />
      </MaxWidthWrapper>

      <div className="bg-[#14151e]">
        <MaxWidthWrapper>
          <UpcomingEvents />
        </MaxWidthWrapper>
          
      </div>

       <MaxWidthWrapper>
        <NewsCategory />
      </MaxWidthWrapper>

      <div className="bg-[#121212] text-white">
        <MaxWidthWrapper >
          <TrendingNews />
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        <Newsletter />
      </MaxWidthWrapper>

     



    </div>
  );
}

export default HomeView;
