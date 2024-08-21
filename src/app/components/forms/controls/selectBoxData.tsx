import useData from "@/app/hooks/useData";
import { ErrorMessage, Field, FieldProps } from "formik";
import { ChangeEvent, useEffect, useState } from "react";
import { IconType } from "react-icons";
import LoadingSpinner from "../../shared/loadingSpinner";
import { BiSolidCategory } from "react-icons/bi";
import SelectBoxControl from "./selectBox";
import CategoryModel from "@/app/models/CaregoryData";
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
  options?: SelectOption[];
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  fetchUrl: string;
  firstOption: string;
}

export default function SelectBoxData(params: Props) {
  const [reload, setReload] = useState(true);
  const {
    data: categoryList,
    error,
    loading,
  } = useData({
    url: params.fetchUrl,
  });

  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Fetching..." />
      </div>
    );
  if (error)
    return (
      <div className="flex  justify-start mt-4 border">
        <p className="text-lg">{error.messages}</p>
        <button
          className="px-2 py-1 rounded-md bg-slate-600 text-white"
          onClick={() => {
            setReload(!reload);
          }}
        >
          reload
        </button>
      </div>
    );
    if (categoryList?.data[0]?.value != "0")
    categoryList?.data.unshift({
      value: "0",
      label: "Please Select",
    });
  return (
    <SelectBoxControl
      label="Category:"
      id="category_id"
      name="category_id"
      icon={BiSolidCategory}
      options={categoryList?.data?.map(
        (category: { value: string; label: string }) => {
          return { label: category.label, value: category.value };
        }
      )}
    />
  );
}
