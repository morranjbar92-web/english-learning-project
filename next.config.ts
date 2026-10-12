import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/english-learning-project",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
