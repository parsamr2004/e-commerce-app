import type { ReactNode } from "react";
import SideBar from "./components/SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
