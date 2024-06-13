/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ["@safetyculture/sc-web-ui"],
  },
  reactStrictMode: true,
};

export default nextConfig;
