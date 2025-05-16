import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // allow Sanity image URLs
  },
};

export default nextConfig;
