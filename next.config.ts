import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@neondatabase/serverless", "sharp"],
  allowedDevOrigins: ["*.replit.dev"],
};

export default nextConfig;
