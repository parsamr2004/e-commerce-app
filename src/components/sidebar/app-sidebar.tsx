import { LucideHome, LucideShoppingBag, LucideShoppingCart, LucideHeart } from "lucide-react";
import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarRail } from "@/components/ui/sidebar";
import { ModeToggle } from "../darkmode/mode-toggle";

const data = {
  navMain: [
    { title: "داشبورد", url: "/", icon: LucideHome },
    { title: "فروشگاه", url: "/shop", icon: LucideShoppingBag },
    { title: "سبد خرید", url: "/cart", icon: LucideShoppingCart },
    { title: "علاقه‌مندی‌ها", url: "/favorites", icon: LucideHeart },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
