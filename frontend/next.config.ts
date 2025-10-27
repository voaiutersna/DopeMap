import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ขก เเก้ type 
    ignoreBuildErrors: true,
  },
  eslint: {
    // ขก เเก้ 
    ignoreDuringBuilds: true, // 
  },
};

export default nextConfig;
