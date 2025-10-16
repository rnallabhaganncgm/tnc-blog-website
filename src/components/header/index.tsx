import React from "react";
import PriceMarquee from "./price-marquee";
import Topbar from "./topbar";
import Navigation from "./navigation";
import LanguageSelector from "./language-selector";
import MaxWidthWrapper from "../max-width-wrapper";

const Header = () => {
  return (
    <header className="pt-3 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <Topbar />
      <div className="hidden lg:block border-b py-3">
        <MaxWidthWrapper className="flex items-center justify-between ">
          <Navigation />
          <LanguageSelector />
        </MaxWidthWrapper>
      </div>
      <PriceMarquee />
    </header>
  );
};

export default Header;
