import type { ReactNode } from "react";
import SideBar from "./components/SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="p-5 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
