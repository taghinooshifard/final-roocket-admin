"use client";
import LoadingSpinner from "@/app/components/shared/loadingSpinner";
import useData from "@/app/hooks/useData";
import Link from "next/link";

interface Props {
  id: number | undefined;
  backUrl: string;
}
export default function ViewCommentPage(params: Props) {
  const {
    data: comment,
    error,
    loading,
  } = useData({
    url: `url=comment/${params.id}`,
  });

  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Comment is Fetching..." />
      </div>
    );
  if (error)
    return (
      <>
        <h1>{error.messages}</h1>
        <hr />
        <Link
          className="text-gray-600 hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
          as={params.backUrl}
          href={params.backUrl}
        >
          back
        </Link>
      </>
    );
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Post Page Header  */}
      <div className="flex flex-col justify-between  mb-5">

        <p className="border rounded-md p-2 m-2">{comment.data.content}</p>
        {/* Buttons Show Modal View Comment */}
        {
          <Link
            className="text-gray-600 text-center hover:text-white bg-blue-300 hover:bg-blue-600 px-4 py-2 rounded-md"
            as={params.backUrl}
            href={params.backUrl}
          >
            {" "}
            back
          </Link>
        }
      </div>
    </div>
  );
}
