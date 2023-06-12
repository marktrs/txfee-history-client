import type { PageQueryData, TransactionQueryDto } from "@/lib/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import TableSkeleton from "./TableSkeleton";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    s: "%d secs",
    m: "1 min",
    mm: "%d mins",
  },
});

const TransactionTable = function ({
  isLoading,
  txs,
}: {
  isLoading: boolean;
  txs: any[];
  pageData: PageQueryData;
  txQuery: TransactionQueryDto;
}) {
  if (isLoading) return <TableSkeleton />;
  if (!txs || txs.length == 0)
    return (
      <p className="p-5 text-center relative bg-white shadow-md dark:bg-gray-800 sm:rounded-b-lg dark:text-white">
        No transaction data
      </p>
    );

  return (
    <div className="overflow-x-auto sm:rounded-b-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-800">
        <thead className="text-xs text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Time
            </th>
            <th scope="col" className="px-4 py-3">
              Fee (gWEI)
            </th>
            <th scope="col" className="px-4 py-3">
              Fee (USDC)
            </th>
            <th scope="col" className="px-4 py-3">
              Block
            </th>
            <th scope="col" className="px-4 py-3">
              TxHash
            </th>
          </tr>
        </thead>
        <tbody>
          {txs &&
            txs.map((tx) => {
              return (
                <tr
                  key={tx.hash}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div className="w-20">
                        {dayjs.unix(tx.time).format("h:mm A")}
                        <p className="font-normal text-gray-500 text-xs">
                          {dayjs.unix(tx.time).format("MMM-D-YYYY")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-normal">{tx.gas.toLocaleString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-normal">{tx.gas.toLocaleString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-normal">
                          {tx.block.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-normal">{tx.tx_hash}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
