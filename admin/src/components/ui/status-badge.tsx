import { formatedText } from "@/lib/utils"
import { Badge } from "./badge"

const StatusBadge = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {

    case "paid":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10">Paid</Badge>

    case "unregistered":
        return <Badge className="bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/10">Unregistered</Badge>

    case "verified":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10">Verified</Badge>

    case "registered":
        return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">Registered</Badge>

    case "draft":
        return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/10">Draft</Badge>

    case "submitted":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/10">Submitted</Badge>
        
    case "lead": 
        return <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/10">Lead</Badge>

    case "member":
        return <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 hover:bg-gray-500/10">Member</Badge>

    default:
        return <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">{formatedText(status)}</Badge>
    }
}

export default StatusBadge