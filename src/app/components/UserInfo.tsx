import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "./shared/loadingSpinner";
import Spinner from "./shared/Spinner";
import { BiUserCircle } from "react-icons/bi";
import { useAppSelector } from "../hooks";
import { selectUser } from "../store/auth";

export default function UserInfo() {
  return (
    <>
      <BiUserCircle size={25} />
      <span className="font-semibold mr-3">{useAppSelector(selectUser)}</span>
    </>
  );
}
