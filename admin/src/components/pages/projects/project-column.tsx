import type { ColumnDef } from "@tanstack/react-table"
import { FaGithub, FaYoutube } from "react-icons/fa";
import { BsFiletypePpt } from "react-icons/bs";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import StatusBadge from "@/components/ui/status-badge";


export type ProjectDetails = {
    _id: string,
    projectName: string,
    projectThemes: string[],
    projectTracks: string[],
    teamSecret: string,
    round: number,
    githubUrl: string,
    presentationUrl: string,
    demoVideoUrl: string,
    status: string,
}

const ProjectActionsCell = ({ row }: { row: ProjectDetails }) => {
    const queryClient = useQueryClient();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const deleteMutation = useMutation({
        mutationFn: async (props: ProjectDetails) =>{
            const teamSecret = props.teamSecret;
            const round = props.round;

            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/projects/${teamSecret}/${round}`, {
                data: {
                    teamLeaderEmail: "admin@admin.com" 
                }
            })
            return response.data
        },
        onSuccess: () => {
            setIsDeleteOpen(false);
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project deleted successfully", {
                position: "top-center"
            })
        },
        onError: (error: any) => {
            setIsDeleteOpen(false);
            toast.error(error.response?.data?.message || error.message, {
                position: "top-center"
            })
        }
    });

    return (
        <div className="flex justify-center gap-2">
            <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-indigo-400 cursor-pointer" asChild>
                <Link to={`/projects/${row.teamSecret}`} state={{ project: row }}>
                    <Eye size={18} />
                </Link>
            </Button>
            
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-rose-400 cursor-pointer">
                        <Trash2 size={18} />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the project "{row.projectName}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button className="cursor-pointer" variant="outline">Cancel</Button>
                        </DialogClose>
                        {deleteMutation.isPending ? (
                            <Button disabled className="cursor-pointer" variant="outline">Deleting...</Button>
                        ) : (
                            <Button onClick={() => deleteMutation.mutate(row)} className="bg-rose-500/60 hover:bg-rose-500/80 text-white cursor-pointer" type="submit">Delete</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export const projectColumns: ColumnDef<ProjectDetails>[] = [
    {
        accessorKey: "projectName",
        header: "Project Name",
    },
    {
        accessorKey: "teamName",
        header: () => <div className="text-center">Team Name</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <span className="text-gray-300">
                    {row.original.teamSecret}
                </span>
            </div>
        )
    },
    {
        accessorKey: "projectThemes",
        header: () => <div className="text-center">Themes</div>,
        cell: ({ row }) => (
            <div className="flex flex-col items-center justify-center gap-1">
                {row.original.projectThemes?.map((theme, index) => (
                    <span key={index} className="text-gray-300 text-center text-sm">
                        {theme}
                    </span>
                ))}
            </div>
        )
    },
    {
        accessorKey: "projectTracks",
        header: () => <div className="text-center">Tracks</div>,
        cell: ({ row }) => (
            <div className="flex flex-col items-center justify-center gap-1">
                {row.original.projectTracks?.map((track, index) => (
                    <span key={index} className="text-gray-300 text-center text-sm">
                        {track}
                    </span>
                ))}
            </div>
        )
    },
    {
        accessorKey: "round",
        header: () => <div className="text-center">Round</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <span className="text-gray-300">
                    {row.original.round}
                </span>
            </div>
        )
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <StatusBadge status={row.original.status} />
            </div>
        )
    },
    {
        accessorKey: "links",
        header: () => <div className="text-center">Links</div>,
        cell: ({ row }) => (
            <div className="flex flex-col items-start gap-2 w-fit mx-auto">
                {row.original.githubUrl && (
                    <a href={row.original.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/10 px-2 py-1 rounded-md transition-all text-sm w-full">
                        <FaGithub size={16} /> GitHub
                    </a>
                )}
                {row.original.presentationUrl && (
                    <a href={row.original.presentationUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/10 px-2 py-1 rounded-md transition-all text-sm w-full">
                        <BsFiletypePpt size={16} /> Presentation
                    </a>
                )}
                {row.original.demoVideoUrl && (
                    <a href={row.original.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/10 px-2 py-1 rounded-md transition-all text-sm w-full">
                        <FaYoutube size={16} /> Demo
                    </a>
                )}
            </div>
        )
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({row}) => <ProjectActionsCell row={row.original} />
    }
]