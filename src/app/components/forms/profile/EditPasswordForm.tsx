"use client";
import ValidationError from "@/app/exceptions/validationErrors";
import { withFormik } from "formik";
import * as yup from "yup";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import MessageError from "@/app/exceptions/MessageError";
import { Patch } from "@/app/tools/ApiManager";
import ProfileModel from "@/app/models/ProfileData";
import InnerProfilePasswordForm from "./InnerProfilePasswordForm";

const ProfilePasswordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export interface ProfileNameDefaultValues {
  router: AppRouterInstance;
  mutate?: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  profile: ProfileModel;
}
const EditPasswordForm = withFormik<ProfileNameDefaultValues, ProfileModel>({
  mapPropsToValues: (props) => {
    return {
      name: props.profile?.name,
      email: props.profile?.email,
      password: props.profile?.password,
      password_confirmation: props.profile?.password_confirmation,
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    try {
      setSubmitting(true);
      const data = await Patch({
        url: `/api/data?url=/profile/update-password`,
        values,
      });
      if (data?.message) {
        await toast.success("Password Changed.");
        setSubmitting(false);
      }

      if (props.mutate) await props.mutate();
      props.router.push(`/admin/profile`);
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
  validationSchema: ProfilePasswordSchema,
})(InnerProfilePasswordForm);

export default EditPasswordForm;
