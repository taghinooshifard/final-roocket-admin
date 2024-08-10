import DeleteConfirmation from "@/app/components/shared/deleteConfirmation";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/auth";
import MessageError from "@/app/exceptions/MessageError";
import Modal from "../../shared/modal";
import EditCategoryForm from "./EditCatgoryForm";
import { Delete } from "@/app/tools/ApiManager";
import PostModel from "@/app/models/PostData";

interface Props {
  post: PostModel;
  mutate: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  page: number;
}
export default function PostListItem({ post, mutate, page }: Props) {
  const user = useSelector(selectUser);
  const [deleteShow, setDeleteShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has(`edit-${post.slug}`);
  const deleteHandler = async () => {
    try {
      const data = await Delete({
        url: `/api/data?url=/article/${post.slug}`,
      });
      if (data?.message) {
        await toast.success("Post Deleted.");
      }
      await mutate();
      router.push(`/admin/article?page=${page}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };
  return (
    <tr key={post.id}>
      <td className="hidden">
        {deleteShow && (
          <DeleteConfirmation
            header={`Delete Category {${category.title}}`}
            description={`Are you sure for delete {${category.title}}?`}
            cancelHandler={() => {
              setDeleteShow(false);
            }}
            trueHandler={deleteHandler}
          />
        )}
      </td>
      <td className="hidden">
        {isOpen() && (
          <Modal
            isOpen={true}
            setIsOpen={async () => {
              await mutate();
              router.push(`/admin/category?page=${page}`);
            }}
            title="Edit Category"
          >
            {/* app/forms/admin/product/CreateProductForm */}
            <EditCategoryForm
              router={router}
              mutate={mutate}
              category={category}
              page={page}
            />
          </Modal>
        )}
      </td>
      <th scope="col" className="px-6 py-3">
        {category.title}
      </th>

      {
        <th scope="col" className="px-6 py-3">
          <Link
            href={`/admin/category/${category.id}/edit`}
            as={`/admin/category/?page=${page}&edit-${category.id}`}
            className="rounded-md px-5 py-2 bg-blue-700 text-white "
          >
            Edit
          </Link>
        </th>
      }
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
    </tr>
  );
}
