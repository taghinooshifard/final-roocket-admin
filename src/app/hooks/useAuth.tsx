import { TOKEN_NAME } from "../models/DefaultData";
import { Get } from "../tools/ApiManager";
import { useAppDispatch, useAppSelector } from ".";
import { selectUser, updateUser } from "../store/auth";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";

export default function useAuth() {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useSWR(
    TOKEN_NAME,
    async () => {
      return await Get("/api/user");
    },
    {
      refreshInterval: 0,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  dispatch(updateUser(data?.name));

  return {
    user: useAppSelector(selectUser),
    error,
    loading: isLoading,
  };
}
