import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton";
import ErrorCard from "@/components/ui/error";
import { teamColumn, type TeamDetails, } from "./team-column";
import { TeamDataTable } from "./team-data-table";
import { getAllTeams } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const Teams = () => {
  const { data: teams, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
    staleTime: 1000 * 60 * 5,
    retry: 2
  });

  const formatedData: TeamDetails[] = teams?.map((team: Team) => {
    return {
      teamName: team.teamName,
      teamSecret: team.teamSecret,
      teamLead: team.teamLeader.name,
      teamLeadEmail: team.teamLeader.googleEmail,
      totalTeamMembers: (team.teamMembers.length + 1).toString(),
      registrationStatus: (team.registrationStatus.charAt(0).toUpperCase() + team.registrationStatus.slice(1).toLowerCase()) as TeamDetails["registrationStatus"],
    }
  }) || [];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between pr-4 sm:pr-6 z-10 shadow-sm pl-16">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-100">Teams</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {isError ? (
            <ErrorCard onClick={refetch} errorMessage="Failed to load participants" error={error} isRefetching={isRefetching} />
          ) : isLoading ? (
            <DataTableSkeleton />
          ) : (
            <TeamDataTable columns={teamColumn} data={formatedData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Teams