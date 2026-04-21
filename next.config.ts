import type { NextConfig } from "next";

import createNextIntPlugin from "next-intl/plugin";

const withNextIntl = createNextIntPlugin()

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    'http://fe.layanan-antar-obat.test'
  ],
  reactStrictMode: true
};


export default withNextIntl(nextConfig)
