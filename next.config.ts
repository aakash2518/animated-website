import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.jsdelivr.net"],
  },
};

export default nextConfig;
