import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Yardr-Doc',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
