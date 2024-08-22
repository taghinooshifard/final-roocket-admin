"use client";
import ValidationError from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import PostModel from "@/app/models/PostData";
import MessageError from "@/app/exceptions/MessageError";
import { Patch } from "@/app/tools/ApiManager";
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
  post: PostModel;
  page?: number;
}

const EditPostForm = withFormik<PostDefaultValues, PostModel>({
  mapPropsToValues: (props) => {
    return {
      title: props.post.title,
      slug: props.post.slug,
      is_published: props.post.is_published,
      category_id: props.post.category_id,
      content: props.post.content,
      image_url: props.post.image_url,
      keywords: props.post.keywords,
      description: props.post.description,
      summary: props.post.summary,
      published_at: props.post.published_at,
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    try {
      setSubmitting(true);

      const data = await Patch({
        url: `/api/data?url=/article/${props.post.slug}`,
        values,
      });
      if (data?.message) {
        await toast.success("Post Updated.");
        setSubmitting(false);
      }
      if (props.mutate) await props.mutate();
      props.router.push(`/admin/post?page=${props.page}`);
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

export default EditPostForm;
