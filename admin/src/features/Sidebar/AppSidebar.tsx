import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sidebar_data } from "@/constants/data"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { NavHeader } from "./nav-header"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebar_data} />
      </SidebarContent>
      <SidebarFooter className="p-0">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}