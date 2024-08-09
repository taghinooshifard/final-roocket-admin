import { ErrorMessage, Field } from "formik";
import { IconType } from "react-icons";

interface Props {
  label: string;
  type: string;
  id: string;
  name: string;
  className?: string;
  errorClassName?: string;
  placeholder?: string;
  icon: IconType;
}

export default function CheckBox(params: Props) {
  return (
    <div>
      <label
        htmlFor={params.id}
        className="flex float-start justify-center gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {params.label}
        <Field
          type="checkbox"
          id={params.id}
          name={params.name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            params.className ?? ""
          }`}
          
        />
      </label>

      <ErrorMessage
        name={params.name}
        className={`text-red-500 mt-3 ${params.errorClassName ?? ""}`}
        component={"div"}
      />
    </div>
  );
}
