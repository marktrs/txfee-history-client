interface AppConfig {
  provider: {
    etherscan: {
      apiKey: string;
      url: string;
    };
    binance: {
      url: string;
    };
    indexer: {
      url: string;
    };
    proxy: {
      url: string;
    };
  };
}

export const AppConfig = (): AppConfig => {
  return {
    provider: {
      etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY || "",
        url: process.env.ETHERSCAN_API_URL || "",
      },
      binance: {
        url: process.env.BINANCE_API_URL || "",
      },
      indexer: {
        url: process.env.INDEXER_API_URL || "",
      },
      proxy: {
        url: process.env.PROXY_API_URL || "",
      },
    },
  };
};
