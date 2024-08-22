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
import { Delete, Get } from "@/app/tools/ApiManager";
import PostModel from "@/app/models/PostData";
import EditPostForm from "./EditPostForm";

interface Props {
  post: PostModel;
  mutate: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  page: number;
}
export default function PostListItem({ post, mutate, page }: Props) {
  const [myPost, setMyPost] = useState<PostModel>();
  const user = useSelector(selectUser);
  const [deleteShow, setDeleteShow] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has(`edit-${post.id}`);
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

  useEffect(() => {
    const onLoadHandler = async () => {
      try {
        const data = await Get({
          url: `/api/data?url=article/${post.slug}`,
        });
        setMyPost(await data?.data);
      } catch (error: any) {
        if (error instanceof MessageError) {
          toast.error(error.messages);
        }
      }
    };
    onLoadHandler();
  }, []);
  return (
    <tr key={post.id}>
      <td className="hidden">
        {deleteShow && (
          <DeleteConfirmation
            header={`Delete Post {${post.title}}`}
            description={`Are you sure for delete {${post.title}}?`}
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
              router.push(`/admin/post?page=${page}`);
            }}
            title="Edit Post"
          >
            {/* app/forms/admin/post/EditPostForm */}
            <EditPostForm
              router={router}
              mutate={mutate}
              post={myPost ?? post}
              page={page}
            />
          </Modal>
        )}
      </td>
      <th scope="col" className="px-6 py-3">
        {post.title}
      </th>
      <th scope="col" className="px-6 py-3">
        <Link
          className="text-indigo-50 bg-indigo-300 border px-1 py-1 rounded-lg hover:bg-indigo-700"
          href={post.image_url ?? ""}
        >
          View
        </Link>
      </th>
      <th scope="col" className="px-6 py-3">
        {post.slug}
      </th>
      <th scope="col" className="px-6 py-3">
        {post.category_title}
      </th>
      <th scope="col" className="px-6 py-3">
        {new Date(post.published_at).toLocaleString()}
      </th>
      {
        <th scope="col" className="px-6 py-3">
          <Link
            href={`/admin/post/${post.id}/edit`}
            as={`/admin/post/?page=${page}&edit-${post.id}`}
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
      {
        <th scope="col" className="px-6 py-3">
          <Link
            className="rounded-md px-5 py-2 bg-yellow-700 text-white"
            href={`/admin/post/${post.id}/comments`}
            as={`/admin/post/${post.id}/comments`}
          >
            comments
          </Link>
        </th>
      }
    </tr>
  );
}
