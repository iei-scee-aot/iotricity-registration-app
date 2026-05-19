import type { SidebarDataProps } from "@/types/type";
import { FolderKanban, Users, UsersRound } from "lucide-react";

export const sidebar_data: SidebarDataProps[] = [
    {
        id: 1,
        title: "Users Management",
        icon: Users,
        link: "/"
    },
    {
        id: 2,
        title: "Teams",
        icon: UsersRound,
        link: "/teams"
    },
    {
        id: 3,
        title: "Projects",
        icon: FolderKanban,
        link: "/projects"
    }
]