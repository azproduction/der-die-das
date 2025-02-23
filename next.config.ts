import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  // Required for GitHub Pages compatibility
  basePath: process.env.NODE_ENV === "production" ? "/der-die-das" : "",
};

export default nextConfig;
