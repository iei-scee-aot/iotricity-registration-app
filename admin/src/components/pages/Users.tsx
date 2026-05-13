import { columns } from "../ui/columns"
import { DataTable } from "../ui/data-table"
import { useQuery } from "@tanstack/react-query"
import { fetchUserDetails } from "@/lib/api"
import { Skeleton } from "../ui/skeleton"

const Users = () => {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserDetails,
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) {
    return (
      <div className="p-10 space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-10 text-red-500">
        Error loading participants: {error.message}
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a] min-h-screen text-gray-200">
      {/* Top Header */}
      <header className="h-16 bg-[#1a1b1e] border-b border-gray-800 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm pl-14 md:pl-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-100">Users Management</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}

export default Users