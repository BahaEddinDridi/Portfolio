import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons", "motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only generates the qualities listed here; the carousel serves 75
    // on mobile and 90 on desktop.
    qualities: [75, 90],
  },
};

export default nextConfig;
