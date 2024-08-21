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
import InnerProfileNameForm from "./InnerProfileNameForm";

const ProfileNameSchema = yup.object().shape({
  name: yup.string().required().min(5).max(255),
});
export interface ProfileNameDefaultValues {
  router: AppRouterInstance;
  mutate?: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
  profile: ProfileModel;
  page?: number;
}
const EditNameForm = withFormik<ProfileNameDefaultValues, ProfileModel>({
  mapPropsToValues: (props) => {
    return {
      name: props.profile?.name,
      email: props.profile?.email,
      password: props.profile?.password,
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    try {
      setSubmitting(true);
      const data = await Patch({
        url: `/api/data?url=/profile/update-info`,
        values: { name: values.name },
      });
      if (data?.message) {
        await toast.success("Profile Name Changed.");
        setSubmitting(false);
      }

      if (props.mutate) await props.mutate();
      props.page
        ? props.router.push(`/admin/profile`)
        : props.router.push(`/admin/profile`);
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
  validationSchema: ProfileNameSchema,
})(InnerProfileNameForm);

export default EditNameForm;
