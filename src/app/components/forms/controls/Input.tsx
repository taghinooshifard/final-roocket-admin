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

export default function InputControl(params: Props) {
  return (
    <div>
      <label
        htmlFor={params.id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {params.label}
      </label>
      <div className="relative ">
        <div className="flex items-center">
          <div className="absolute inset-y-3 start-0 flex items-center h-5 ps-3.5 pointer-events-none">
            <params.icon className="w-5 h-5" />
          </div>
          <Field
            type={params.type}
            id={params.id}
            name={params.name}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              params.className ?? ""
            }`}
            placeholder={params.placeholder}
          />
        </div>
        <ErrorMessage
          name={params.name}
          className={`text-red-500 mt-3 ${params.errorClassName ?? ""}`}
          component={"div"}
        />
      </div>
    </div>
  );
}
