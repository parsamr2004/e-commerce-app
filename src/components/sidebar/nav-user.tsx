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
import { Collapsible } from "@radix-ui/react-collapsible";
import {
  BadgeCheck,
  ChevronsUpDown,
  LogOut,
  LucideLoader2,
  LucideLogIn,
  LucideUserPlus,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

// ============================
// منوهای کاربر مهمان و کاربر عادی
// ============================
const guestMenu = [
  { title: "ورود", icon: LucideLogIn, href: "/login" },
  { title: "ثبت‌ نام", icon: LucideUserPlus, href: "/register" },
];

const userMenu = [{ title: "پروفایل", icon: BadgeCheck, href: "/profile" }];

const adminMenu = [{ title: "داشبورد", icon: Sparkles, href: "/admin/dashboard" }];

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: user, isLoading } = useUser();
  const { mutate: logout } = useLogout();

  const isAdmin = localStorage.getItem("isAdmin")
    ? JSON.parse(localStorage.getItem("isAdmin")!)
    : false;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LucideLoader2 className="size-4 animate-spin" />
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let menuItems: { title: string; icon: any; href: string }[] = [];

  if (!user) {
    menuItems = guestMenu;
  } else {
    menuItems = [...userMenu];
    if (isAdmin) menuItems.push(...adminMenu);
  }

  return (
    <SidebarMenu>
      {/* نمایش آیتم‌ها */}
      {menuItems.map((item) => (
        <Link to={item.href} key={item.title}>
          <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        </Link>
      ))}

      {/* Dropdown منوی کاربر (فقط وقتی وارد شده) */}
      {user && (
        <SidebarMenuItem>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild className="cursor-pointer">
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {user.username[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.username}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 opacity-60" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">
                      {user.username[0]?.toUpperCase() ?? "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.username}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer">
                  <BadgeCheck />
                  پروفایل
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                      <Sparkles />
                      داشبورد
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => logout()} className="cursor-pointer">
                <LogOut />
                خروج از حساب
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
