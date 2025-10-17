import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import HeroSection from "./hero-section";
import EditorsChoice from "./editors-choice";
import Image from "next/image";

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
    </div>
  );
}

export default HomeView;
