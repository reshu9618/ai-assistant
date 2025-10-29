"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OnboardingModalProps {
  onComplete: () => void
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    major: "",
    gpa: "",
    studyStyle: "",
  })

  const steps = [
    {
      title: "Welcome to StudyAI",
      description: "Your personal academic assistant powered by AI",
      content: (
        <div className="space-y-4">
          <p className="text-foreground/80">
            Let's get you set up to manage your academic life more effectively. This will only take a few minutes.
          </p>
          <div className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-primary">✓ Smart Task Prioritization</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <p className="text-sm font-medium text-secondary">✓ Optimized Study Schedules</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <p className="text-sm font-medium text-accent">✓ Personalized Recommendations</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Tell us about yourself",
      description: "Help us personalize your experience",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <Input
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">University</label>
            <Input
              placeholder="Stanford University"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Major</label>
            <Input
              placeholder="Computer Science"
              value={formData.major}
              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Academic Profile",
      description: "Help us understand your academic goals",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Current GPA</label>
            <Input
              placeholder="3.8"
              type="number"
              step="0.1"
              min="0"
              max="4"
              value={formData.gpa}
              onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Preferred Study Style</label>
            <div className="grid grid-cols-2 gap-2">
              {["Visual", "Auditory", "Reading", "Kinesthetic"].map((style) => (
                <button
                  key={style}
                  onClick={() => setFormData({ ...formData, studyStyle: style })}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    formData.studyStyle === style
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <p className="text-sm font-medium">{style}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "All set!",
      description: "Your academic assistant is ready",
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              Welcome, <span className="font-semibold">{formData.name || "Student"}</span>! Your personalized academic
              assistant is now active.
            </p>
          </div>
          <div className="space-y-2 text-sm text-foreground/80">
            <p>✓ Your courses have been synced</p>
            <p>✓ Your schedule has been optimized</p>
            <p>✓ AI recommendations are ready</p>
          </div>
        </div>
      ),
    },
  ]

  const currentStep = steps[step]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{currentStep.title}</CardTitle>
          <CardDescription>{currentStep.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep.content}

          <div className="flex gap-3">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                if (step === steps.length - 1) {
                  localStorage.setItem("student-assistant-onboarded", "true")
                  onComplete()
                } else {
                  setStep(step + 1)
                }
              }}
              className="flex-1"
            >
              {step === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>

          <div className="flex gap-1 justify-center">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
