import {
  Home,
  LucideHandbag,
  LucideHeart,
  LucideLogIn,
  LucideShoppingCart,
  LucideUserRoundPlus,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "داشبورد",
    url: "#",
    icon: Home,
  },
  {
    title: "فروشگاه",
    url: "#",
    icon: LucideHandbag,
  },
  {
    title: "سبد خرید",
    url: "#",
    icon: LucideShoppingCart,
  },
  {
    title: "علاقه‌مندی‌ها",
    url: "#",
    icon: LucideHeart,
  },
];

const authItems = [
  { title: "ورود", url: "/login", icon: LucideLogIn },
  { title: "ثبت‌نام", url: "/signup", icon: LucideUserRoundPlus },
];

export function AppSideBar() {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar side="right" variant="sidebar" collapsible="icon">
      <SidebarContent onClick={toggleSidebar}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {authItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
