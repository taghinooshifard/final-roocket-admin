"use client";
import ValidationError from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { Bounce, toast } from "react-toastify";
import { KeyedMutator } from "swr";
import PostModel from "@/app/models/PostData";
import MessageError from "@/app/exceptions/MessageError";
import Post from "@/app/tools/ApiManager";
import innerPostForm from "./FilterInnerPostForm";
import FilterInnerPostForm from "./FilterInnerPostForm";
const PostFormSchema = yup.object().shape({});
export interface PostDefaultValues {
  page?: number;
  filterFunc: (filter: string) => void;
}
const FilterPostForm = withFormik<PostDefaultValues, PostModel>({
  mapPropsToValues: (props) => {
    return {
      title: "",
      slug: "",
      is_published: false,
      category_id: 0,
      content: "",
      image_url: "",
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    let queryFilter = "";
    if (values?.title && values?.title?.length > 0)
      queryFilter = `&title=${values?.title}`;
    if (values?.category_id && values?.category_id > 0)
      queryFilter += `&category_id=${values?.category_id}`;

    queryFilter += `&is_published=${values?.is_published ? 1 : 0}`;
    if (queryFilter.length > 0) props.filterFunc(queryFilter);
  },
  validationSchema: PostFormSchema,
})(FilterInnerPostForm);

export default FilterPostForm;
