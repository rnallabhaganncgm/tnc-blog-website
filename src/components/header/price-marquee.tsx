"use client";
import React from "react";
import MaxWidthWrapper from "../max-width-wrapper";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

const CryptoDataItem = ({
  current_price,
  price_change_percentage_24h,
  name,
  image,
  symbol,
}: CryptoData) => {
  const isNegative = price_change_percentage_24h < 0;
  return (
    <div className="mx-2.5 flex items-center gap-2">
      <Image
        className="w-5 h-5"
        alt={name}
        width={20}
        height={20}
        src={image}
      />
      <span className="text-xs font-bold">{name}</span>
      <span className="text-xs uppercase">{symbol}</span>
      <span className="text-xs">${current_price.toFixed(2)}</span>
      <span
        className={`text-xs ${
          isNegative ? "text-destructive" : "text-success"
        }`}
      >{`${isNegative ? "" : "+"}${price_change_percentage_24h.toFixed(
        2
      )}%`}</span>
    </div>
  );
};

const PriceMarquee = () => {
  const { data = [] } = useQuery({
    queryKey: ["markets"],
    queryFn: async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
      );
      return response.data;
    },
  });

  return (
    <MaxWidthWrapper className="py-2.5 mt-5 sm:mt-0 flex items-center gap-0.5">
      <div className="flex items-center gap-3 border-r border-r-black/50 pr-2.5">
        <span className="text-primary text-base lg:text-2xl uppercase font-medium">
          Live
        </span>
        <span className="text-xs lg:text-sm">Stream</span>
      </div>
      <Marquee pauseOnHover>
        {data.map((item: CryptoData, index: number) => (
          <CryptoDataItem {...item} key={index} />
        ))}
      </Marquee>
    </MaxWidthWrapper>
  );
};

export default PriceMarquee;
