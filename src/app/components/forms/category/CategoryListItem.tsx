import DeleteConfirmation from "@/app/components/shared/deleteConfirmation";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/auth";
import CategoryModel from "@/app/models/CaregoryData";
import MessageError from "@/app/exceptions/MessageError";
import Modal from "../../shared/modal";
import EditCategoryForm from "./EditCatgoryForm";
import { Delete } from "@/app/tools/ApiManager";
import { filter } from "lodash";

interface Props {
  category: CategoryModel;
  mutate: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  page: number;
  filter: string;
}
export default function CategoryListItem({
  category,
  mutate,
  page,
  filter,
}: Props) {
  const user = useSelector(selectUser);
  const [deleteShow, setDeleteShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has(`edit-${category.id}`);
  const deleteHandler = async () => {
    try {
      const data = await Delete({
        url: `/api/data?url=/article-category/${category.id}`,
      });
      if (data?.message) {
        await toast.success("Category Deleted.");
      }
      await mutate();
      router.push(`/admin/category?page=${page}&${filter}`);
    } catch (error: any) {
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  };
  return (
    <tr key={category.id}>
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
              router.push(`/admin/category?page=${page}${filter}`);
            }}
            title="Edit Category"
          >
            {/* app/forms/admin/product/CreateProductForm */}
            <EditCategoryForm
              router={router}
              mutate={mutate}
              category={category}
              page={page}
              filter={filter}
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
