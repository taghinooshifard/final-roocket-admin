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
import InnerPostForm from "./InnerPostForm";
const PostFormSchema = yup.object().shape({
  title: yup.string().required().min(5).max(255),
  slug: yup.string().required().min(5).max(255),
  is_published: yup.boolean().required(),
  category_id: yup.number().moreThan(0, "Please Select a Category"),
  image_url: yup.string().url("Url is not correct"),
});
export interface PostDefaultValues {
  router: AppRouterInstance;
  mutate?: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
}
const PostForm = withFormik<PostDefaultValues, PostModel>({
  mapPropsToValues: (props) => {
    return {
      title: "",
      slug: "",
      is_published: false,
      category_id: 0,
      content: "",
      image_url: "",
      published_at: 0,
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    try {
      setSubmitting(true);

      const data = await Post({
        url: "/api/data?url=/article",
        values,
      });
      if (data?.message) {
        await toast.success("Post Added.");
        setSubmitting(false);
      }

      if (props.mutate) await props.mutate();
      props.router.push("/admin/post");
    } catch (error: any) {
      setSubmitting(false);
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
  validationSchema: PostFormSchema,
})(InnerPostForm);

export default PostForm;
