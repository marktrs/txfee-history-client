/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  env: {
    BINANCE_API_URL: process.env.BINANCE_API_URL,
    INDEXER_API_URL: process.env.INDEXER_API_URL,
  },
};

module.exports = nextConfig;
