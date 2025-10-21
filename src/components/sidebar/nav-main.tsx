import { type LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

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
