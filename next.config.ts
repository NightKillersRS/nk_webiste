import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "runepixels.com",
        pathname: "/assets/images_temp/**"
      }
    ]
  }
};

export default nextConfig;
