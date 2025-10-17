"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function HeatMapTabs() {
  const [activeTab, setActiveTab] = useState("Volume")

  const tabs = ["Volume", "Charge", "Liquidation", "Open Interest"]

  return (
    <div className="w-full bg-[#cfcfcf] rounded-md flex flex-col items-center p-1">
    <div className="flex w-full space-x-0 items-center justify-start">
  
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-md text-base font-medium transition-colors",
              activeTab === tab ? "bg-[#1e1616] text-white" : "text-black hover:bg-[#c0c0c0]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      
    </div>
  )
}
