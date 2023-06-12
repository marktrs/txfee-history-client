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

  url.pathname = "/events";

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

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

  url.search = searchParams.toString();

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

export const fetchLatestBlock = async () => {
  return fetchBlockNumberByTimestamp(dayjs().unix().toString());
};

export const fetchBlockNumberByTimestamp = async (timestamp: string) => {
  const { provider } = AppConfig();
  const url = new URL(provider.etherscan.url);

  const apiQuery: Record<string, string> = {
    module: "block",
    action: "getblocknobytime",
    closest: "before",
    timestamp,
    apikey: provider.etherscan.apiKey,
  };

  url.search = new URLSearchParams(apiQuery).toString();

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch latest block number");
  }

  const data = await res.json();

  return data.result;
};

// Get transaction details by transaction hash
export const fetchTxFromHash = async (txHash: string) => {
  const { provider } = AppConfig();
  const url = new URL(provider.etherscan.url);

  const apiQuery: Record<string, string> = {
    module: "proxy",
    action: "eth_getTransactionByHash",
    apikey: provider.etherscan.apiKey,
    txhash: txHash,
  };

  url.search = new URLSearchParams(apiQuery).toString();

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch transaction count value");
  }

  const data = await res.json();

  return data.result;
};

export const fetchETHPrice = async () => {};

// Get total number of transactions by contract address
export const fetchTxCountByAddress = async (): Promise<number> => {
  const { provider } = AppConfig();
  const url = new URL(provider.etherscan.url);

  const apiQuery: Record<string, string> = {
    module: "proxy",
    action: "eth_getTransactionCount",
    address: "0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640", // TODO: move this address to config
    tag: "latest",
    apikey: provider.etherscan.apiKey,
  };

  url.search = new URLSearchParams(apiQuery).toString();

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error("Failed to fetch transaction count value");
  }

  const data = await res.json();

  return hexToInteger(data.result);
};

const setBlockQueryRangeAsync = async (
  txQuery: TransactionQueryDto,
  query: Record<string, string>
): Promise<Record<string, string>> => {
  const { dateRange, timeRange } = txQuery;

  // Get start block number from date and time, if not provided, use 0
  if (dateRange.startDate) {
    timeRange.startTime = timeRange.startTime || "00:00:00";
    query.startblock = await fetchBlockNumberByTimestamp(
      dayjs(
        `${dateRange.startDate} ${timeRange.startTime}`,
        "YYYY-MM-DD HH:mm:ss"
      )
        .unix()
        .toString()
    );
  }

  // Get end block number from date and time, if not provided, use latest block number
  if (dateRange.endDate) {
    timeRange.endTime = timeRange.endTime || "23:59:59";
    query.endblock = await fetchBlockNumberByTimestamp(
      dayjs(`${dateRange.endDate} ${timeRange.endTime}`, "YYYY-MM-DD HH:mm:ss")
        .unix()
        .toString()
    );
  } else {
    // Get latest block number
    query.endblock = await fetchLatestBlock();
  }

  return query;
};

const hexToInteger = (hex: string): number => {
  // Remove any leading "0x" if present
  if (hex.startsWith("0x")) {
    hex = hex.substring(2);
  }

  // Convert the hexadecimal string to an integer using parseInt
  const decimal = parseInt(hex, 16);
  return decimal;
};
