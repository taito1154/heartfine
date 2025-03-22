import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ESLint エラーがあってもビルドを続行する
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
