import { useEffect } from "react"
import Link from "next/link"
import { BarChart2, Award, Briefcase, X } from 'lucide-react'
import { useToast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { addToast } = useToast()

  const handleUnderDevelopment = (feature: string) => {
    addToast("Under Development", `${feature} is under development and will be released soon.`)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-xl">WhatBytes</span>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="space-y-2">
            <button
              onClick={() => handleUnderDevelopment("Dashboard")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700 w-full text-left"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <Link
              href="#"
              className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-600"
            >
              <Award className="w-4 h-4" />
              <span>Skill Test</span>
            </Link>
            <button
              onClick={() => handleUnderDevelopment("Internship")}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700 w-full text-left"
            >
              <Briefcase className="w-4 h-4" />
              <span>Internship</span>
            </button>
          </nav>
          <div className="flex-grow"></div>
        </div>
      </div>
    </>
  )
}

