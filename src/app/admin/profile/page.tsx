"use client";
import CommentListItem from "@/app/components/forms/comment/CommentListItem";
import ContactListItem from "@/app/components/forms/contact/ContactListItem";
import PostForm from "@/app/components/forms/post/PostForm";
import PostListItem from "@/app/components/forms/post/PostListItem";
import ProfileItem from "@/app/components/forms/profile/ProfileItem";
import EmptyList from "@/app/components/shared/emptyList";
import LoadingSpinner from "@/app/components/shared/loadingSpinner";
import Modal from "@/app/components/shared/modal";
import ReactCustomePaginate from "@/app/components/shared/reactCustomPaginate";
import useData from "@/app/hooks/useData";
import CommentModel from "@/app/models/CommentModel";
import ContactModel from "@/app/models/ContactModel";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProfilePage() {

  const {
    data: profile,
    error,
    loading,
    mutate,
  } = useData({
    url: `url=profile`,
  });
  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner message="Please Wait.Profile is Fetching..." />
      </div>
    );
  if (error) return <h1>{error.messages}</h1>;
  return (
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      {/* Contact Page Header  */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <hr></hr>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Table Contact Lists */}
        <label className="font-bold">name:</label>

        <p className="font-bold text-2xl">{profile?.data.name}</p>
        <hr></hr>
        <label className="font-bold">email:</label>

        <p className="font-bold text-2xl">{profile?.data.email}</p>
        <hr></hr>
        <ProfileItem mutate={mutate} key={profile.id} profile={profile.data} />
      </div>
    </div>
  );
}
