import { ReactElement, SetStateAction } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
interface Props {
  children: ReactElement;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  isOpen: boolean;
  title: string;
}
export default function Modal({ children, setIsOpen, isOpen, title }: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-40">
        <DialogPanel className="max-w-lg space-y-4 border bg-white rounded-md shadow-md  ">
          <DialogTitle className="font-bold bg-gray-300  py-2 px-2">
            {title}
          </DialogTitle>

          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
