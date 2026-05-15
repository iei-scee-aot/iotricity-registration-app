import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TeamPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stat Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-[#1a1b1e] rounded-xl border border-gray-800 p-5 shadow-sm flex items-start justify-between h-[108px]">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 bg-gray-800" />
              <Skeleton className="h-8 w-16 bg-gray-800" />
              <Skeleton className="h-3 w-32 bg-gray-800" />
            </div>
            <Skeleton className="h-12 w-12 rounded-xl bg-gray-800" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="rounded-md border border-gray-800 bg-[#1a1b1e] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 bg-[#25262b]">
              <TableHead className="w-[200px]"><Skeleton className="h-4 w-24 bg-gray-700" /></TableHead>
              <TableHead><Skeleton className="h-4 w-24 mx-auto bg-gray-700" /></TableHead>
              <TableHead><Skeleton className="h-4 w-32 mx-auto bg-gray-700" /></TableHead>
              <TableHead><Skeleton className="h-4 w-20 mx-auto bg-gray-700" /></TableHead>
              <TableHead><Skeleton className="h-4 w-32 mx-auto bg-gray-700" /></TableHead>
              <TableHead className="text-right"><Skeleton className="h-4 w-16 ml-auto bg-gray-700" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 7 }).map((_, i) => (
              <TableRow key={i} className="border-gray-800">
                <TableCell><Skeleton className="h-4 w-32 bg-gray-800" /></TableCell>
                <TableCell><Skeleton className="h-4 w-28 mx-auto bg-gray-800" /></TableCell>
                <TableCell><Skeleton className="h-4 w-40 mx-auto bg-gray-800" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12 mx-auto bg-gray-800" /></TableCell>
                <TableCell><Skeleton className="h-6 w-24 mx-auto rounded-full bg-gray-800" /></TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
                    <Skeleton className="h-8 w-8 rounded-md bg-gray-800" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}