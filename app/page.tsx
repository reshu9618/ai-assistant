"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { OnboardingModal } from "@/components/onboarding-modal"

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const onboarded = localStorage.getItem("student-assistant-onboarded")
    setIsOnboarded(!!onboarded)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading your academic assistant...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isOnboarded && <OnboardingModal onComplete={() => setIsOnboarded(true)} />}
      <Dashboard />
    </>
  )
}
