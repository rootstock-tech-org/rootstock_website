import type { NextConfig } from "next";

const nextConfig = {
  // Allow dev overlay/assets from an external proxy origin in development
  allowedDevOrigins: [
    "https://e9cwq4w7punvx7-3000.proxy.runpod.net",
  ],
  // Do not block production builds due to ESLint errors.
  // This unblocks Vercel deployments while we iterate on lint fixes.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
