"use client";
import ValidationError from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { Bounce, toast } from "react-toastify";
import { KeyedMutator } from "swr";
import CategoryModel from "@/app/models/CaregoryData";
import MessageError from "@/app/exceptions/MessageError";
import innerCategoryForm from "./FilterInnerCategoryForm";
import FilterInnerCategoryForm from "./FilterInnerCategoryForm";
const CategoryFormSchema = yup.object().shape({
  title: yup.string().required(),
});
export interface CategoryDefaultValues {
  page?: number;
  filterFunc: (filter: string) => void;
}
const FilterCategoryForm = withFormik<CategoryDefaultValues, CategoryModel>({
  mapPropsToValues: (props) => {
    return {
      title: "",
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    props.filterFunc(`&title=${values.title}`);
  },
  validationSchema: CategoryFormSchema,
})(FilterInnerCategoryForm);

export default FilterCategoryForm;
