export type Pool = {
  provider: string;
  symbol: string;
  address: string;
};

export type Transaction = {
  gas: number;
  time: string;
  tx_hash: string;
};

export type TransactionQueryDto = {
  searchQuery: string;
  dateRange: {
    startDate: string | null;
    endDate: string | null;
  };
  timeRange: {
    startTime: string;
    endTime: string;
  };
  page: number;
  limit: number;
};

export type PageQueryData = {
  from: number;
  to: number;
  total: number;
};

export type EtherscanTxQuery = {
  module: string;
  action: string;
  address: string;
  startblock: number;
  endblock: number;
  sort: string;
  page: number;
  offset: number;
  apikey: string;
};
