import dayjs from "dayjs";
import { AppConfig } from "./config";
import type { PageQueryData, TransactionQueryDto } from "./types";

export const fetchTxsFromQuery = async function ({
  txQuery,
}: {
  txQuery: TransactionQueryDto;
}) {
  const { provider } = AppConfig();
  const url = new URL(provider.indexer.url);

  const headers = new Headers();
  headers.append("Prefer", "count=exact");
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  url.pathname = "/events";
  url.search = prepareTxQryParam({ txQuery });

  const res = await fetch(url.toString(), requestOptions);
  if (!res.ok) {
    throw new Error("Failed to fetch transaction data");
  }

  const transactions = await res.json();
  const pageData = getPaginationData(res.headers.get("Content-Range"));

  return {
    transactions,
    pageData,
  };
};

const prepareTxQryParam = ({ txQuery }: { txQuery: TransactionQueryDto }) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", txQuery.limit.toString() || "50");
  // offset start from 0 but page start from 1 so we need to subtract 1
  searchParams.append(
    "offset",
    ((txQuery.page - 1) * txQuery.limit).toString() || "0"
  );

  const { dateRange, timeRange } = txQuery;
  dateRange.startDate = dateRange.startDate || dayjs().format("YYYY-MM-DD");
  timeRange.startTime = timeRange.startTime || "00:00";
  const startTimeUnix = dayjs(
    `${dateRange.startDate} ${timeRange.startTime}`,
    "YYYY-MM-DD HH:mm"
  )
    .unix()
    .toString();

  dateRange.endDate = dateRange.endDate || dateRange.startDate;
  timeRange.endTime = timeRange.endTime || "23:59";
  const endTimeUnix = dayjs(
    `${dateRange.endDate} ${timeRange.endTime}`,
    "YYYY-MM-DD HH:mm"
  )
    .unix()
    .toString();

  searchParams.append("order", "time.desc");
  searchParams.append("time", `gte.${startTimeUnix}`);
  searchParams.append("time", `lte.${endTimeUnix}`);

  if (txQuery.searchQuery) {
    searchParams.append("tx_hash", `imatch.${txQuery.searchQuery}`);
  }

  return searchParams.toString();
};

const getPaginationData = (rangeData: string | null): PageQueryData => {
  if (!rangeData) {
    return {
      from: 0,
      to: 0,
      total: 0,
    };
  }

  const [range, total] = rangeData.split("/");
  const [from, to] = range.split("-");

  return {
    from: parseInt(from) + 1, // range start from 0 but item count start from 1
    to: parseInt(to) + 1, // so we need to add 1 to get the correct value
    total: parseInt(total),
  };
};

export const fetchPriceFromBinance = async ({
  symbol,
  limit,
}: {
  symbol: string;
  limit: number;
}) => {
  const { provider } = AppConfig();
  const url = new URL(provider.binance.url);

  const headers = new Headers();
  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  url.pathname = "/api/v3/trades";
  url.search = preparePriceQryParam(symbol, limit);

  const res = await fetch(url.toString(), requestOptions);
  if (!res.ok) {
    throw new Error(`Failed to fetch price data for ${symbol}`);
  }

  const data = await res.json();

  return {
    latest: parseFloat(data[0].price).toFixed(2),
  };
};

export const fetchPriceProxy = async ({
  symbol,
  limit,
}: {
  symbol: string;
  limit: number;
}) => {
  const { provider } = AppConfig();
  const url = new URL(provider.proxy.url);

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: headers,
  };

  url.pathname = "/api/price";
  url.search = preparePriceQryParam(symbol, limit);

  const res = await fetch(url.toString(), requestOptions);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch proxy data from ${url.toString} for symbol ${symbol} `
    );
  }

  const data = await res.json();

  return {
    latest: parseFloat(data.latest).toFixed(2),
  };
};

const preparePriceQryParam = (symbol: string, limit: number) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", limit.toString() || "1");
  searchParams.append("symbol", symbol);
  return searchParams.toString();
};
