"use client";
import LoginForm from "../components/forms/login/LoginForm";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/shared/loadingSpinner";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../hooks";

interface Props {}

export default function LoginPage(params: Props) {
  const { user, error, loading } = useAuth();
  console.log("login:user, error, loading", user, error, loading);
  const route = useRouter();
  const dispatch = useAppDispatch();
  if (error) return <LoginForm route={route} dispatch={dispatch} />;
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="System is ckecking your access.please wait.." />
      </div>
    );

  if (user) route.push("/admin");
}
