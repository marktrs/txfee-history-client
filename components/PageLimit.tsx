"use client";

import { ChangeEventHandler } from "react";
const PageLimitOptions = ({
  pageLimit,
  handlePageLimitChange,
}: {
  pageLimit: number;
  handlePageLimitChange: ChangeEventHandler<HTMLSelectElement>;
}) => {
  const options = [10, 20, 50, 100, 200];
  return (
    <>
      <form className="block lg:flex">
        <div className="w-full px-0 sm:p-3 lg:py-0">
          <label
            htmlFor="page-limit"
            className="block mb-2 text-sm font-medium text-gray-800 dark:text-white"
          >
            Limit
          </label>
          <select
            id="page-limit"
            onChange={handlePageLimitChange}
            value={pageLimit}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white/80 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {options.map((limit) => (
              <option key={limit}>{limit}</option>
            ))}
          </select>
        </div>
      </form>
    </>
  );
};

export default PageLimitOptions;
