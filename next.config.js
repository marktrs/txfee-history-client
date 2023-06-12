/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    ETHERSCAN_API_URL: process.env.ETHERSCAN_API_URL,
    BINANCE_API_URL: process.env.BINANCE_API_URL,
    INDEXER_API_URL: process.env.INDEXER_API_URL,
  },
};

module.exports = nextConfig;
