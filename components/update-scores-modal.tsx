import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button }from "@/components/ui/button"
import { useState } from "react"

interface UpdateScoresModalProps {
  open: boolean
  onClose: () => void
  onUpdate: (rank: number, percentile: number, score: number) => void
  initialRank: number
  initialPercentile: number
  initialScore: number
}

export function UpdateScoresModal({ 
  open, 
  onClose, 
  onUpdate, 
  initialRank, 
  initialPercentile, 
  initialScore
}: UpdateScoresModalProps) {
  const [rank, setRank] = useState(initialRank?.toString() || '')
  const [percentile, setPercentile] = useState(initialPercentile?.toString() || '')
  const [score, setScore] = useState(initialScore?.toString() || '')
  const [error, setError] = useState('')

  const handleRankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRank(value)
    validateInput(value, 'rank')
  }

  const handlePercentileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPercentile(value)
    validateInput(value, 'percentile')
  }

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setScore(value)
    validateInput(value, 'score')
  }

  const validateInput = (value: string, field: string) => {
    if (value === '' || !/^\d+$/.test(value)) {
      setError(`Please enter a valid number for ${field}`)
    } else {
      const numValue = parseInt(value, 10)
      if (field === 'percentile' && (numValue < 0 || numValue > 100)) {
        setError('Percentile must be between 0 and 100')
      } else if (field === 'score' && (numValue < 0 || numValue > 15)) {
        setError('Score must be between 0 and 15')
      } else {
        setError('')
      }
    }
  }

  const handleSave = () => {
    if (error) {
      return
    }
    const newRank = parseInt(rank, 10)
    const newPercentile = parseInt(percentile, 10)
    const newScore = parseInt(score, 10)
    onUpdate(newRank, newPercentile, newScore)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update scores</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                1
              </div>
              <div>Update your Rank</div>
            </div>
            <Input 
              placeholder="Rank" 
              value={rank}
              onChange={handleRankChange}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                2
              </div>
              <div>Update your Percentile</div>
            </div>
            <Input 
              placeholder="Percentile" 
              value={percentile}
              onChange={handlePercentileChange}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                3
              </div>
              <div>Update your Current Score (out of 15)</div>
            </div>
            <Input 
              placeholder="Score" 
              value={score}
              onChange={handleScoreChange}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!!error}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

