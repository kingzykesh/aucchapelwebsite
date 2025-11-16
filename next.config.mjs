/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Main Pixieset domain
      {
        protocol: "https",
        hostname: "pixieset.com",
      },

      // Subdomains like abc.pixieset.com
      {
        protocol: "https",
        hostname: "*.pixieset.com",
      },

      // Pixieset App CDN
      {
        protocol: "https",
        hostname: "*.pixieset.app",
      },

      // Pixieset IO CDN
      {
        protocol: "https",
        hostname: "*.pixieset.io",
      },

      // Pixieset NET CDN
      {
        protocol: "https",
        hostname: "*.pixieset.net",
      },

      // Pixieset CDN
      {
        protocol: "https",
        hostname: "*.pixiesetcdn.com",
      },

      // Additional CDN
      {
        protocol: "https",
        hostname: "*.pf-cdn.com",
      },
    ],
  },
};

export default nextConfig;
