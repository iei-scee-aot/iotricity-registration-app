import axios from "axios"
import type { UserDetails } from "@/components/ui/columns"

export const fetchUserDetails = async () => {
    const response: {data: UserDetails[]} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team-members`)

    return response.data
}