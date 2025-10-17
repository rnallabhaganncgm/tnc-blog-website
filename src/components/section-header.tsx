import React from "react";

interface SectionHeaderProps {
  title: string;
  subTitle: string;
}

const SectionHeader = ({ title, subTitle }: SectionHeaderProps) => {
  return (
    <div className="relative">
      <h1 className="text-5xl text-[#0303031f] absolute bottom-3.5 font-black left-0">
        {title}
      </h1>

      <div className="flex flex-row items-center space-x-1">
        <div className="w-2 h-5 bg-primary"></div>
        <h1 className="text-3xl font-semibold">{subTitle}</h1>
      </div>
    </div>
  );
};

export default SectionHeader;
