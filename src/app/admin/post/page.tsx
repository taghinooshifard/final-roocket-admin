"use client";
import FilterPostForm from "@/app/components/forms/post/filter/FilterPostForm";
import PostForm from "@/app/components/forms/post/PostForm";
import PostListItem from "@/app/components/forms/post/PostListItem";
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
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryPage = searchParams.get("page");
  useEffect(() => {
    setPage(parseInt(queryPage ?? "1"));
  }, [queryPage]);
  const TitleFilter = searchParams.get("title");
  const CategoryFilter = searchParams.get("category_id");
  const PublishedFilter = searchParams.get("is_published");
  useEffect(() => {
    let queryFilter = "";
    if (TitleFilter && TitleFilter?.length > 0)
      queryFilter = `&title=${TitleFilter}`;
    if (CategoryFilter && CategoryFilter?.length > 0)
      queryFilter += `&category_id=${CategoryFilter}`;
    if (PublishedFilter && PublishedFilter?.length > 0)
      queryFilter += `&is_published=${PublishedFilter}`;
    if (queryFilter.length > 0) setFilter(queryFilter);
  }, [TitleFilter, CategoryFilter, PublishedFilter]);
  const {
    data: PostList,
    error,
    loading,
    mutate,
  } = useData({
    url: `url=article&page=${page}&per_page=5${filter}`,
  });
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Posts is Fetching..." />
      </div>
    );
  if (error) return <h1>{error.messages}</h1>;

  const isFilterOpen = () => searchParams.has("filter");
  const filterFunc = (filter: string) => {
    setFilter(filter);
    router.push(`/admin/post?page=${page}${filter}`);
  };
  const RemoveFilterFunc = () => {
    setFilter("");
    router.push(`/admin/post?page=${page}`);
  };
  const isOpen = () => searchParams.has("create");
  const onPageChange = ({ selected }: { selected: number }) =>
    router.push(`/admin/post?page=${selected + 1}${filter}`);

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Post Page Header  */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Posts List</h1>
          <p>This page shows post list.</p>
        </div>
        {/* Buttons Show Modal Create Post */}
        {
          <Link
            className="text-gray-600 hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
            as="/admin/post?create"
            href={"/admin/post/create"}
          >
            Add Post List
          </Link>
        }
        {filter.length == 0 ? (
          <Link
            className="text-gray-600 text-center hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
            as="/admin/post?filter"
            href={"/admin/post/filter"}
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
      {/* Modal Create Post Form */}
      {isOpen() && (
        <Modal
          isOpen={isOpen()}
          setIsOpen={() => {
            router.push("/admin/post?create");
          }}
          title="Add Post"
        >
          {/* app/components/forms/post/PostForm */}
          <PostForm router={router} mutate={mutate} />
        </Modal>
      )}
      {/* Modal Filter Category Form */}
      {isFilterOpen() && (
        <Modal
          isOpen={isFilterOpen()}
          setIsOpen={() => {
            router.push("/admin/post?filter");
          }}
          title="Search Post"
        >
          {/* app/components/forms/post/filter/FilterPostForm */}
          <FilterPostForm filterFunc={filterFunc} page={page} />
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
                <th scope="col" className="px-6 py-3">
                  Comments
                </th>
              </tr>
            </thead>
            <tbody>
              {PostList?.data?.data?.map((post: PostModel) => {
                return (
                  <PostListItem
                    key={post.id}
                    post={post}
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
