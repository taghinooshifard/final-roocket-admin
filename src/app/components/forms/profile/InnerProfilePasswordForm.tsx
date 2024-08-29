import { Form, FormikProps } from "formik";
import Link from "next/link";
import InputControl from "../controls/Input";
import { FaLock, FaUserPen } from "react-icons/fa6";
import Spinner from "../../shared/Spinner";
import ProfileModel from "@/app/models/ProfileData";
type CategoryFormProps = FormikProps<ProfileModel>;
export default function InnerProfilePasswordForm(params: CategoryFormProps) {
  return (
    <div className="flex gap-4 py-2 px-2 grid-cols-4">
      <Form>
        <InputControl
          label="Password:"
          id="password"
          name="password"
          type="text"
          placeholder="password..."
          icon={FaLock}
        />
        <InputControl
          label="Confirm Password:"
          id="password_confirmation"
          name="password_confirmation"
          type="text"
          placeholder="confirm password..."
          icon={FaLock}
        />

        <div className="flex justify-center py-5 gap-2">
          <button
            disabled={params.isSubmitting}
            className="bg-blue-500 px-5 py-2 rounded-md"
            type="submit"
          >
            {"Change Password"}
            {params.isSubmitting && <Spinner />}
          </button>
          <Link
            href={"/admin/profile"}
            as={"/admin/profile"}
            className="bg-red-500 px-5 py-2 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </Form>
    </div>
  );
}
