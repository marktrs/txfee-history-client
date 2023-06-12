"use client";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import TableHeader from "@/components/TableHeader";
import TransactionTable from "@/components/TransactionTable";
import { fetchTxsFromQuery } from "@/lib/api";
import type { PageQueryData, TransactionQueryDto } from "@/lib/types";
import dayjs from "dayjs";
import { useState } from "react";

const Page = function () {
  const initialTxQuery: TransactionQueryDto = {
    dateRange: {
      startDate: dayjs("2021-05-06", "YYYY-MM-DD").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    },
    timeRange: {
      startTime: "00:00",
      endTime: "23:59",
    },
    searchQuery: "",
    page: 1,
    limit: 10,
  };

  const initialPageQuery: PageQueryData = {
    from: 0,
    to: 0,
    total: 0,
  };

  const [txQuery, setTxQuery] = useState(initialTxQuery);
  const [txs, setTxs] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pageData, setPageData] = useState(initialPageQuery);

  async function fetchTxs() {
    setLoading(true);
    const { pageData, transactions } = await fetchTxsFromQuery({ txQuery });
    setTxs(transactions);
    setPageData(pageData);
    setLoading(false);
  }

  return (
    <Layout>
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="w-full shadow-md sm:rounded-lg">
          <TableHeader
            txQuery={txQuery}
            setTxQuery={setTxQuery}
            fetchTxs={fetchTxs}
          />
          <Pagination
            pageData={pageData}
            txQuery={txQuery}
            setTxQuery={setTxQuery}
            fetchTxs={fetchTxs}
          >
            <TransactionTable
              txQuery={txQuery}
              txs={txs}
              isLoading={isLoading}
              pageData={pageData}
            />
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
