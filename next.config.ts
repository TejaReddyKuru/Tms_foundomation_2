import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "/api/admin/:path*", // Forwards /admin to Django in /api/
      },
    ];
  },
};

export default nextConfig;
