import type { SidebarDataProps } from "@/types/type";
import { FolderKanban, LayoutDashboard, Users, UsersRound } from "lucide-react";

export const sidebar_data: SidebarDataProps[] = [
    {
        id: 1,
        title: "Dashboard",
        icon: LayoutDashboard,
        link: "/"
    },
    {
        id: 2,
        title: "Users Management",
        icon: Users,
        link: "/users-management"
    },
    {
        id: 3,
        title: "Teams",
        icon: UsersRound,
        link: "/teams"
    },
    {
        id: 4,
        title: "Projects",
        icon: FolderKanban,
        link: "/projects"
    }
]