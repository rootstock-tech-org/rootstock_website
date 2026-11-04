import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "https://e9cwq4w7punvx7-3000.proxy.runpod.net",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
  outputFileTracingIncludes: {
    '/api/consultation': ['./config/email-settings.txt'],
    '/api/contact': ['./config/email-settings.txt'],
    '/api/apply': ['./config/email-settings.txt'],
  },
};

export default nextConfig;
