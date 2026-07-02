import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The service detail page was merged into the homepage; query params
    // (e.g. Stripe payment status) are passed through automatically.
    return [
      {
        source: "/kontrola-vozidla",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
