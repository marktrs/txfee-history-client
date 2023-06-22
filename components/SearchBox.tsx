import Image from "next/image";

export default function SearchBox({
  searchQuery,
  handleSearchQueryChange,
  fetchTxs,
}: {
  searchQuery: string;
  handleSearchQueryChange: (e: any) => void;
  fetchTxs: () => void;
}) {
  return (
    <form className="flex items-center mt-3" onSubmit={fetchTxs}>
      <div className="relative w-full">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Search
        </label>
        <div className="absolute bottom-2.5 left-0 flex items-center pl-3 pointer-events-none opacity-20">
          <Image
            src="/assets/icons/magnifier.svg"
            alt="search by transaction hash"
            width="20"
            height="20"
            className="text-gray-500 dark:text-gray-400"
          />
        </div>
        <input
          onChange={handleSearchQueryChange}
          value={searchQuery}
          type="text"
          id="default-input"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-gray-800 dark:focus:bg-gray-800"
          placeholder="Search transaction by hash within time range"
        />
      </div>
    </form>
  );
}
