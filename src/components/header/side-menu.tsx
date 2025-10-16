import React from "react";
import { Button } from "../ui/button";
import { MdMenuOpen } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SideMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="h-auto w-max px-0 py-0 has-[>svg]:px-0 hover:cursor-pointer hover:bg-transparent"
        >
          <MdMenuOpen className="size-7 lg:size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
