import DeleteConfirmation from "@/app/components/shared/deleteConfirmation";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";

import { useSelector } from "react-redux";
import { selectUser } from "@/app/store/auth";
import Profile from "@/app/models/CaregoryData";
import MessageError from "@/app/exceptions/MessageError";
import Modal from "../../shared/modal";
import EditCategoryForm from "./EditNameForm";
import { Delete } from "@/app/tools/ApiManager";
import ProfileModel from "@/app/models/ProfileData";
import { table } from "console";
import EditNameForm from "./EditNameForm";
import EditPasswordForm from "./EditPasswordForm";

interface Props {
  profile: ProfileModel;
  mutate: KeyedMutator<{
    data: any;
    total_page: any;
  }>;
}
export default function ProfileItem({ profile, mutate }: Props) {
  const user = useSelector(selectUser);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has(`edit-${profile.id}`);
  const isPasswordOpen = () => searchParams.has(`edit-password`);
  return (
    <table>
      <tbody>
        <tr key={profile.id}>
          <td className="hidden">
            {isOpen() && (
              <Modal
                isOpen={true}
                setIsOpen={async () => {
                  await mutate();
                  router.push(`/admin/profile`);
                }}
                title="Edit name"
              >
                {/* app/forms/admin/product/CreateProductForm */}
                <EditNameForm
                  router={router}
                  mutate={mutate}
                  profile={profile}
                />
              </Modal>
            )}
          </td>

          {
            <th scope="col" className="px-6 py-3">
              <Link
                href={`/admin/profile?edit`}
                as={`/admin/profile?edit-${profile.id}`}
                className="rounded-md px-5 py-2 bg-blue-700 text-white "
              >
                Edit
              </Link>
            </th>
          }
          <td className="hidden">
            {isPasswordOpen() && (
              <Modal
                isOpen={true}
                setIsOpen={async () => {
                  await mutate();
                  router.push(`/admin/profile`);
                }}
                title="Change Password"
              >
                {/* app/forms/admin/product/CreateProductForm */}
                <EditPasswordForm
                  router={router}
                  mutate={mutate}
                  profile={profile}
                />
              </Modal>
            )}
          </td>

          {
            <th scope="col" className="px-6 py-3">
              <Link
                href={`/admin/profile?edit-password`}
                as={`/admin/profile?edit-password`}
                className="rounded-md px-5 py-2 bg-blue-700 text-white "
              >
                Change Password
              </Link>
            </th>
          }
        </tr>
      </tbody>
    </table>
  );
}
