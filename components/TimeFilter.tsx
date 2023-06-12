"use client";

import DatePicker from "./DatePicker";

export default function TimeFilter({
  dateRange,
  timeRange,
  handleDateChange,
  handleStartTimeChange,
  handleEndTimeChange,
}: {
  dateRange: any;
  timeRange: any;
  handleDateChange: (date: any) => void;
  handleStartTimeChange: (e: any) => void;
  handleEndTimeChange: (e: any) => void;
}) {
  return (
    <form className="block lg:flex">
      <label className="sr-only">Filter transaction by time period</label>
      <div className="w-full px-0 sm:p-3 lg:py-0">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Date Range
        </label>
        <div className="date-picker w-full">
          <DatePicker
            dateRange={dateRange}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 px-0 sm:p-3 lg:py-0">
        <label
          htmlFor="start-time-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          From
        </label>
        <input
          onChange={handleStartTimeChange}
          type="time"
          id="start-time-input"
          className="bg-white border border-gray-300 font-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white/80 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="From"
          value={timeRange.startTime}
        />
        <span className="validity"></span>
      </div>
      <div className="w-full lg:w-1/2 px-0 sm:p-3 lg:py-0">
        <label
          htmlFor="end-time-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          To
        </label>
        <input
          onChange={handleEndTimeChange}
          type="time"
          id="end-time-input"
          className="bg-white border border-gray-300 font-light text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white/80 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="To"
          value={timeRange.endTime}
        />
        <span className="validity"></span>
      </div>
    </form>
  );
}
