import type { ReactNode } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { useIsMobile } from "./hooks/use-mobile";
import { AppSidebar } from "./components/sidebar/app-sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar side="right" />
        <SidebarInset>
          {isMobile && <SidebarTrigger className="-ml-1" />}
          <div className="p-5 min-h-screen">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
