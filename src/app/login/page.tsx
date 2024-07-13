"use client";
import { Provider } from "react-redux";
import LoginForm from "../components/forms/login/LoginForm";
import { store } from "../store";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/shared/loadingSpinner";
import { redirect, useRouter } from "next/navigation";
import MessageError from "../exceptions/MessageError";
import { Bounce, toast } from "react-toastify";

interface Props {}

export default function LoginPage(params: Props) {
  const { user, error, loading } = useAuth();
  const route = useRouter();
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="سامانه در حال بررسی دسترسی شماست. لطفا منتظر بمانید" />
      </div>
    );
  if (user) route.push("/admin");
  return <LoginForm route={route} />;
}
