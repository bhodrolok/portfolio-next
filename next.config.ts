import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  // Enable Statically Typed Links for e2e type safety for internal navigation
  // plus help catch broken links when editing/compiling project
  typedRoutes: true
};

export default nextConfig;
