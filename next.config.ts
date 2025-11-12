import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: false,
  async redirects() {
    return [
      // Gracefully support old root-level detail URLs, e.g. /starry-night -> /galeria/starry-night
      {
        source: "/:slug",
        destination: "/galeria/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
