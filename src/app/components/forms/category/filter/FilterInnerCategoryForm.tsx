import CategoryModel from "@/app/models/CaregoryData";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import InputControl from "../../controls/Input";
import { BiSolidCategory } from "react-icons/bi";
type CategoryFormProps = FormikProps<CategoryModel> & {
  category: CategoryModel;
  page: number;
};
export default function FilterInnerCategoryForm(params: CategoryFormProps) {
  return (
    <div className="flex gap-4 py-2 px-2 grid-cols-4">
      <Form>
        <InputControl
          label="Category Name"
          id="title"
          name="title"
          type="text"
          placeholder="Find Category..."
          icon={BiSolidCategory}
        />

        <div className="flex justify-center py-5 gap-2">
          <button className="bg-blue-500 px-5 py-2 rounded-md" type="submit">
            Search
          </button>
          <Link
            href={`/admin/category?page=${params.page}`}
            as={`/admin/category?page=${params.page}`}
            className="bg-red-500 px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
