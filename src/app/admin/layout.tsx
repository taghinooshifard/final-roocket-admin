"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import AccessUserRedux from "../components/AccessUserRedux";
import { useState } from "react";
import SideBarAdminLayout from "./sideBarLayout";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [dynamicSidebar, setDynamicSidebar] = useState(true);
  return (
    <div>
      <Provider store={store}>
        <AccessUserRedux>
          <SideBarAdminLayout
            setDynamicSidebar={setDynamicSidebar}
            dynamicSidebar={dynamicSidebar}
          />
          <div className={`p-4 ${dynamicSidebar && `sm:ml-64`}`}>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
              {children}
            </div>
          </div>
        </AccessUserRedux>
      </Provider>
    </div>
  );
}
