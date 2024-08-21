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
import CommentModel from "@/app/models/CommentModel";
import ViewCommentPage from "./ViewComment";

interface Props {
  post_id: number;
  comment: CommentModel;
  mutate: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  page: number;
}
export default function CommentListItem({
  comment,
  mutate,
  page,
  post_id,
}: Props) {
  const user = useSelector(selectUser);
  const [deleteShow, setDeleteShow] = useState(false);
  const [approveShow, setApproveShow] = useState(false);
  const [rejectShow, setRejectShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has(`view-${comment.id}`);

  const deleteHandler = async () => {
    try {
      const data = await Delete({
        url: `/api/data?url=/comment/${comment.id}`,
      });
      if (data?.message) {
        await toast.success("Comment Deleted.");
      }
      await mutate();
      router.push(`/admin/post/${post_id}/comments?page=${page}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };
  const approveHandler = async () => {
    try {
      const data = await Patch({
        url: `/api/data?url=/comment/${comment.id}/approve`,
        values: { id: comment.id },
      });
      if (data?.message) {
        await toast.success("Comment Approved.");
      }
      await mutate();
      router.push(`/admin/post/${post_id}/comments?page=${page}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };
  const rejectHandler = async () => {
    try {
      const data = await Patch({
        url: `/api/data?url=/comment/${comment.id}/reject`,
        values: { id: comment.id },
      });
      if (data?.message) {
        await toast.success("Comment Rejected.");
      }
      await mutate();
      router.push(`/admin/post/${post_id}/comments?page=${page}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };
  return (
    <tr key={comment.id}>
      <td className="hidden">
        {deleteShow && (
          <DeleteConfirmation
            header={`Delete Comment {${comment.name}}`}
            description={`Are you sure for delete {${comment.name}}?`}
            cancelHandler={() => {
              setDeleteShow(false);
            }}
            trueHandler={deleteHandler}
          />
        )}
      </td>
      <td className="hidden">
        {approveShow && (
          <DeleteConfirmation
            okButtonText="Approve"
            cancelButtonText="Close"
            header={`Approve Comment For {${comment.name}}`}
            description={`Are you sure for approve for {${comment.name}}?`}
            cancelHandler={() => {
              setApproveShow(false);
            }}
            trueHandler={approveHandler}
          />
        )}
      </td>
      <td className="hidden">
        {rejectShow && (
          <DeleteConfirmation
            okButtonText="Reject"
            cancelButtonText="Close"
            header={`Reject Comment For {${comment.name}}`}
            description={`Are you sure for reject for {${comment.name}}?`}
            cancelHandler={() => {
              setRejectShow(false);
            }}
            trueHandler={rejectHandler}
          />
        )}
      </td>
      <td className="hidden">
        {isOpen() && (
          <Modal
            isOpen={true}
            setIsOpen={async () => {
              await mutate();
              router.push(`/admin/post/${post_id}/comments?page=${page}`);
            }}
            title="View Comment"
          >
            {/* app/forms/admin/post/{id}/comments */}
            <ViewCommentPage
              backUrl={`/admin/post/${post_id}/comments?page=${page}`}
              id={comment.id}
            />
          </Modal>
        )}
      </td>
      <th scope="col" className="px-6 py-3">
        {comment.name}
      </th>
      <th scope="col" className="px-6 py-3">
        {comment.status_label}
      </th>
      <th scope="col" className="px-6 py-3">
        {new Date(comment.create_at ?? 0 * 1000).toString()}
      </th>
      <th scope="col" className="px-6 py-3">
        <Link
          href={`/admin/post/${post_id}/comments/${comment.id}/view`}
          as={`/admin/post/${post_id}/comments?page=${page}&view-${comment.id}`}
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
            setApproveShow(true);
          }}
          className="rounded-md px-5 py-2 bg-red-700 text-white"
        >
          Approve
        </button>
      </th>
      <th scope="col" className="px-6 py-3">
        <button
          onClick={() => {
            setRejectShow(true);
          }}
          className="rounded-md px-5 py-2 bg-red-700 text-white"
        >
          Reject
        </button>
      </th>
    </tr>
  );
}
