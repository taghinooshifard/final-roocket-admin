"use client";
import CommentListItem from "@/app/components/forms/comment/CommentListItem";
import FilterCommentForm from "@/app/components/forms/comment/filter/FilterCommentForm";
import EmptyList from "@/app/components/shared/emptyList";
import LoadingSpinner from "@/app/components/shared/loadingSpinner";
import Modal from "@/app/components/shared/modal";
import ReactCustomePaginate from "@/app/components/shared/reactCustomPaginate";
import useData from "@/app/hooks/useData";
import CommentModel from "@/app/models/CommentModel";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: { id: number };
}
export default function AdminCommentsPage({ params }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryPage = searchParams.get("page");
  useEffect(() => {
    setPage(parseInt(queryPage ?? "1"));
  }, [queryPage]);
  const queryFilter = searchParams.get("status");
  useEffect(() => {
    if (queryFilter && queryFilter?.length > 0)
      setFilter(`&status=${queryFilter}`);
  }, [queryFilter]);
  const {
    data: CommentList,
    error,
    loading,
    mutate,
  } = useData({
    url: `url=article/${params.id}/comments&page=${page}&per_page=5${filter}`,
  });
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Comments is Fetching..." />
      </div>
    );
  if (error) return <h1>{error.messages}</h1>;

  const isFilterOpen = () => searchParams.has("filter");
  const filterFunc = (filter: string) => {
    setFilter(filter);
    router.push(`/admin/post/${params.id}/comments?page=${page}${filter}`);
  };
  const RemoveFilterFunc = () => {
    setFilter("");
    router.push(`/admin/post/${params.id}/comments?page=${page}`);
  };
  const onPageChange = ({ selected }: { selected: number }) =>
    router.push(`/admin/post/${params.id}/comments?page=${selected + 1}`);

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Comments Page Header  */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Comments List</h1>
          <p>This page shows comments list.</p>
        </div>
        {/* Buttos Show Modal Create Category */}
        {
          <div className="flex flex-col gap-1">
            {filter.length == 0 ? (
              <Link
                className="text-gray-600 text-center hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
                as={`/admin/post/${params.id}/comments?filter`}
                href={`/admin/post/${params.id}/comments/filter`}
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
      {/* Modal Filter Comments Form */}
      {isFilterOpen() && (
        <Modal
          isOpen={isFilterOpen()}
          setIsOpen={() => {
            router.push(`/admin/post/${params.id}/comments?filter`);
          }}
          title="Search Comments"
        >
          {/* app/components/forms/comment/FilterCommentForm */}
          <FilterCommentForm
            postId={params.id}
            filterFunc={filterFunc}
            page={page}
          />
        </Modal>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table Comments Lists */}
        {CommentList?.data?.data?.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  status
                </th>
                <th scope="col" className="px-6 py-3">
                  Create Date
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
                <th scope="col" className="px-6 py-3">
                  Approve
                </th>

                <th scope="col" className="px-6 py-3">
                  Reject
                </th>
              </tr>
            </thead>
            <tbody>
              {CommentList?.data?.data?.map((comment: CommentModel) => {
                return (
                  <CommentListItem
                    key={comment.id}
                    post_id={params.id}
                    comment={comment}
                    mutate={mutate}
                    page={page}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyList text="There is no data..." />
        )}
        {/* navigation  Products List*/}
        <nav aria-label="Page navigation Posts">
          {CommentList?.data?.last_page > 1 && (
            <ReactCustomePaginate
              onPageChange={onPageChange}
              pageCount={CommentList?.data?.last_page}
              page={CommentList?.data?.current_page}
            />
          )}
        </nav>
      </div>
    </div>
  );
}
