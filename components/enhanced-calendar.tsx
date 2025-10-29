"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CalendarEvent {
  id: string
  title: string
  type: "deadline" | "exam" | "class" | "study"
  date: Date
  color: string
}

interface EnhancedCalendarProps {
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

export function EnhancedCalendar({ events, onEventClick }: EnhancedCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [monthEvents, setMonthEvents] = useState<{ [key: string]: CalendarEvent[] }>({})

  useEffect(() => {
    const grouped: { [key: string]: CalendarEvent[] } = {}
    events.forEach((event) => {
      const dateKey = new Date(event.date).toISOString().split("T")[0]
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })
    setMonthEvents(grouped)
  }, [events])

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 bg-gray-50"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const dateKey = date.toISOString().split("T")[0]
      const dayEvents = monthEvents[dateKey] || []
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`p-2 border rounded min-h-24 cursor-pointer hover:bg-blue-50 transition ${isToday ? "bg-blue-100 border-blue-300" : "bg-white"}`}
        >
          <div className={`font-semibold text-sm mb-1 ${isToday ? "text-blue-700" : "text-gray-700"}`}>{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className={`text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80`}
                style={{ backgroundColor: event.color }}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{monthName}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-sm text-gray-600 p-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
      </CardContent>
    </Card>
  )
}
