import { type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import useCartStore from "@/stores/use-cart-store";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const { cartItems } = useCartStore();
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible justify-center"
          >
            <Link to={item.url}>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip={item.title} className="cursor-pointer">
                  {item.icon && <item.icon />}
                  {item.title === "سبد خرید" && cartItems.length > 0 && (
                    <Badge className="absolute -top-0/5 -right-[1px] flex h-[14px] w-[14px] items-center justify-center rounded-full p-[1/5px]">
                      {cartItems.length}
                    </Badge>
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
                <CollapsibleContent></CollapsibleContent>
              </SidebarMenuItem>
            </Link>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
