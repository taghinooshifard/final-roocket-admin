"use client";
import ContactListItem from "@/app/components/forms/contact/ContactListItem";
import FilterContactForm from "@/app/components/forms/contact/filter/FilterContactForm";
import EmptyList from "@/app/components/shared/emptyList";
import LoadingSpinner from "@/app/components/shared/loadingSpinner";
import Modal from "@/app/components/shared/modal";
import ReactCustomePaginate from "@/app/components/shared/reactCustomPaginate";
import useData from "@/app/hooks/useData";
import ContactModel from "@/app/models/ContactModel";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminContactPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const queryPage = searchParams.get("page");
  useEffect(() => {
    setPage(parseInt(queryPage ?? "1"));
  }, [queryPage]);
  const queryFilter = searchParams.get("is_reviewed");
  useEffect(() => {
    if (queryFilter && queryFilter?.length > 0)
      setFilter(`&is_reviewed=${queryFilter}`);
  }, [queryFilter]);
  const {
    data: ContactList,
    error,
    loading,
    mutate,
  } = useData({
    url: `url=contact&page=${page}&per_page=5${filter}`,
  });
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Contacts is Fetching..." />
      </div>
    );
  if (error) return <h1>{error.messages}</h1>;

  const isFilterOpen = () => searchParams.has("filter");
  const filterFunc = (filter: string) => {
    setFilter(filter);
    router.push(`/admin/contact?page=${page}${filter}`);
  };
  const RemoveFilterFunc = () => {
    setFilter("");
    router.push(`/admin/contact?page=${page}`);
  };
  const onPageChange = ({ selected }: { selected: number }) =>
    router.push(`/admin/contact?page=${selected + 1}`);

  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Contact Page Header  */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Contact List</h1>
          <p>This page shows contact list.</p>
        </div>
        {/* Buttos Show Modal Search Contact */}
        {
          <div className="flex flex-col gap-1">
            {filter.length == 0 ? (
              <Link
                className="text-gray-600 text-center hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
                as={`/admin/contact?filter`}
                href={`/admin/contact/filter`}
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
      {/* Modal Filter Contact Form */}
      {isFilterOpen() && (
        <Modal
          isOpen={isFilterOpen()}
          setIsOpen={() => {
            router.push(`/admin/contact?filter`);
          }}
          title="Search Contact"
        >
          {/* app/components/forms/comment/FilterCommentForm */}
          <FilterContactForm filterFunc={filterFunc} page={page} />
        </Modal>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table Contact Lists */}
        {ContactList?.data?.data?.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  name
                </th>
                <th scope="col" className="px-6 py-3">
                  email
                </th>
                <th scope="col" className="px-6 py-3">
                  IsReviewed
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
                  reviewed
                </th>
              </tr>
            </thead>
            <tbody>
              {ContactList?.data?.data?.map((contact: ContactModel) => {
                return (
                  <ContactListItem
                    mutate={mutate}
                    page={page}
                    key={contact.id}
                    contact={contact}
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
          {ContactList?.data?.last_page > 1 && (
            <ReactCustomePaginate
              onPageChange={onPageChange}
              pageCount={ContactList?.data?.last_page}
              page={ContactList?.data?.current_page}
            />
          )}
        </nav>
      </div>
    </div>
  );
}
