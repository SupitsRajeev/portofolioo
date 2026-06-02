import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  typescript: {
    // Type-checking is run separately via `npm run typecheck`.
    // Next.js build will fail on TypeScript errors to ensure code quality.
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
