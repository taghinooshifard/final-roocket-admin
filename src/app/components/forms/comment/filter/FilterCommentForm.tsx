"use client";
import { withFormik } from "formik";
import * as yup from "yup";
import CommentModel from "@/app/models/CommentModel";
import FilterInnerCommentForm from "./FilterInnerCommentForm";
const CommentFormSchema = yup.object().shape({
  status: yup.string().required(),
});
export interface CommentDefaultValues {
  page?: number;
  postId: number;
  filterFunc: (filter: string) => void;
}
const FilterCommentForm = withFormik<CommentDefaultValues, CommentModel>({
  mapPropsToValues: (props) => {
    return {
      status: "",
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    props.filterFunc(`&status=${values.status}`);
  },
  validationSchema: CommentFormSchema,
})(FilterInnerCommentForm);

export default FilterCommentForm;
