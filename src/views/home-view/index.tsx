import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";
import HeroSection from "./hero-section";

function HomeView() {
  return (
    <main className="py-10">
      <MaxWidthWrapper>
        <HeroSection />
      </MaxWidthWrapper>
    </main>
  );
}

export default HomeView;
