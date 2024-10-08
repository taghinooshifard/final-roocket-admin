"use client";
import CategoryForm from "@/app/components/forms/category/CategoryForm";
import CategoryListItem from "@/app/components/forms/category/CategoryListItem";
import FilterCategoryForm from "@/app/components/forms/category/filter/FilterCategoryForm";
import EmptyList from "@/app/components/shared/emptyList";
import LoadingSpinner from "@/app/components/shared/loadingSpinner";
import Modal from "@/app/components/shared/modal";
import ReactCustomePaginate from "@/app/components/shared/reactCustomPaginate";
import useData from "@/app/hooks/useData";
import CategoryModel from "@/app/models/CaregoryData";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {}
export default function AdminCategoryPage(params: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryPage = searchParams.get("page");
  useEffect(() => {
    setPage(parseInt(queryPage ?? "1"));
  }, [queryPage]);
  const queryFilter = searchParams.get("title");
  useEffect(() => {
    if (queryFilter && queryFilter?.length > 0)
      setFilter(`&title=${queryFilter}`);
  }, [queryFilter]);
  const {
    data: categoryList,
    error,
    loading,
    mutate,
  } = useData({
    url: `url=article-category&page=${page}&per_page=5${filter}`,
  });
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Data is Fetching..." />
      </div>
    );

  if (error) return <h1>{error.messages}</h1>;

  const isOpen = () => searchParams.has("create");
  const isFilterOpen = () => searchParams.has("filter");
  const filterFunc = (filter: string) => {
    setFilter(filter);
    router.push(`/admin/category?page=${page}${filter}`);
  };
  const RemoveFilterFunc = () => {
    setFilter("");
    router.push(`/admin/category?page=${page}`);
  };
  const onPageChange = ({ selected }: { selected: number }) =>
    router.push(`/admin/category?page=${selected + 1}${filter}`);

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Category Page Haeder  */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Category List</h1>
          <p>This page shows category list.</p>
        </div>
        {/* Buttos Show Modal Create Category */}
        {
          <div className="flex flex-col gap-1">
            <Link
              className="text-gray-600 hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
              as="/admin/category?create"
              href={"/admin/category/create"}
            >
              Add Category List
            </Link>
            {filter.length == 0 ? (
              <Link
                className="text-gray-600 text-center hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
                as="/admin/category?filter"
                href={"/admin/category/filter"}
              >
                Filter
              </Link>
            ) : (
              <button
                onClick={RemoveFilterFunc}
                className="text-gray-600 text-center hover:text-white bg-red-300 hover:bg-red-600 px-4 py-2 rounded-md"
              >
                RemoveFilter(1)
              </button>
            )}
          </div>
        }
      </div>
      {/* Modal Create Category Form */}
      {isOpen() && (
        <Modal
          isOpen={isOpen()}
          setIsOpen={() => {
            router.push("/admin/category?create");
          }}
          title="Add Category"
        >
          {/* app/components/forms/category/CategoryForm */}
          <CategoryForm router={router} mutate={mutate} />
        </Modal>
      )}
      {/* Modal Filter Category Form */}
      {isFilterOpen() && (
        <Modal
          isOpen={isFilterOpen()}
          setIsOpen={() => {
            router.push("/admin/category?filter");
          }}
          title="Search Category"
        >
          {/* app/components/forms/category/CategoryForm */}
          <FilterCategoryForm filterFunc={filterFunc} page={page} />
        </Modal>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table Category Lists */}
        {categoryList?.data?.data?.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Category Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Edit
                </th>

                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryList?.data?.data?.map((category: CategoryModel) => {
                return (
                  <CategoryListItem
                    key={category.id}
                    category={category}
                    mutate={mutate}
                    page={page}
                    filter={filter}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyList text="There is no data..." />
        )}
        {/* navigation  Products List*/}
        <nav aria-label="Page navigation Category">
          {categoryList?.data?.last_page > 1 && (
            <ReactCustomePaginate
              onPageChange={onPageChange}
              pageCount={categoryList?.data?.last_page}
              page={categoryList?.data?.current_page}
            />
          )}
        </nav>
      </div>
    </div>
  );
}
