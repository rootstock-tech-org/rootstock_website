import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "https://e9cwq4w7punvx7-3000.proxy.runpod.net",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
