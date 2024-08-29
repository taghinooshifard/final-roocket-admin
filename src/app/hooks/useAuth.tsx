import { Get } from "../tools/ApiManager";
import { useAppDispatch, useAppSelector } from ".";
import { selectUser, updateUser } from "../store/auth";
import useSWR from "swr";
import { useRef } from "react";
export default function useAuth() {
  const dispatch = useAppDispatch();
  const random = useRef(new Date());
  const { data, error, isLoading, isValidating } = useSWR(
    { url: "/api/user", random },
    Get,
    {
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: true,
      errorRetryInterval: 1000 * 3600,
      // onError: props.onError,
    }
  );
  dispatch(updateUser(data?.name));

  return {
    user: useAppSelector(selectUser),
    error,
    loading: isValidating,
  };
}
