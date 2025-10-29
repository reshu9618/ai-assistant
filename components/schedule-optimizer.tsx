"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StudySession {
  time: string
  duration: number
  task: string
  priority: string
  focus: string
}

export function ScheduleOptimizer() {
  const [optimizedSchedule, setOptimizedSchedule] = useState<StudySession[]>([
    {
      time: "9:00 AM",
      duration: 90,
      task: "Calculus Problem Set",
      priority: "high",
      focus: "Problem Solving",
    },
    {
      time: "10:30 AM",
      duration: 15,
      task: "Break",
      priority: "low",
      focus: "Rest",
    },
    {
      time: "10:45 AM",
      duration: 60,
      task: "Chemistry Lab Report",
      priority: "high",
      focus: "Writing",
    },
    {
      time: "11:45 AM",
      duration: 15,
      task: "Break",
      priority: "low",
      focus: "Rest",
    },
    {
      time: "12:00 PM",
      duration: 45,
      task: "History Reading",
      priority: "medium",
      focus: "Reading Comprehension",
    },
  ])

  const [isGenerating, setIsGenerating] = useState(false)

  const regenerateSchedule = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch("/api/ai/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: [
            { title: "Calculus Problem Set", priority: "high", estimatedHours: 3 },
            { title: "Chemistry Lab Report", priority: "high", estimatedHours: 4 },
            { title: "History Reading", priority: "medium", estimatedHours: 2 },
          ],
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("[v0] Schedule regenerated:", data)
      }
    } catch (error) {
      console.error("[v0] Schedule regeneration error:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Optimized Schedule</h2>
          <p className="text-sm text-muted-foreground">
            AI-powered study schedule based on your tasks and learning patterns
          </p>
        </div>
        <Button onClick={regenerateSchedule} disabled={isGenerating} className="gap-2">
          <span>⚡</span>
          {isGenerating ? "Generating..." : "Regenerate Schedule"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's Study Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {optimizedSchedule.map((session, i) => (
              <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🕐</span>
                      <span className="font-semibold text-foreground">{session.time}</span>
                      <span className="text-sm text-muted-foreground">({session.duration} min)</span>
                    </div>
                    <p className="text-sm text-foreground font-medium">{session.task}</p>
                  </div>
                  <Badge
                    className={
                      session.priority === "high"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-secondary/20 text-secondary"
                    }
                  >
                    {session.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>🧠</span>
                  <span>{session.focus}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Study Time</p>
                <p className="text-2xl font-bold text-primary">4h 45m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Optimal Focus Time</p>
                <p className="text-2xl font-bold text-secondary">9:00 AM - 12:00 PM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Break Time</p>
                <p className="text-2xl font-bold text-accent">30 min</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="text-muted-foreground">✓ Start with high-priority tasks during peak focus hours</p>
              <p className="text-muted-foreground">✓ Take breaks every 90 minutes for optimal retention</p>
              <p className="text-muted-foreground">✓ Review Chemistry lab before writing the report</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
