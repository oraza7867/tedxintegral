import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/sa/tedxiitg',
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
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
