import Image from "next/image";
import empty from "../../../../public/empty.png";
import { TbMoodEmpty } from "react-icons/tb";

interface Props {
  text: string;
}
export default function EmptyList({ text }: Props) {
  return (
    <div className="flex flex-col justify-center items-center border-dashed rounded-lg gap-2 p-2 border-2 ">
      <p className="flex items-center justify-center">
        {text}
        <TbMoodEmpty className="size-6" />
      </p>
      <Image alt="empty data" src={empty} />
    </div>
  );
}
