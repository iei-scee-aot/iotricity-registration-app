import { useLocation, useNavigate } from "react-router-dom"
import { DataTable } from "@/components/pages/users/user-data-table"
import { teamMembersColumns, type TeamMemberDetails } from "./team-members-column"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import StatusBadge from "@/components/ui/status-badge"

function TeamView() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const team = location.state?.team;

  if (!team) {
    return (
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200 p-8 items-center justify-center">
        <h2 className="text-xl">Team data not found. Please navigate from the Teams page.</h2>
        <Button variant="outline" className="mt-4 border-gray-700 hover:bg-gray-800" onClick={() => navigate("/teams")}>Back to Teams</Button>
      </div>
    );
  }


  const allMembers: TeamMemberDetails[] = [
    { ...team.teamLeader, role: "Lead" },
    ...team.teamMembers.map((member: any) => ({ ...member, role: "Member" }))
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between pr-4 sm:pr-6 z-10 shadow-sm pl-4 sm:pl-16">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-800 text-gray-400 hover:text-gray-200" onClick={() => navigate("/teams")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-100">Team Overview</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-[#1a1b1e] p-6 rounded-xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <h2 className="text-3xl font-bold text-gray-100 mb-1">{team.teamName}</h2>
              <p className="text-sm text-gray-500 font-mono">Secret: {team.teamSecret}</p>
            </div>
            <div>
               <StatusBadge status={team.registrationStatus} />
            </div>
          </div>

          <div className="h-[calc(100vh-280px)] min-h-[400px]">
             <DataTable columns={teamMembersColumns} data={allMembers} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamView