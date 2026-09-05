/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
  qualities: [75],
  remotePatterns: [
      {
        protocol: "https",
        hostname: "iukppiuuyldfzfnjpctz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

module.exports = nextConfig;