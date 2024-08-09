import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./shared/loadingSpinner";
import React from "react";
import { useAppSelector } from "../hooks";
import { selectUser } from "../store/auth";

interface Props {
  children: React.ReactNode;
}

export default function AccessUserRedux(params: Props) {
  const { user, error, loading } = useAuth();
  const route = useRouter();
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="سامانه در حال بررسی دسترسی شماست. لطفا منتظر بمانید" />
      </div>
    );
  if (user) return params.children;
  if (error) route.push("/login");
}
