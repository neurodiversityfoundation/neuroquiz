/** @type {import('next').NextConfig} */
const nextConfig = {
  // This allows the build to succeed even if there are TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
  // This allows the build to succeed even if there are ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
