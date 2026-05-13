import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react"

export function NavUser() {
  return (
    <div className="p-3 border-t border-gray-800 group-data-[collapsible=icon]:px-1">
      <div className="flex items-center gap-3 px-2 py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
        <Avatar className="h-8 w-8 rounded-lg shrink-0">
          <AvatarImage src="https://github.com/shadcn.png" alt="admin" />
          <AvatarFallback className="rounded-lg bg-linear-to-tr from-indigo-500 to-purple-500 text-white font-bold text-sm">
            AD
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
          <p className="text-sm font-medium text-gray-200 truncate">admin</p>
          <p className="text-xs text-gray-500 truncate">admin@sceeaot.in</p>
        </div>
        <button
          className="cursor-pointer text-gray-500 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-gray-800 shrink-0 group-data-[collapsible=icon]:hidden"
          title="Logout"
        >
          <LogOut size={17} />
        </button>
      </div>
    </div>
  )
}

