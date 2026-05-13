import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { SidebarDataProps } from "@/types/type"
import { useLocation, Link } from "react-router-dom"

export function NavMain({ items }: { items: SidebarDataProps[] }) {
  const location = useLocation()

  return (
    <SidebarMenu className="gap-1.5 px-3 py-2 group-data-[collapsible=icon]:px-1">
      {items.map((item) => {
        const isActive = location.pathname === item.link
        return (
          <SidebarMenuItem key={item.title} className="relative">
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-indigo-500 rounded-r-full group-data-[collapsible=icon]:hidden" />
            )}
            <Link
              to={item.link}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 [&_svg]:size-[18px] [&_svg]:shrink-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-2 group-data-[collapsible=icon]:rounded-lg ${
                isActive
                  ? "bg-indigo-500/10 text-indigo-400 font-medium"
                  : "text-gray-400 hover:bg-[#25262b] hover:text-gray-200"
              }`}
            >
              {item.icon && (
                <item.icon
                  className={isActive ? "text-indigo-400" : "text-gray-500 group-hover:text-gray-300"}
                />
              )}
              <span className="group-data-[collapsible=icon]:hidden truncate">{item.title}</span>
            </Link>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}
