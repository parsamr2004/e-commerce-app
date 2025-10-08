"use client";

import {
  LogIn,
  LucideHome,
  LucideShoppingBag,
  LucideShoppingCart,
  LucideHeart,
  UserRoundPlus,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../darkmode/mode-toggle";

const data = {
  users: {
    loggedIn: {
      name: "mamadGholi",
      email: "salam@gamil.com",
      avatar: "/avatars/shadcn.jpg",
    },
  },
  navMain: [
    { title: "داشبورد", url: "#", icon: LucideHome },
    { title: "فروشگاه", url: "#", icon: LucideShoppingBag },
    { title: "سبد خرید", url: "#", icon: LucideShoppingCart },
    { title: "علاقه‌مندی‌ها", url: "#", icon: LucideHeart },
  ],
  guestMenu: [
    { title: "ورود", icon: LogIn, id: "login" },
    { title: "ثبت‌نام ", icon: UserRoundPlus, id: "register" },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isLogin, setIsLogin] = React.useState(false);

  const guestMenuWithActions = data.guestMenu.map((item) => ({
    ...item,
    onClick:
      item.id === "login"
        ? () => setIsLogin(true)
        : () => alert("Register clicked"),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser
          user={data.users.loggedIn}
          isLogin={isLogin}
          guestMenu={guestMenuWithActions}
          onLogoutClick={() => setIsLogin(false)}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
