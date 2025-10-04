import type { ReactNode } from "react";
import { SideBar } from "./components/SideBar";
import LoginPage from "./pages/authentication/LoginPage";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <LoginPage />
      <div className="mx-auto p-5 container flex min-h-screen items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
