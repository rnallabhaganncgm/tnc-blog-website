import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import HeroSection from "./hero-section";

function HomeView() {
  return (
    <>
      <MaxWidthWrapper>
        <HeroSection />
      </MaxWidthWrapper>
    </>
  );
}

export default HomeView;
