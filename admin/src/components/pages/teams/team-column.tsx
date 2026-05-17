import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { Check, CheckCheck, Eye, Trash2, Users2 } from "lucide-react"
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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"


export type TeamDetails = {
    _id?: string,
    teamName: string,
    teamLead: string,
    teamLeadEmail: string,
    teamSecret: string,
    totalTeamMembers: string,
    registrationStatus: "Unregistered" | "Registered" | "Verified" | "Paid",
}


const TeamActionsCell = ({ row }: { row: TeamDetails }) => {
    const queryClient = useQueryClient();
    const [isVerifyOpen, setIsVerifyOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const isStatusButtonVisible = row.registrationStatus === "Registered" || row.registrationStatus === "Verified" || row.registrationStatus === "Paid";

    const isDeleteButtonDisabled = row.registrationStatus === "Registered" || row.registrationStatus === "Verified" || row.registrationStatus === "Paid";

    const deleteMutation = useMutation({
        mutationFn: async (props: TeamDetails) =>{
            const teamSecret = props.teamSecret;
            const teamLeadEmail = props.teamLeadEmail;
            console.log(teamLeadEmail);
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/teams/${teamSecret}`, {
                data: {
                    teamLeaderEmail: teamLeadEmail
                }
            })
            return response.data
        },
        onSuccess: () => {
            setIsDeleteOpen(false);
            queryClient.invalidateQueries({ queryKey: ["teams"] });
            toast.success("Team deleted successfully", {
                position: "top-center"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "top-center"
            })
        }
    });

    const updateMutation = useMutation({
        mutationFn: async (props: TeamDetails) => {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/teams/${props.teamSecret}/status`, {
                registrationStatus: "VERIFIED"
            })
            return response.data
        },
        onSuccess: () => {
            setIsVerifyOpen(false);
            queryClient.invalidateQueries({ queryKey: ["teams"] });
            toast.success("Team updated successfully", {
                position: "top-center"
            })
        },
        onError: (error) => {
            toast.error(error.message, {
                position: "top-center"
            })
        }
    })

    return (
        <div className="flex justify-center">

            {/* status update button */}
            {isStatusButtonVisible && <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button disabled={row.registrationStatus === "Verified"} className="cursor-pointer hover:text-green-400" variant="ghost">
                                {row.registrationStatus === "Verified" ? <CheckCheck className="text-emerald-400" /> : <Check />}
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>Verify Status</p>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Verify</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to verify the team "{row.teamName}"
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button className="cursor-pointer" variant="outline">Cancel</Button>
                    </DialogClose>
                    {updateMutation.isPending ? (
                        <Button disabled className="cursor-pointer" variant="outline">Verifying...</Button>
                    ) : (
                        <Button onClick={() => updateMutation.mutate(row)} className="bg-green-500/60 hover:bg-green-500/80 text-white cursor-pointer" type="submit">Verify</Button>
                    )}
                </DialogFooter>
                </DialogContent>
            </Dialog>}

            {/* team detail view button */}
            
            <Button variant={"ghost"} className="flex flex-row gap-4 cursor-pointer hover:text-indigo-400 h-8 w-8 p-0">
                <Link to={`/teams/${row.teamName}`} state={{ team: row }}><Eye /></Link>
            </Button>
             
            {/* delete button */}

            {!isDeleteButtonDisabled && (
                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                <Button className="cursor-pointer hover:text-rose-400" variant="ghost">
                    <Trash2 />
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Delete</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the team "{row.teamName}"
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
            )}
        </div>
    );
}

function registrationStatusBadge(registrationStatus: string) {
    switch (registrationStatus.toLowerCase()) {
        case "paid":
            return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10">Paid</Badge>
        case "unregistered":
            return <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/10">Unregistered</Badge>
        case "verified":
            return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10">Verified</Badge>
        case "registered":
            return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Registered</Badge>
    }
}

export const teamColumn: ColumnDef<TeamDetails>[] = [
    {
        accessorKey: "teamName",
        header: "Team Name",
    },
    {
        accessorKey: "teamLead",
        header: () => <div className="text-center">Team Lead</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <span className="text-gray-300">{row.original.teamLead}</span>
            </div>
        )
    },
    {
        accessorKey: "teamSecret",
        header: () => <div className="text-center">Team Secret</div>,
        cell: ({ row }) => (
            <div className="flex justify-center">
                <span className="text-gray-300">{row.original.teamSecret}</span>
            </div>
        )
    },
    {
        accessorKey: "totalTeamMembers",
        header: () => <div className="text-center">Total Members</div>,
        cell: ({ row }) => (
            <div className="flex gap-2 items-center space-x-1 justify-center">
                <Users2 size={16} className="text-gray-500" />
                <span className="text-gray-300">{row.original.totalTeamMembers}/5</span>
            </div>
        )
    },
    {
        accessorKey: "registrationStatus",
        header: () => <div className="text-center">Registration Status</div>,
        cell: ({ row }) => <div className="flex justify-center">{registrationStatusBadge(row.original.registrationStatus)}</div>
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => <TeamActionsCell row={row.original} />
    }
]