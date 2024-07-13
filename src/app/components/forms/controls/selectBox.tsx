import { ErrorMessage, Field, FieldProps } from "formik";
import { ChangeEvent } from "react";
import { IconType } from "react-icons";
interface SelectOption {
  label: string;
  value: any;
}

interface Props {
  label: string;
  id: string;
  name: string;
  className?: string;
  errorClassName?: string;
  icon: IconType;
  options: SelectOption[];
  onChange?: (e: ChangeEvent) => void;
}

export default function SelectBoxControl(params: Props) {
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
          <Field id={params.id} name={params.name}>
            {({ field, meta }: FieldProps) => (
              <select
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                  params.className ?? ""
                }`}
                {...field}
                onChange={params.onChange || field.onChange}
              >
                {params.options.map((option, index) => {
                  return (
                    <option
                      key={index}
                      value={option.value}
                      defaultValue={option.value}
                    >
                      {option.label}
                    </option>
                  );
                })}
              </select>
            )}
          </Field>
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
