import { getTeamBySecret } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DataTable } from "@/components/pages/users/user-data-table"
import { teamMembersColumns, type TeamMemberDetails } from "../teams/team-members-column"
import { FaGithub, FaYoutube } from "react-icons/fa"
import { BsFiletypePpt } from "react-icons/bs"
import { getPresentationEmbedUrl, getYoutubeEmbedUrl } from '@/lib/utils'
import StatusBadge from '@/components/ui/status-badge'


const ProjectView = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const project = state?.project
  const secret = project?.teamSecret

  const { data: teamDetails, isLoading } = useQuery({
    queryKey: ["team-by-secret", secret],
    queryFn: () => getTeamBySecret(secret),
    enabled: !!secret,
    retry: 1
  })

  if (!project) {
    return (
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200 p-8 items-center justify-center">
        <h2 className="text-xl">Project data not found. Please navigate from the Projects page.</h2>
        <Button variant="outline" className="mt-4 border-gray-700 hover:bg-gray-800 cursor-pointer" onClick={() => navigate("/projects")}>Back to Projects</Button>
      </div>
    );
  }

  const allMembers: TeamMemberDetails[] = teamDetails ? [
    { ...teamDetails.teamLeader, role: "Lead" },
    ...teamDetails.teamMembers.map((member: any) => ({ ...member, role: "Member" }))
  ] : [];


  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between pr-4 sm:pr-6 z-10 shadow-sm pl-4 sm:pl-16">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:bg-gray-800 text-gray-400 hover:text-gray-200 cursor-pointer" onClick={() => navigate("/projects")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-100">Project Overview</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Project Details Card */}
          <div className="bg-[#1a1b1e] p-6 rounded-xl border border-gray-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-100 mb-2">{project.projectName}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                  <span className="font-mono bg-gray-800/50 px-2 py-1 rounded border border-gray-700/50">Secret: {project.teamSecret}</span>
                  <span>•</span>
                  <span>Round {project.round}</span>
                </div>
              </div>
              <StatusBadge status={project.status} />
            </div>

            {/* Themes and Tracks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
               <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Themes</h3>
                  <div className="flex flex-wrap gap-2">
                     {project.projectThemes?.map((theme: string, idx: number) => (
                        <StatusBadge key={idx} status={theme} />
                     ))}
                  </div>
               </div>
               <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Tracks</h3>
                  <div className="flex flex-wrap gap-2">
                     {project.projectTracks?.map((track: string, idx: number) => (
                        <StatusBadge key={idx} status={track} />
                     ))}
                  </div>
               </div>
            </div>

            {/* Previews and Links */}
            <div>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Project Media & Links</h3>
                  {project.githubUrl && (
                     <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/80 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg transition-all border border-gray-700/50 hover:border-gray-600 text-sm">
                        <FaGithub size={16} />
                        <span className="font-medium">Open GitHub</span>
                     </a>
                  )}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Presentation Preview */}
                  {project.presentationUrl && (
                     <div className="flex flex-col border border-gray-800 rounded-xl overflow-hidden bg-[#121212]">
                        <div className="bg-[#1a1b1e] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                           <div className="flex items-center gap-2 text-gray-300">
                              <BsFiletypePpt size={16} className="text-orange-400" />
                              <span className="font-medium text-sm">Presentation</span>
                           </div>
                           <a href={project.presentationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300">Open External</a>
                        </div>
                        <div className="aspect-video w-full bg-black/50 relative">
                           {getPresentationEmbedUrl(project.presentationUrl) ? (
                              <iframe 
                                 src={getPresentationEmbedUrl(project.presentationUrl)!}
                                 className="w-full h-full border-0"
                                 allowFullScreen
                              />
                           ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                 <BsFiletypePpt size={32} className="mb-2 opacity-50" />
                                 <p className="text-sm">Preview not available</p>
                                 <a href={project.presentationUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 mt-2 text-sm underline">Click here to view</a>
                              </div>
                           )}
                        </div>
                     </div>
                  )}

                  {/* YouTube Preview */}
                  {project.demoVideoUrl && (
                     <div className="flex flex-col border border-gray-800 rounded-xl overflow-hidden bg-[#121212]">
                        <div className="bg-[#1a1b1e] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                           <div className="flex items-center gap-2 text-gray-300">
                              <FaYoutube size={16} className="text-rose-500" />
                              <span className="font-medium text-sm">Demo Video</span>
                           </div>
                           <a href={project.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300">Open External</a>
                        </div>
                        <div className="aspect-video w-full bg-black/50 relative">
                           {getYoutubeEmbedUrl(project.demoVideoUrl) ? (
                              <iframe 
                                 src={getYoutubeEmbedUrl(project.demoVideoUrl)!}
                                 className="w-full h-full border-0"
                                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                 allowFullScreen
                              />
                           ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                 <FaYoutube size={32} className="mb-2 opacity-50" />
                                 <p className="text-sm">Preview not available</p>
                                 <a href={project.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 mt-2 text-sm underline">Click here to view</a>
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="bg-[#1a1b1e] p-6 rounded-xl border border-gray-800 shadow-sm">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-100">Team Members</h3>
                {teamDetails && (
                   <Badge variant="outline" className="bg-gray-800/50 text-gray-300 border-gray-700 px-3 py-1">
                      {teamDetails.teamName}
                   </Badge>
                )}
             </div>
             
             {isLoading ? (
                <div className="h-40 flex items-center justify-center text-gray-500">Loading team data...</div>
             ) : teamDetails ? (
                <div className="min-h-[300px]">
                   <DataTable columns={teamMembersColumns} data={allMembers} />
                </div>
             ) : (
                <div className="h-40 flex items-center justify-center text-gray-500">Failed to load team data</div>
             )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProjectView