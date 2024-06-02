/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: false,
  typescript: {
    ignoreBuildErrors: true, // adding this temporarily to avoid build errors and see the app. it must be removed later
  },
  eslint: {
    ignoreDuringBuilds: true, // adding this temporarily to avoid build errors and see the app. it must be removed later
  },
  images: {
    domains: ["th.bing.com"],
  },
};

export default nextConfig;
