"use client";

import { PageQueryData, TransactionQueryDto } from "@/lib/types";
import { Pagination } from "flowbite-react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  pageData: PageQueryData;
  txQuery: TransactionQueryDto;
  setTxQuery: (txQuery: TransactionQueryDto) => void;
  fetchTxs: () => void;
};

const CustomPagination: React.FC<Props> = ({
  children,
  pageData,
  txQuery,
  setTxQuery,
  fetchTxs,
}) => {
  const totalPage = Math.ceil(pageData.total / txQuery.limit);

  const onPageChange = (page: number) => {
    txQuery.page = page;
    setTxQuery(txQuery);
    fetchTxs();
  };

  if (pageData.total === 0) {
    return <>{children}</>;
  }
  return (
    <>
      {children}
      <nav
        className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
        aria-label="Table navigation"
      >
        <div className="mx-auto text-center md:ml-0 md:text-left">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white px-2">
              {pageData.from.toLocaleString()}-{pageData.to.toLocaleString()}
            </span>
            of
            <span className="font-semibold text-gray-900 dark:text-white px-2">
              {pageData.total.toLocaleString()}
            </span>
            results from
            <span className="font-semibold text-gray-900 dark:text-white px-2">
              {totalPage.toLocaleString()}
            </span>
            pages
          </span>
        </div>
        <div className="hidden sm:block mx-auto md:mr-0">
          <Pagination
            currentPage={txQuery.page}
            onPageChange={onPageChange}
            layout="pagination"
            previousLabel=""
            nextLabel=""
            showIcons
            totalPages={totalPage}
          />
        </div>
        <div className="block sm:hidden mx-auto">
          <Pagination
            currentPage={txQuery.page}
            onPageChange={onPageChange}
            layout="navigation"
            previousLabel="Prev"
            nextLabel="Next"
            showIcons
            totalPages={totalPage}
          />
        </div>
      </nav>
    </>
  );
};

export default CustomPagination;
