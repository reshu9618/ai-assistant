"use client"

import { useState, useEffect } from "react"
import { ReminderService } from "@/lib/reminder-service"

interface Assignment {
  id: string
  title: string
  due_date: string
  courses?: { course_code: string }
}

interface ReminderManagerProps {
  assignments: Assignment[]
  onReminderTriggered?: (message: string) => void
}

export function ReminderManager({ assignments, onReminderTriggered }: ReminderManagerProps) {
  const [activeReminders, setActiveReminders] = useState<Map<string, NodeJS.Timeout>>(new Map())
  const reminderService = new ReminderService()

  useEffect(() => {
    // Set up reminders for all assignments
    assignments.forEach((assignment) => {
      const dueDate = new Date(assignment.due_date)
      const now = new Date()

      if (dueDate > now) {
        // Schedule reminder for 1 day before
        const oneDayBefore = new Date(dueDate.getTime() - 24 * 60 * 60 * 1000)
        if (oneDayBefore > now) {
          const reminderId = `${assignment.id}-1day`
          const message = ReminderService.generateMessage(assignment.title, "due-soon", 24)

          reminderService.scheduleReminder(
            {
              id: reminderId,
              assignmentId: assignment.id,
              type: "due-soon",
              scheduledTime: oneDayBefore,
              message,
              isSent: false,
            },
            (reminder) => {
              onReminderTriggered?.(reminder.message)
            },
          )
        }

        // Schedule reminder for 2 hours before
        const twoHoursBefore = new Date(dueDate.getTime() - 2 * 60 * 60 * 1000)
        if (twoHoursBefore > now) {
          const reminderId = `${assignment.id}-2hours`
          const message = ReminderService.generateMessage(assignment.title, "due-today", 2)

          reminderService.scheduleReminder(
            {
              id: reminderId,
              assignmentId: assignment.id,
              type: "due-today",
              scheduledTime: twoHoursBefore,
              message,
              isSent: false,
            },
            (reminder) => {
              onReminderTriggered?.(reminder.message)
            },
          )
        }
      }
    })

    return () => {
      reminderService.cancelAllReminders()
    }
  }, [assignments, onReminderTriggered])

  return null // This component manages reminders in the background
}
