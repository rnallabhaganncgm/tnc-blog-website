import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import HeroSection from "./hero-section";
import EditorsChoice from "./editors-choice";

function HomeView() {
  return (
    <div className="flex flex-col gap-20">
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
