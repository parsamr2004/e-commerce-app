import { ComponentType } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useLogout from "@/hooks/use-logout";
import useUser from "@/hooks/use-user";
import {
  ChevronsUpDown,
  LogOut,
  LucideLoader2,
  LucideLogIn,
  LucideUserPlus,
  LucideUserRoundPen,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

interface MenuItem {
  title: string;
  icon: ComponentType<any>;
  href: string;
}

const guestMenu: MenuItem[] = [
  { title: "ورود", icon: LucideLogIn, href: "/login" },
  { title: "ثبت‌نام", icon: LucideUserPlus, href: "/register" },
];

const adminMenu: MenuItem[] = [{ title: "داشبورد", icon: Sparkles, href: "/admin/dashboard" }];

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: user, isLoading } = useUser();
  const { mutate: logout } = useLogout();

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <LucideLoader2 className="mx-auto size-4 animate-spin" />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const isAdmin = user?.isAdmin === true; // چک صریح برای boolean
  const menuItems = user ? (isAdmin ? adminMenu : []) : guestMenu;
  const dropdownMenuItems: MenuItem[] = [
    { title: "پروفایل", icon: LucideUserRoundPen, href: "/profile" },
    ...(isAdmin ? [{ title: "داشبورد", icon: Sparkles, href: "/admin/dashboard" }] : []),
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.title}>
          <Link to={item.href}>
            <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
              <item.icon className="size-4" />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}

      {user && (
        <SidebarMenuItem>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user.username?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate font-medium">{user.username}</span>
                <ChevronsUpDown className="ml-auto size-4 opacity-60" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {user.username?.[0]?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid">
                    <span className="truncate font-medium">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {dropdownMenuItems.map((item) => (
                  <DropdownMenuItem asChild key={item.title}>
                    <Link to={item.href} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => logout()}
                className="flex cursor-pointer items-center gap-2"
              >
                <LogOut className="size-4" />
                خروج از حساب
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
