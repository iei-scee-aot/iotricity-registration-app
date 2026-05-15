import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type TeamMemberDetails = {
    _id?: string;
    name: string;
    googleEmail: string;
    googleProfilePicture: string;
    collegeEmail: string;
    rollNumber: string;
    semester: number;
    department: string;
    phoneNumber: string;
    role: "Lead" | "Member";
}

export const teamMembersColumns: ColumnDef<TeamMemberDetails>[] = [
  {
    accessorFn: (row) => row.name,
    id: "details",
    header: "Member Details",
    cell: ({ row }) => {
        const { name, googleEmail, googleProfilePicture } = row.original
        return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={googleProfilePicture} alt={name} />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm leading-none text-foreground">
              {name}
            </span>
            <span className="text-xs text-muted-foreground">
              {googleEmail}
            </span>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div>
        {row.original.role === "Lead" ? (
            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/10">Lead</Badge>
        ) : (
            <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/10">Member</Badge>
        )}
      </div>
    )
  },
  {
    accessorKey: "collegeEmail",
    header: "College Email",
    cell: ({ row }) => (
      <div className="text-xs text-muted-foreground">
        {row.original.collegeEmail}
      </div>
    )
  },
  {
    accessorKey: "semester",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Semester
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.semester}
      </div>
    )
  },
  {
    accessorKey: "department",
    header: () => <div className="text-center">Department</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.department}
      </div>
    )
  },
  {
    accessorKey: "rollNumber",
    header: "Roll Number",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  }
]
