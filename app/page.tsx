"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/sidebar"
import { ProgressBar } from "@/components/progress-bar"
import { QuickStats } from "@/components/quick-stats"
import { ComparisonGraph } from "@/components/comparison-graph"
import { UpdateScoresModal } from "@/components/update-scores-modal"
import { CircularProgress } from "@/components/circular-progress"
import Image from "next/image"
import { ToastProvider } from "@/components/ui/toast"
import { Menu } from 'lucide-react'

export default function SkillTest() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rank, setRank] = useState(1)
  const [percentile, setPercentile] = useState(30)
  const [score, setScore] = useState(10)
  const [currentDate, setCurrentDate] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const updateDate = () => {
      const now = new Date()
      setCurrentDate(now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
    }
    updateDate()
    const timer = setInterval(updateDate, 1000 * 60 * 60 * 24) // Update every 24 hours
    return () => clearInterval(timer)
  }, [])

  const handleUpdateScores = (newRank: number, newPercentile: number, newScore: number) => {
    setRank(newRank)
    setPercentile(newPercentile)
    setScore(newScore)
    setIsModalOpen(false)
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex-1 w-full">
          <div className="p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Skill Test</h1>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </Button>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <Image
                    src="/placeholder.svg"
                    alt="HTML5"
                    width={48}
                    height={48}
                    className="rounded"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      Hyper Text Markup Language
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Questions: 15 | Duration: 15 mins | Submitted on 5 June 2021
                    </p>
                  </div>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>Update</Button>
              </div>

              <h3 className="font-semibold mb-4">Quick Statistics</h3>
              <QuickStats rank={rank} percentile={percentile} score={score} totalQuestions={15} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Comparison Graph</h3>
                <ComparisonGraph percentile={percentile} />
                <div className="flex items-center mt-4">
                  <img src="/chart-icon.png" alt="Chart Icon" className="w-5 h-5 mr-2" />
                  <p className="text-sm text-gray-600">
                    You scored {percentile}% percentile which is lower than the
                    average percentile 72% of all the engineers who took this assessment
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-4">Syllabus Wise Analysis</h3>
                <div className="space-y-4">
                  <ProgressBar
                    label="HTML Tools, Forms, History"
                    value={80}
                    color="bg-blue-500"
                  />
                  <ProgressBar
                    label="Tags & References in HTML"
                    value={60}
                    color="bg-orange-500"
                  />
                  <ProgressBar
                    label="Tables & References in HTML"
                    value={24}
                    color="bg-red-500"
                  />
                  <ProgressBar
                    label="Tables & CSS Basics"
                    value={96}
                    color="bg-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Question Analysis</h3>
                <span className="text-blue-600 font-semibold">{score}/15</span>
              </div>
              <div className="flex flex-col items-center gap-6">
                <CircularProgress value={score} maxValue={15} />
                <p className="text-gray-600 text-center">
                  You scored {score} question correct out of 15.
                  {score < 12 && " However it still needs some improvements"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <UpdateScoresModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleUpdateScores}
          initialRank={rank}
          initialPercentile={percentile}
          initialScore={score}
        />
      </div>
    </ToastProvider>
  )
}

