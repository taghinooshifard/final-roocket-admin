import CommentModel from "@/app/models/CommentModel";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import InputControl from "../../controls/Input";
import { BiSolidCategory } from "react-icons/bi";
import SelectBoxControl from "../../controls/selectBox";
type CommentFormProps = FormikProps<CommentModel> & {
  comment: CommentModel;
  page: number;
  postId: number;
};
export default function FilterInnerCommentForm(params: CommentFormProps) {
  return (
    <div className="flex gap-4 py-2 px-2 grid-cols-4">
      <Form>
        <SelectBoxControl
          label="Status:"
          id="status"
          name="status"
          icon={BiSolidCategory}
          options={[
            { label: "Select Status", value: "" },
            { label: "waiting", value: "waiting" },
            { label: "approved", value: "approved" },
            { label: "rejected", value: "rejected" },
          ]}
        />

        <div className="flex justify-center py-5 gap-2">
          <button className="bg-blue-500 px-5 py-2 rounded-md" type="submit">
            Search
          </button>
          <Link
            href={`/admin/post/${params.postId}/comments?page=${params.page}`}
            as={`/admin/post/${params.postId}/comments?page=${params.page}`}
            className="bg-red-500 px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
