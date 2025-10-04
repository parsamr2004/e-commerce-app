import type { ReactNode } from "react";
import LoginPage from "./pages/authentication/LoginPage";
import { Sidebar } from "lucide-react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <LoginPage />
      <div className="mx-auto p-5 container flex min-h-screen items-center">
        {children}
      </div>
      <div className="p-5 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
