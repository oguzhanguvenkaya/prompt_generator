import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@neondatabase/serverless"],
  allowedDevOrigins: ["*.replit.dev"],
};

export default nextConfig;
