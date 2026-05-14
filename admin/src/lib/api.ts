import axios from "axios"

export const fetchUserDetails = async () => {
    const response: { data: TeamMember[] } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/team-members`)

    return response.data
}

export const getAllTeams = async () => {
    const response: { data: Team[] } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/teams`)

    return response.data;
      
}