import React from "react";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const LanguageSelector = () => {
  return (
    <Select defaultValue="english">
      <SelectTrigger className="border-none shadow-none h-6 py-0 uppercase font-semibold cursor-default">
        <SelectValue>English</SelectValue>
      </SelectTrigger>
    </Select>
  );
};

export default LanguageSelector;
