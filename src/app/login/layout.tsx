"use client";

import { Provider } from "react-redux";
import { store } from "../store";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Provider store={store}>{children}</Provider>
    </div>
  );
}
