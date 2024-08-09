import { TOKEN_NAME } from "../models/DefaultData";
import { Get } from "../tools/ApiManager";
import { useAppDispatch, useAppSelector } from ".";
import { selectUser, updateUser } from "../store/auth";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";
import { useRef } from "react";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const random = useRef(new Date());
  const { data, error, isLoading } = useSWR({ url: "/api/user", random }, Get, {
    refreshInterval: 0,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryInterval: 1000 * 3600,
  });
  dispatch(updateUser(data?.name));
  // console.log("useAuth:", data, error, isLoading);

  return {
    user: useAppSelector(selectUser),
    error,
    loading: isLoading,
  };
}
