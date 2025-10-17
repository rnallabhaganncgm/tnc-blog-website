import React from "react";

const NotFoundView = () => {
  return (
    <section className="h-[calc(100vh-200px)]">
      <div className="flex items-center justify-center gap-4 h-full">
        <h1 className="font-extrabold text-base">404</h1>
        <div className="bg-border h-12 w-0.5" />
        <h3 className="text-base font-medium">This page could not be found.</h3>
      </div>
    </section>
  );
};

export default NotFoundView;
