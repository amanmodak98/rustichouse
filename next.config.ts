import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lenis', 'clsx', 'gsap'],
  },
  compiler: {
    removeConsole: { exclude: ['error', 'warn'] },
  },
};

export default nextConfig;
