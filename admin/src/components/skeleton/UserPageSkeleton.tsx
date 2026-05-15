import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function UserPageSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {/* Adjust the number of columns to match your columns.tsx */}
            <TableHead className="w-[250px]"><Skeleton className="h-4 w-24" /></TableHead>
            <TableHead><Skeleton className="h-4 w-32" /></TableHead>
            <TableHead><Skeleton className="h-4 w-16" /></TableHead>
            <TableHead><Skeleton className="h-4 w-24" /></TableHead>
            <TableHead className="text-right"><Skeleton className="h-4 w-8 ml-auto" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Render 5-10 rows to fill the screen */}
          {Array.from({ length: 7 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" /> {/* Avatar */}
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" /> {/* Name */}
                    <Skeleton className="h-3 w-32" /> {/* Email */}
                  </div>
                </div>
              </TableCell>
              <TableCell><Skeleton className="h-4 w-40" /></TableCell>
              <TableCell><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-8 w-8 ml-auto rounded-md" /> {/* Action Button */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}