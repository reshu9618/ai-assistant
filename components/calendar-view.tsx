"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CalendarEvent {
  date: string
  title: string
  type: "deadline" | "class" | "exam" | "study"
  course: string
}

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 1))

  const events: CalendarEvent[] = [
    { date: "2024-11-04", title: "Chemistry Lab Report Due", type: "deadline", course: "CHEM 150" },
    { date: "2024-11-05", title: "Calculus Problem Set", type: "deadline", course: "MATH 101" },
    { date: "2024-11-06", title: "History Reading Quiz", type: "exam", course: "HIST 201" },
    { date: "2024-11-08", title: "Literature Essay Due", type: "deadline", course: "ENG 102" },
    { date: "2024-11-10", title: "Midterm Exam", type: "exam", course: "PHYS 101" },
  ]

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "deadline":
        return "bg-destructive/20 text-destructive"
      case "exam":
        return "bg-primary/20 text-primary"
      case "class":
        return "bg-secondary/20 text-secondary"
      case "study":
        return "bg-accent/20 text-accent"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Calendar</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="text-lg">◀</span>
          </button>
          <span className="text-sm font-medium min-w-40 text-center">
            {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <span className="text-lg">▶</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {emptyDays.map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square"></div>
              ))}
              {days.map((day) => {
                const dateStr = `2024-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                const dayEvents = events.filter((e) => e.date === dateStr)
                return (
                  <div
                    key={day}
                    className="aspect-square p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="text-sm font-semibold text-foreground mb-1">{day}</div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event, i) => (
                        <div
                          key={i}
                          className={`text-xs px-1 py-0.5 rounded truncate ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.slice(0, 5).map((event, i) => (
              <div key={i} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start gap-2 mb-1">
                  <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>{event.type}</Badge>
                </div>
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">{event.course}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(event.date).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
