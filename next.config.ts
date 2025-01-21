import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true
  },
  "compilerOptions": {
    "strict": false
  }
};

export default nextConfig;
