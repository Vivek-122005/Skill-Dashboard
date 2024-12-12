"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ComparisonGraphProps {
  percentile: number
}

export function ComparisonGraph({ percentile }: ComparisonGraphProps) {
  const data = [
    { name: '0', you: 0, average: 0 },
    { name: '20', you: Math.min(percentile, 20), average: 20 },
    { name: '40', you: Math.min(percentile, 40), average: 40 },
    { name: '60', you: Math.min(percentile, 60), average: 60 },
    { name: '80', you: Math.min(percentile, 80), average: 80 },
    { name: '100', you: percentile, average: 100 },
  ]

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="you" stroke="#438AF6" strokeWidth={2} dot={false} name="Your Score" />
          <Line type="monotone" dataKey="average" stroke="#FB9339" strokeWidth={2} dot={false} name="Average Score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

