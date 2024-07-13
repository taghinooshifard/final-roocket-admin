import { Form, FormikProps } from "formik";
import {
  AiOutlineLock,
  AiOutlineLogin,
  AiOutlineMail,
  AiOutlineSave,
} from "react-icons/ai";
import InputControl from "../controls/Input";
import { LoginParams } from "@/app/models/LoginParams";
import Spinner from "../../shared/Spinner";

export default function innerLoginForm(params: FormikProps<LoginParams>) {
  return (
    <Form className="max-w-sm mx-auto space-y-6 mt-8 ">
      <InputControl
        label="Your Email:"
        id="email"
        name="email"
        type="text"
        placeholder="your email..."
        icon={AiOutlineMail}
      />
      <InputControl
        label="Password:"
        id="password"
        name="password"
        type="password"
        icon={AiOutlineLock}
      />

      <div>
        <div className="relative">
          <button
            disabled={params.isSubmitting}
            type="submit"
            className=" flex items-center justify-center gap-1 font-semibold hover:bg-blue-400  bg-blue-200 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Login
            <AiOutlineLogin className="w-6 h-6" />
            {params.isSubmitting && <Spinner />}
          </button>
        </div>
      </div>
    </Form>
  );
}
