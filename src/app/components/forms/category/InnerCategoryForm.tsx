import { CategoryModel } from "@/app/models/CaregoryData";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import {
  AiFillAudio,
  AiFillDownCircle,
  AiFillEuroCircle,
  AiFillGift,
} from "react-icons/ai";
import InputControl from "../controls/Input";
import { BiSolidCategory } from "react-icons/bi";
import Spinner from "../../shared/Spinner";
type CategoryFormProps = FormikProps<CategoryModel> & {
  category: CategoryModel;
};
export default function innerCategoryForm(params: CategoryFormProps) {
  return (
    <div className="flex gap-4 py-2 px-2 grid-cols-4">
      <Form>
        <InputControl
          label="Category Name"
          id="title"
          name="title"
          type="text"
          placeholder="Enter Category..."
          icon={BiSolidCategory}
        />

        <div className="flex justify-center py-5 gap-2">
          <button
            disabled={params.isSubmitting}
            className="bg-blue-500 px-5 py-2 rounded-md"
            type="submit"
          >
            {params?.category ? "Edit Category" : "Add Category"}
            {params.isSubmitting && <Spinner />}
          </button>
          <Link
            href={"/admin/category"}
            as={"/admin/category"}
            className="bg-red-500 px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
