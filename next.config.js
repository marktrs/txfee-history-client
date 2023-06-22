/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BINANCE_API_URL: process.env.BINANCE_API_URL,
    INDEXER_API_URL: process.env.INDEXER_API_URL,
    PROXY_API_URL: process.env.PROXY_API_URL,
  },
};

module.exports = nextConfig;
