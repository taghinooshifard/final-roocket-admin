import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./shared/loadingSpinner";
import Spinner from "./shared/Spinner";
import { BiUserCircle } from "react-icons/bi";

export default function UserInfo() {
  const router = useRouter();
  const { user, error, loading } = useAuth();
  if (loading)
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  if (error) router.push("/login");

  return (
    <>
      <BiUserCircle size={25} />
      <span className="font-semibold">{user}</span>
    </>
  );
}
