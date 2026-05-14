import { useParams } from "react-router-dom"

function TeamView() {
  const { teamName } = useParams();
  return (
    <div>{teamName}</div>
  )
}

export default TeamView