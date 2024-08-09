"use client";
import ValidationError from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import CategoryData from "@/app/models/CaregoryData";
import CategoryModel from "@/app/models/CaregoryData";
import MessageError from "@/app/exceptions/MessageError";
import innerCategoryForm from "./InnerCategoryForm";
import { Patch } from "@/app/tools/ApiManager";

const CategoryFormSchema = yup.object().shape({
  title: yup.string().required().min(5).max(255),
});
export interface CategoryDefaultValues {
  router: AppRouterInstance;
  mutate?: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  category: CategoryData;
  page?: number;
}
const EditCategoryForm = withFormik<CategoryDefaultValues, CategoryModel>({
  mapPropsToValues: (props) => {
    return {
      title: props.category?.title ?? "",
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    try {
      setSubmitting(true);
      const data = await Patch({
        url: `/api/data?url=/article-category/${props.category.id}`,
        values,
      });
      if (data?.message) {
        await toast.success("Category Changed.");
        setSubmitting(false);
      }

      if (props.mutate) await props.mutate();
      props.page
        ? props.router.push(`/admin/category?page=${props.page}`)
        : props.router.push(`/admin/category`);
    } catch (error: any) {
      if (error instanceof ValidationError) {
        Object.entries(error.messages).forEach(([key, value]) =>
          setFieldError(key, value as string)
        );
      }
      if (error instanceof MessageError) {
        toast.error(error.messages);
      }
    }
  },
  validationSchema: CategoryFormSchema,
})(innerCategoryForm);

export default EditCategoryForm;
