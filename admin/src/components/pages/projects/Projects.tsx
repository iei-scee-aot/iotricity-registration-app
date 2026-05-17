import ErrorCard from "@/components/ui/error";
import { UserPageSkeleton } from "@/components/skeleton/UserPageSkeleton";
import { projectColumns } from "./project-column";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "@/lib/api";
import { formatedText } from "@/lib/utils";
import { ProjectDataTable } from "./project-data-table";

const Projects = () => {
  const {data: projects, error, isError, isLoading, refetch, isRefetching} = useQuery({
    queryKey : ["projects"],
    queryFn : getAllProjects
  })

  const formatedData = projects?.map(project => {
    return{
      _id : project._id,
      projectName : project.projectName,
      projectThemes : project.projectThemes,
      projectTracks : project.projectTracks,
      teamSecret : project.teamSecret,
      round : project.round,
      githubUrl : project.githubUrl,
      presentationUrl : project.presentationUrl,
      demoVideoUrl : project.demoVideoUrl,
      status : formatedText(project.status),
    }
  });
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between pr-4 sm:pr-6 z-10 shadow-sm pl-16">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-100">Projects</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {isError ? (
            <ErrorCard onClick={refetch} errorMessage="Failed to load participants" error={error} isRefetching={isRefetching} />
          ) : isLoading ? (
            <UserPageSkeleton />
          ) : (
            <ProjectDataTable columns={projectColumns} data={formatedData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Projects