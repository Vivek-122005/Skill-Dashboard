"use client"

import { Target } from 'lucide-react'

interface CircularProgressProps {
  value: number
  maxValue: number
}

export function CircularProgress({ value, maxValue }: CircularProgressProps) {
  const percentage = (value / maxValue) * 100
  const circumference = 2 * Math.PI * 45 // radius is 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-gray-200"
          strokeWidth="8"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="stroke-blue-500 transition-all duration-300 ease-in-out"
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Target className="w-8 h-8 text-red-500" />
      </div>
    </div>
  )
}

