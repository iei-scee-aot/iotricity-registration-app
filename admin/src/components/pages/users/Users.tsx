import { DataTable } from "@/components/pages/users/user-data-table"
import { useQuery } from "@tanstack/react-query"
import { fetchUserDetails } from "@/lib/api"
import { columns } from "./user-column"
import ErrorCard from "@/components/ui/error"
import { DataTableSkeleton } from "@/components/skeleton/DataTableSkeleton"

const Users = () => {

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserDetails,
    staleTime: 1000 * 60 * 5, 
  });

  const formatedData = data?.map((user: TeamMember) => {
    return {
      _id: user._id,  
      name: user.name,
      googleEmail: user.googleEmail,
      googleProfilePicture: user.googleProfilePicture,
      collegeEmail: user.collegeEmail,
      rollNumber: user.rollNumber,
      semester: user.semester,
      department: user.department,
      phoneNumber: user.phoneNumber,
    }
  }) || [];

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between pr-4 sm:pr-6 z-10 shadow-sm pl-16">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-100">Users Management</h1>
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
            <DataTable columns={columns} data={formatedData} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Users