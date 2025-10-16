import React, { ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
}
const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return (
    <div className={`mx-auto w-full max-w-7xl ${className || ""}`}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
