interface ProgressBarProps {
  label: string
  value: number
  color: string
}

export function ProgressBar({ label, value, color }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:justify-between text-sm">
        <span className="text-gray-600 mb-1 sm:mb-0">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

