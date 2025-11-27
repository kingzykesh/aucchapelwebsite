/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "pixieset.com" },
      { protocol: "https", hostname: "*.pixieset.com" },
      { protocol: "https", hostname: "*.pixieset.app" },
      { protocol: "https", hostname: "*.pixieset.io" },
      { protocol: "https", hostname: "*.pixieset.net" },
      { protocol: "https", hostname: "*.pixiesetcdn.com" },
      { protocol: "https", hostname: "*.pf-cdn.com" },
    ],
  },
};

export default nextConfig;
