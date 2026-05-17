import ErrorCard from "@/components/ui/error";
import { teamColumn, type TeamDetails, } from "./team-column";
import { TeamDataTable } from "./team-data-table";
import { getAllTeams } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TeamStatCard } from "./TeamStatCard";
import { Users, Wallet, Clock, UserMinus } from "lucide-react";
import TeamPageSkeleton from "@/components/skeleton/TeamPageSkeleton";
import { formatedText } from "@/lib/utils";

const Teams = () => {
  const { data: teams, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["teams"],
    queryFn: getAllTeams,
    staleTime: 1000 * 60 * 5,
    retry: 2
  });

  const formatedData: TeamDetails[] = teams?.map((team: any) => {
    return {
      ...team,
      teamName: team.teamName,
      teamSecret: team.teamSecret,
      teamLead: team.teamLeader.name,
      teamLeadEmail: team.teamLeader.googleEmail,
      totalTeamMembers: (team.teamMembers.length + 1).toString(),
      registrationStatus: formatedText(team.registrationStatus) as TeamDetails["registrationStatus"],
    }
  }) || [];

  const totalTeams = teams?.length || 0;
  const verifiedTeams = teams?.filter((t: any) => t.registrationStatus?.toUpperCase() === "VERIFIED").length || 0;
  const pendingTeams = teams?.filter((t: any) => t.registrationStatus?.toUpperCase() === "REGISTERED").length || 0;
  const unregisteredTeams = teams?.filter((t: any) => t.registrationStatus?.toUpperCase() === "UNREGISTERED").length || 0;

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const totalLastWeek = teams?.filter((t: any) => new Date(t.createdAt) < oneWeekAgo).length || 0;
  
  let percentageIncrease = 0;
  if (totalLastWeek === 0) {
    percentageIncrease = totalTeams > 0 ? 100 : 0;
  } else {
    percentageIncrease = Math.round(((totalTeams - totalLastWeek) / totalLastWeek) * 100);
  }

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
          {!isError && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <TeamStatCard
                title="Total Teams"
                value={totalTeams}
                subValue={<span className={percentageIncrease >= 0 ? "text-emerald-400" : "text-rose-400"}>{percentageIncrease >= 0 ? "↑" : "↓"} {Math.abs(percentageIncrease)}% from last week</span>}
                icon={<Users className="text-indigo-400" size={24} />}
                iconContainerClass="bg-indigo-500/10"
              />
              <TeamStatCard
                title="Verified Teams"
                value={verifiedTeams}
                subValue={`From ${totalTeams} total teams`}
                icon={<Wallet className="text-purple-400" size={24} />}
                iconContainerClass="bg-purple-500/10"
              />
              <TeamStatCard
                title="Pending Offline"
                value={`${pendingTeams} Teams`}
                subValue="Requires manual verification"
                icon={<Clock className="text-amber-400" size={24} />}
                iconContainerClass="bg-amber-500/10"
              />
              <TeamStatCard
                title="Total Unregistered Team"
                value={unregisteredTeams}
                subValue="Incomplete registrations"
                icon={<UserMinus className="text-rose-400" size={24} />}
                iconContainerClass="bg-rose-500/10"
              />
            </div>
          )}

          {isError ? (
            <ErrorCard onClick={refetch} errorMessage="Failed to load participants" error={error} isRefetching={isRefetching} />
          ) : isLoading ? (
            <TeamPageSkeleton />
          ) : (
            <TeamDataTable columns={teamColumn} data={formatedData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Teams