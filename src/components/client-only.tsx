"use client";

import React, { useState, useEffect, ReactNode } from "react";
type ClientOnlyType = {
  children: ReactNode;
};
const ClientOnly = ({ children }: ClientOnlyType) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
