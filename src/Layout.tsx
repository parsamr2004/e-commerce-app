import { Outlet } from "react-router";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { useIsMobile } from "./hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar side="right" />
        <SidebarInset>
          {isMobile && <SidebarTrigger className="-ml-1" />}
          <div className="p-5 min-h-screen">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
