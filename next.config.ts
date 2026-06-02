import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/sa/tedxiul',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/aboutUs',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contactUs',
        destination: '/contact',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
