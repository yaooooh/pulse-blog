import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: './app',
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
  },
};

export default nextConfig;
