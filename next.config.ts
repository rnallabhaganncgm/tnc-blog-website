import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["coin-images.coingecko.com", "thenewscrypto.com"],
  },
};

export default nextConfig;
