"use client";
import { withFormik } from "formik";
import * as yup from "yup";
import ContactModel from "@/app/models/ContactModel";
import FilterInnerContactForm from "./FilterInnerContactForm";
const ContactFormSchema = yup.object().shape({
  is_reviewed: yup.number().required(),
});
export interface ContactDefaultValues {
  page?: number;
  filterFunc: (filter: string) => void;
}
const FilterContactForm = withFormik<ContactDefaultValues, ContactModel>({
  mapPropsToValues: (props) => {
    return {
      name: "",
      email: "",
      is_reviewed: false,
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    props.filterFunc(`&is_reviewed=${values.is_reviewed}`);
  },
  validationSchema: ContactFormSchema,
})(FilterInnerContactForm);

export default FilterContactForm;
