import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*", // Passes through to Vercel's API folder
      },
      {
        source: "/admin/:path*",
        destination: "/api/admin/:path*", // Forwards /admin to Django in /api/
      },
    ];
  },
};

export default nextConfig;
