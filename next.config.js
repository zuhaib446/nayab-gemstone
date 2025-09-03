/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // keep if you don’t want Next.js image optimization
  },
};

module.exports = nextConfig;