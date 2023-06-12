import { TransactionQueryDto } from "@/lib/types";
import { DarkThemeToggle } from "flowbite-react";
import { useState } from "react";
import PageLimitOptions from "./PageLimit";
import SearchBox from "./SearchBox";
import TimeFilter from "./TimeFilter";

const TableHeader = ({
  txQuery,
  setTxQuery,
  fetchTxs,
}: {
  txQuery: TransactionQueryDto;
  setTxQuery: (txQuery: TransactionQueryDto) => void;
  fetchTxs: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState(txQuery.searchQuery);
  const [dateRange, setDateRange] = useState(txQuery.dateRange);
  const [timeRange, setTimeRange] = useState(txQuery.timeRange);
  const [pageLimit, setPageLimit] = useState(txQuery.limit);

  const handleDateChange = (e: any) => {
    txQuery.dateRange.startDate = e.startDate;
    txQuery.dateRange.endDate = e.endDate;

    setTxQuery(txQuery);
    setDateRange({
      ...e,
    });
  };

  const handleStartTimeChange = (e: any) => {
    txQuery.timeRange.startTime = e.target.value;
    setTxQuery(txQuery);
    setTimeRange({
      startTime: e.target.value,
      endTime: txQuery.timeRange.endTime,
    });
  };

  const handleEndTimeChange = (e: any) => {
    txQuery.timeRange.endTime = e.target.value;
    setTxQuery(txQuery);
    setTimeRange({
      startTime: txQuery.timeRange.startTime,
      endTime: e.target.value,
    });
  };

  const handlePageLimitChange = (e: any) => {
    txQuery.limit = e.target.value;
    setTxQuery(txQuery);
    setPageLimit(txQuery.limit);
  };

  const handleSearchQueryChange = (e: any) => {
    txQuery.searchQuery = e.target.value;
    setTxQuery(txQuery);
    setSearchQuery(txQuery.searchQuery);
  };

  return (
    <div className="relative bg-white shadow-md dark:bg-gray-800 sm:rounded-t-lg">
      <div className="flex-row items-end justify-between p-6 lg:p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
        <div className="justify-self-start">
          <h5 className="mr-3 font-semibold dark:text-white">
            Historical Fee Data
          </h5>
          <p className="text-gray-500 dark:text-gray-400">
            View historical fee data for a specific time period
          </p>
        </div>
        <div className="flex item-end">
          <div className="text-bold text-gray-500 dark:text-white mr-6 md:mr-32">
            <div className="text-sm font-medium mb-1">ETH price</div>
            <div className="text-sm font-thin">$ 123.45</div>
          </div>
          <DarkThemeToggle className="ml-auto w-10 h-10" />
        </div>
      </div>
      <hr />
      <div className="flex-row content-center items-end justify-between p-4 space-y-3 lg:flex sm:space-y-0 sm:space-x-4">
        <div className="w-full lg:w-10/12">
          <TimeFilter
            dateRange={dateRange}
            timeRange={timeRange}
            handleDateChange={handleDateChange}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
          />
        </div>
        <div className="w-full lg:w-2/12">
          <PageLimitOptions
            pageLimit={pageLimit}
            handlePageLimitChange={handlePageLimitChange}
          />
        </div>
      </div>
      <div className="flex-row content-center items-end justify-between p-4 space-y-3 lg:flex sm:space-y-0 sm:space-x-4">
        <div className="w-full lg:w-10/12">
          <SearchBox
            fetchTxs={fetchTxs}
            searchQuery={searchQuery}
            handleSearchQueryChange={handleSearchQueryChange}
          />
        </div>
        <div className="w-full lg:w-2/12 flex justify-end py-3 lg:pb-0.5">
          <button
            onClick={fetchTxs}
            type="button"
            className="flex items-end justify-center w-full py-2.5 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
