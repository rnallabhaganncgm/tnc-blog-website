import React, { ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
}
const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-3 2xl:px-0 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
