import CommentModel from "@/app/models/CommentModel";
import { Form, FormikProps } from "formik";
import Link from "next/link";
import { BiSolidCategory } from "react-icons/bi";
import SelectBoxControl from "../../controls/selectBox";
import ContactModel from "@/app/models/ContactModel";
type ContactFormProps = FormikProps<ContactModel> & {
  contact: ContactModel;
  page: number;
};
export default function FilterInnerContactForm(params: ContactFormProps) {
  return (
    <div className="flex gap-4 py-2 px-2 grid-cols-4">
      <Form>
        <SelectBoxControl
          label="Reviewed:"
          id="is_reviewed"
          name="is_reviewed"
          icon={BiSolidCategory}
          options={[
            { label: "Select Reviewed", value: "" },
            { label: "Yes", value: "1" },
            { label: "No", value: "0" },
          ]}
        />

        <div className="flex justify-center py-5 gap-2">
          <button className="bg-blue-500 px-5 py-2 rounded-md" type="submit">
            Search
          </button>
          <Link
            href={`/admin/contact?page=${params.page}`}
            as={`/admin/contact?page=${params.page}`}
            className="bg-red-500 px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
