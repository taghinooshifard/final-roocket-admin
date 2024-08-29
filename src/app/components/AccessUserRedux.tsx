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
  console.log("AccessUserRedux:user, error, loading", user, error, loading);
  const route = useRouter();
  if (error) route.push("/login");
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="System is checking your access.please wait..." />
      </div>
    );
  if (user) return params.children;
}
