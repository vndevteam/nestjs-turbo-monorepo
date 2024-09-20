/** @type {import('next').NextConfig} */
import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

const isProduction = process.env.NODE_ENV === "production";
const assetPrefix = isProduction ? "/nestjs-turbo-monorepo" : "";

const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix,
  basePath: assetPrefix,
  output: "export",
};

export default withNextra(nextConfig);
