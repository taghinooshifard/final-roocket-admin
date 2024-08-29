import { FormikContext, withFormik } from "formik";
import innerLoginForm from "./InnerLoginForm";
import * as yup from "yup";
import { LoginParams } from "@/app/models/LoginParams";
import Post from "@/app/tools/ApiManager";
import { Bounce, toast } from "react-toastify";
import MessageError from "@/app/exceptions/MessageError";
import ValidationError from "@/app/exceptions/validationErrors";
import { useDispatch } from "react-redux";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { AuthState, updateUser } from "@/app/store/auth";
const loginFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(8),
});
export interface LoginDefaultValues {
  route: AppRouterInstance;
  dispatch: ThunkDispatch<
    {
      auth: AuthState;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>;
}
const LoginForm = withFormik<LoginDefaultValues, LoginParams>({
  validationSchema: loginFormSchema,
  mapPropsToValues: (props) => {
    return {
      email: "",
      password: "",
    };
  },
  handleSubmit: async (values, { props, setFieldError, setSubmitting }) => {
    try {
      setSubmitting(true);
      const data = await Post({ url: "/api/authenticate", values });
      if (data?.token) {
        const user = await Post({
          url: "/api/login",
          values: { token: data?.token },
        });
        toast.success("Wellcom to admin panel", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        props.dispatch(updateUser(undefined));
        props.route.push("/admin");
        setSubmitting(false);
      }
    } catch (error: any) {
      setSubmitting(false);
      if (error instanceof ValidationError) {
        Object.entries(error.messages).forEach(([key, value]) =>
          setFieldError(key, value as string)
        );
      }
      if (error instanceof MessageError) {
        toast.error(error.messages, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  },
})(innerLoginForm);

export default LoginForm;
