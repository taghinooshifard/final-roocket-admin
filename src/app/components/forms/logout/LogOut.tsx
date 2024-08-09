import MessageError from "@/app/exceptions/MessageError";
import Post from "@/app/tools/ApiManager";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import Spinner from "../../shared/Spinner";
import { useAppDispatch } from "@/app/hooks";
import { updateUser } from "@/app/store/auth";

export default function LogOut() {
  const router = useRouter();
  const [Submitting, setSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const cancelHandler = async () => {
    await router.push("/admin");
  };
  const okHandler = async () => {
    try {
      setSubmitting(true);
      const data = await Post({ url: "/api/logout", values: {} });
      if (data?.message) {
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        setSubmitting(false);
        dispatch(updateUser(undefined));
        router.push("/login");
      }
    } catch (error: any) {
      setSubmitting(false);

      if (error instanceof MessageError) {
        toast.error(error.messages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };
  return (
    <div
      className="flex flex-col justify-center items-center gap-4 p-5"
      dir="ltr"
    >
      <p>َAre you sure?</p>
      <div className="flex  justify-center items-center gap-4 text-white ">
        <button
          disabled={Submitting}
          onClick={okHandler}
          className="px-5 py-2 rounded-md bg-blue-600"
        >
          OK
          {Submitting && <Spinner />}
        </button>
        <button
          onClick={cancelHandler}
          className="px-5 py-2 rounded-md bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
