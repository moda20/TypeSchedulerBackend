import { CalendarClockIcon, Settings2Icon } from "lucide-react"
import { NavLink, useLocation } from "react-router"

import { useHealthCheck } from "@/hooks/useHealthCheck"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const { data } = useHealthCheck()
  const appName = data?.name ?? "Admin"

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-10 items-center gap-2.5 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-7 shrink-0 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
            <CalendarClockIcon className="size-4" />
          </div>
          <div className="flex min-w-0 flex-col gap-1 group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm leading-none font-medium text-sidebar-foreground">
              {appName}
            </span>
            <span className="truncate text-xs leading-none text-sidebar-foreground/50">
              Configuration console
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <ConfigNavLink />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function ConfigNavLink() {
  const { pathname } = useLocation()

  return (
    <SidebarMenuButton
      isActive={pathname === "/"}
      tooltip="Config"
      render={<NavLink to="/" end />}
    >
      <Settings2Icon />
      <span>Config</span>
    </SidebarMenuButton>
  )
}
