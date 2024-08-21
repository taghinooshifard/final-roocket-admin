"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdContactMail, MdSpaceDashboard } from "react-icons/md";
import { BiSolidCategory, BiUserCircle } from "react-icons/bi";
import { PiArticleNyTimesBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
} from "react-icons/hi2";
import Modal from "../components/shared/modal";
import LogOut from "../components/forms/logout/LogOut";
import UserInfo from "../components/UserInfo";
import { useAppDispatch } from "../hooks";
interface Props {
  setDynamicSidebar: Dispatch<SetStateAction<boolean>>;
  dynamicSidebar: boolean;
}
export default function SideBarAdminLayout(props: Props) {
  {
    /* menu list item object  */
  }
  const navigations = [
    {
      href: "/admin",
      name: "Dashboard",
      icon: MdSpaceDashboard,
    },
    {
      href: "/admin/category",
      name: "Category",
      icon: BiSolidCategory,
    },
    {
      href: "/admin/post",
      name: "Post",
      icon: PiArticleNyTimesBold,
    },
    {
      href: "/admin/contact",
      name: "Contacts",
      icon: MdContactMail,
    },
    {
      href: "/admin/profile",
      name: "Profile",
      icon: CgProfile,
    },

    {
      href: "/admin?logout",
      name: "Logout",
      icon: IoLogOut,
    },
  ];
  const LanguageIcons = [
    {
      name: "Persian",
      alt: "Persian Flag",
      src: "/fa.png",
      dir: "rtl",
    },
    {
      name: "English",
      alt: "English Flag",
      src: "/en.png",
      dir: "ltr",
    },
  ];

  {
    /* state that show active menu initiale with "Dashboard" menu */
  }
  const currentPath = usePathname();
  const [selectedLanguage, setSelectedLanguage] = useState(LanguageIcons[1]);
  const [showLangMenu, setShowLangMenu] = useState(true);
  const [subMenuTransfer, setSubMenuTransfer] = useState({
    position: "absolute",
    inset: "0px auto auto 0px",
    margin: " 0px",
    transform: "translate3d(1150px, 50px, 0px)",
  });
  useEffect(() => {
    function handleResize() {
      setSubMenuTransfer({
        position: "absolute",
        inset: "0px auto auto 0px",
        margin: " 0px",
        transform: `translate3d(${window.innerWidth - 130}px, 50px, 0px)`,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setSubMenuTransfer({
      position: "absolute",
      inset: "0px auto auto 0px",
      margin: " 0px",
      transform: `translate3d(${window.innerWidth - 140}px, 50px, 0px)`,
    });
  }, [showLangMenu]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = () => searchParams.has("logout");
  return (
    <>
      {/* Modal LogOut Form */}
      {isOpen() && (
        <Modal
          isOpen={isOpen()}
          setIsOpen={() => {
            router.push("/admin?logout");
          }}
          title="Logout "
        >
          {/* app/forms/admin/product/CreateProductForm */}
          <LogOut />
        </Modal>
      )}
      {/* mobile menu buttons */}
      <nav className="fixed top-0 h-20 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {/** Mobile Button && Site Logo */}
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={() => {
                  props.setDynamicSidebar(!props.dynamicSidebar);
                }}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg ${
                  props.dynamicSidebar && `hidden`
                } hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
              >
                <span className="sr-only">Open sidebar</span>
                <HiOutlineAdjustmentsHorizontal className="size-6 " />
              </button>
              <a href="https://roocket.ir" className="flex ms-2 md:me-24">
                <Image
                  width={40}
                  height={40}
                  src="/tailwind.svg"
                  className="h-8 me-3"
                  alt="Site Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Blog Management
                </span>
              </a>
            </div>
            {/** Language Selector */}
            <div className="flex items-center justify-center">
              <UserInfo />
              <div className="flex flex-col items-end ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm  rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => {
                      setShowLangMenu(!showLangMenu);
                    }}
                  >
                    <span className="sr-only">Open user menu</span>

                    <Image
                      width={30}
                      height={20}
                      src={selectedLanguage.src}
                      alt={selectedLanguage.alt}
                    />
                  </button>
                </div>
                <div
                  className={`z-50 absolute ${
                    showLangMenu ? "hidden" : "block"
                  } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                  //"position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(850px, 77px, 0px);"
                  style={{ ...subMenuTransfer }}
                >
                  <ul className="py-1" role="none">
                    {LanguageIcons.map((value, index) => {
                      return (
                        <li key={index}>
                          <a
                            href="#"
                            className="flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                            onClick={() => {
                              setSelectedLanguage(
                                LanguageIcons.filter(
                                  (item) => item.name == value.name
                                )[0]
                              );
                              setShowLangMenu(!showLangMenu);
                            }}
                          >
                            {value.name}{" "}
                            <Image
                              width={30}
                              height={20}
                              src={value.src}
                              alt={value.alt}
                            />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* side bar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 pt-16 z-40 w-64 h-screen transition-transform   ${
          props.dynamicSidebar ? `translate-x-0` : `-translate-x-64`
        } `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {/* close buttons */}
          <div className="flex justify-end mb-2 mt-1">
            <a
              href="#"
              onClick={() => {
                props.setDynamicSidebar(!props.dynamicSidebar);
              }}
            >
              <HiOutlineXMark className="size-6 hover:bg-blue-300" />
            </a>
          </div>
          {/** right menu  */}
          <ul className="space-y-2 font-medium">
            {/** navigation list  */}
            {navigations.map((menu) => {
              return (
                <li key={menu.name}>
                  <Link
                    as={menu.href}
                    href={menu.href}
                    className={`flex items-center p-2 text-gray-900 rounded-lg ${
                      menu.href == currentPath && `bg-blue-300`
                    } dark:text-white hover:bg-blue-300 dark:hover:bg-blue-300 group`}
                  >
                    <menu.icon className="size-6" />
                    <span className="ms-3">{menu.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
}
