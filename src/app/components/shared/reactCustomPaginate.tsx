import ReactPaginate from "react-paginate";
interface Props {
  onPageChange: (selectedItem: { selected: number }) => void;
  pageCount: number;
  page: number;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
}
export default function ReactCustomePaginate({
  onPageChange,
  pageCount,
  marginPagesDisplayed = 2,
  pageRangeDisplayed = 3,
  page,
}: Props) {
  return (
    <ReactPaginate
      className="flex items-center  -space-x-px h-8 text-sm my-3 mr-3"
      pageLinkClassName="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
      nextClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      previousClassName="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      activeLinkClassName="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
      breakLabel="..."
      nextLabel="Next"
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageCount={pageCount}
      forcePage={page - 1}
      previousLabel="Prev"
      renderOnZeroPageCount={null}
    />
  );
}
