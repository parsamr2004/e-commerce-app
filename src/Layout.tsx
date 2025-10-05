import type { ReactNode } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSideBar } from "./components/SideBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSideBar />
      </SidebarProvider>
      <div className="p-5 min-h-screen">{children}</div>
    </div>
  );
};

export default Layout;
