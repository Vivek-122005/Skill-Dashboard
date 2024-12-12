import { Trophy, FileText, CheckCircle } from 'lucide-react'

interface QuickStatsProps {
  rank: number
  percentile: number
  score: number
  totalQuestions: number
}

export function QuickStats({ rank, percentile, score, totalQuestions }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
          <Trophy className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{rank}</div>
          <div className="text-sm text-gray-500">YOUR RANK</div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{percentile}%</div>
          <div className="text-sm text-gray-500">PERCENTILE</div>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{score}/{totalQuestions}</div>
          <div className="text-sm text-gray-500">CORRECT ANSWERS</div>
        </div>
      </div>
    </div>
  )
}

