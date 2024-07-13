"use client";
import { BiGlobe } from "@react-icons/all-files/bi/BiGlobe";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaComments, FaUserCog } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdContactMail, MdSpaceDashboard } from "react-icons/md";
import { PiArticleNyTimesBold } from "react-icons/pi";
import Post from "../tools/ApiManager";
import { useRouter } from "next/navigation";
import ValidationError from "../exceptions/validationErrors";
import MessageError from "../exceptions/MessageError";
import { Bounce, toast } from "react-toastify";
import SideBarAdminLayout from "./sideBarLayout";

interface Props {}
export default function AdminPage(params: Props) {
  const [dynamicSidebar, setDynamicSidebar] = useState(true);
  return (
    <>
      <SideBarAdminLayout
        setDynamicSidebar={setDynamicSidebar}
        dynamicSidebar={dynamicSidebar}
      />
      <div className={`p-4 ${dynamicSidebar && `sm:ml-64`}`}>
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                We Learned React and Next in roocket.ir
              </h1>
              <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
                Here at roocket Hesam focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
              <form className="w-full max-w-md mx-auto">
                <label
                  htmlFor="default-email"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Email sign-up
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="default-email"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email here..."
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
          </section>
        </div>
      </div>
    </>
  );
}
