/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['drive.google.com', 'cdn.repliers.io'],
  },
};

module.exports = nextConfig;
