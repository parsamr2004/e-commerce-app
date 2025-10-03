import type { ReactNode } from "react";
import SideBar from "./components/SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="mx-auto p-5 container flex min-h-screen items-center">{children}</div>
    </div>
  );
};

export default Layout;
