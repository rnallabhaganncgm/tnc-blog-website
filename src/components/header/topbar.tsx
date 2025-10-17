import React from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import SideMenu from "./side-menu";
import Image from "next/image";
import MaxWidthWrapper from "../max-width-wrapper";
import Link from "next/link";

const Topbar = () => {
  return (
    <MaxWidthWrapper className="flex items-center justify-between gap-3 sm:gap-0">
      <Link href={"/"} className="order-1 sm:order-2">
        <Image
          src={"/assets/logo.svg"}
          alt="Logo"
          width={250}
          height={42}
          className="w-64 h-8"
        />
      </Link>

      <div className="flex items-center gap-2 lg:gap-3 order-2 sm:order-1">
        <Button
          variant={"ghost"}
          className="h-auto w-max px-0 py-0 has-[>svg]:px-0 hover:cursor-pointer hover:bg-transparent"
        >
          <Search className="size-6 lg:size-5" />
        </Button>
        <SideMenu />
      </div>

      <Button
        size={"lg"}
        variant={"outline"}
        className="hidden sm:block order-3 hover:cursor-pointer"
      >
        Advertise
      </Button>
    </MaxWidthWrapper>
  );
};

export default Topbar;
