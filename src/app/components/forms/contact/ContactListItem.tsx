import DeleteConfirmation from "@/app/components/shared/deleteConfirmation";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/auth";
import MessageError from "@/app/exceptions/MessageError";
import Modal from "../../shared/modal";
import { Delete, Get, Patch } from "@/app/tools/ApiManager";
import ViewCommentPage from "./ViewComment";
import ContactModel from "@/app/models/ContactModel";

interface Props {
  contact: ContactModel;
  mutate: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  page: number;
}
export default function ContactListItem({ contact, mutate, page }: Props) {
  const user = useSelector(selectUser);
  const [deleteShow, setDeleteShow] = useState(false);
  const [reviewShow, setReviewShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has(`view-${contact.id}`);

  const deleteHandler = async () => {
    try {
      const data = await Delete({
        url: `/api/data?url=/contact/${contact.id}`,
      });
      if (data?.message) {
        await toast.success("Contact Deleted.");
      }
      await mutate();
      router.push(`/admin/contact?page=${page}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };
  const reviewHandler = async () => {
    try {
      const data = await Patch({
        url: `/api/data?url=/contact/${contact.id}/status`,
        values: { id: contact.id },
      });
      if (data?.message) {
        await toast.success("Contact Status Changed.");
      }
      await mutate();
      router.push(`/admin/contact?page=${page}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };

  return (
    <tr key={contact.id}>
      <td className="hidden">
        {deleteShow && (
          <DeleteConfirmation
            header={`Delete Contact
                 {${contact.name}}`}
            description={`Are you sure for delete {${contact.name}}?`}
            cancelHandler={() => {
              setDeleteShow(false);
            }}
            trueHandler={deleteHandler}
          />
        )}
      </td>
      <td className="hidden">
        {reviewShow && (
          <DeleteConfirmation
            okButtonText="Review"
            cancelButtonText="Close"
            header={`Review Contact For {${contact.name}}`}
            description={`Are you sure for review for {${contact.name}}?`}
            cancelHandler={() => {
              setReviewShow(false);
            }}
            trueHandler={reviewHandler}
          />
        )}
      </td>
      <td className="hidden">
        {isOpen() && (
          <Modal
            isOpen={true}
            setIsOpen={async () => {
              await mutate();
              router.push(`/admin/contact?page=${page}`);
            }}
            title="View Contact"
          >
            {/* app/forms/admin/post/{id}/comments */}
            <ViewCommentPage
              backUrl={`/admin/contact?page=${page}`}
              id={contact.id}
            />
          </Modal>
        )}
      </td>
      <th scope="col" className="px-6 py-3">
        {contact.name}
      </th>
      <th scope="col" className="px-6 py-3">
        {contact.email}
      </th>
      <th
        scope="col"
        className={`px-6 py-3 border ${
          contact.is_reviewed ? `bg-green-500` : `bg-red-500`
        }`}
      ></th>
      <th scope="col" className="px-6 py-3">
        {new Date(contact.created_at).toLocaleDateString()}
      </th>
      <th scope="col" className="px-6 py-3">
        <Link
          href={`/admin/contact/${contact.id}/view`}
          as={`/admin/contact?page=${page}&view-${contact.id}`}
          className="rounded-md px-5 py-2 bg-blue-700 text-white "
        >
          View
        </Link>
      </th>
      {
        <th scope="col" className="px-6 py-3">
          <button
            onClick={() => {
              setDeleteShow(true);
            }}
            className="rounded-md px-5 py-2 bg-red-700 text-white"
          >
            Delete
          </button>
        </th>
      }
      <th scope="col" className="px-6 py-3">
        <button
          onClick={() => {
            setReviewShow(true);
          }}
          className="rounded-md px-5 py-2 bg-indigo-600 text-white"
        >
          Review
        </button>
      </th>
    </tr>
  );
}
