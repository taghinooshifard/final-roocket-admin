"use client";
import PostForm from "@/app/components/forms/post/PostForm";
import EmptyList from "@/app/components/shared/emptyList";
import LoadingSpinner from "@/app/components/shared/loadingSpinner";
import Modal from "@/app/components/shared/modal";
import ReactCustomePaginate from "@/app/components/shared/reactCustomPaginate";
import useData from "@/app/hooks/useData";
import PostModel from "@/app/models/PostData";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {}
export default function AdminPostPage(params: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const queryPage = searchParams.get("page");
  useEffect(() => {
    setPage(parseInt(queryPage ?? "1"));
  }, [queryPage]);
  const {
    data: PostList,
    error,
    loading,
    mutate,
  } = useData({
    url: `url=article&page=${page}&per_page=5`,
  });
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Posts is Fetching..." />
      </div>
    );
  if (error) return <h1>{error.messages}</h1>;

  const isOpen = () => searchParams.has("create");
  const onPageChange = ({ selected }: { selected: number }) =>
    router.push(`/admin/post?page=${selected + 1}`);

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Post Page Haeder  */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Posts List</h1>
          <p>This page shows post list.</p>
        </div>
        {/* Buttos Show Modal Create Post */}
        {
          <Link
            className="text-gray-600 hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
            as="/admin/post?create"
            href={"/admin/post/create"}
          >
            Add Post List
          </Link>
        }
      </div>
      {/* Modal Create Post Form */}
      {isOpen() && (
        <Modal
          isOpen={isOpen()}
          setIsOpen={() => {
            router.push("/admin/post?create");
          }}
          title="Add Post"
        >
          {/* app/componenets/forms/post/PostForm */}
          <PostForm router={router} mutate={mutate} />
        </Modal>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table Post Lists */}
        {PostList?.data?.data?.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  ImageUrl
                </th>
                <th scope="col" className="px-6 py-3">
                  slug
                </th>
                <th scope="col" className="px-6 py-3">
                  CategoryTitle
                </th>
                <th scope="col" className="px-6 py-3">
                  PublishDate
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
              {PostList?.data?.data?.map((post: PostModel) => {
                return (
                  //   <CategoryListItem
                  //     key={category.id}
                  //     category={category}
                  //     mutate={mutate}
                  //     page={page}
                  //   />
                  <h1 key={post.id}>{post.title}</h1>
                );
              })}
            </tbody>
          </table>
        ) : (
          <EmptyList text="There is no data..." />
        )}
        {/* navigation  Products List*/}
        <nav aria-label="Page navigation Category">
          {PostList?.data?.last_page > 1 && (
            <ReactCustomePaginate
              onPageChange={onPageChange}
              pageCount={PostList?.data?.last_page}
              page={PostList?.data?.current_page}
            />
          )}
        </nav>
      </div>
    </div>
  );
}
