import type { ReactNode } from "react"

export interface TeamStatCardProps {
  title: string
  value: string | number
  subValue: ReactNode
  icon: ReactNode
  iconContainerClass: string
}

export function TeamStatCard({ title, value, subValue, icon, iconContainerClass }: TeamStatCardProps) {
  return (
    <div className="bg-[#1a1b1e] rounded-xl border border-gray-800 p-5 shadow-sm flex items-start justify-between h-full">
      <div>
        <div className="text-sm font-medium text-gray-400 mb-2">{title}</div>
        <div className="text-3xl font-bold text-gray-100 mb-2">{value}</div>
        <div className="text-sm text-gray-500">{subValue}</div>
      </div>
      <div className={`p-3 rounded-xl ${iconContainerClass}`}>
        {icon}
      </div>
    </div>
  )
}