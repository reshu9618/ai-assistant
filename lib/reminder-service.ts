export interface Reminder {
  id: string
  assignmentId: string
  type: "due-soon" | "due-today" | "overdue" | "study-session"
  scheduledTime: Date
  message: string
  isSent: boolean
}

export class ReminderService {
  private reminders: Map<string, NodeJS.Timeout> = new Map()

  scheduleReminder(reminder: Reminder, callback: (reminder: Reminder) => void): void {
    const now = new Date().getTime()
    const scheduledTime = new Date(reminder.scheduledTime).getTime()
    const delay = Math.max(0, scheduledTime - now)

    const timeoutId = setTimeout(() => {
      callback(reminder)
      this.reminders.delete(reminder.id)
    }, delay)

    this.reminders.set(reminder.id, timeoutId)
  }

  cancelReminder(reminderId: string): void {
    const timeoutId = this.reminders.get(reminderId)
    if (timeoutId) {
      clearTimeout(timeoutId)
      this.reminders.delete(reminderId)
    }
  }

  cancelAllReminders(): void {
    this.reminders.forEach((timeoutId) => clearTimeout(timeoutId))
    this.reminders.clear()
  }

  // Calculate optimal reminder times based on assignment due date
  static calculateReminderTimes(dueDate: Date): { [key: string]: Date } {
    const now = new Date()
    const due = new Date(dueDate)
    const hoursUntilDue = (due.getTime() - now.getTime()) / (1000 * 60 * 60)

    return {
      oneWeekBefore: new Date(due.getTime() - 7 * 24 * 60 * 60 * 1000),
      threeDaysBefore: new Date(due.getTime() - 3 * 24 * 60 * 60 * 1000),
      oneDayBefore: new Date(due.getTime() - 24 * 60 * 60 * 1000),
      morningOfDue: new Date(due.getFullYear(), due.getMonth(), due.getDate(), 9, 0, 0),
      twoHoursBefore: new Date(due.getTime() - 2 * 60 * 60 * 1000),
    }
  }

  // Generate reminder message based on type and time until due
  static generateMessage(assignmentTitle: string, type: string, hoursUntilDue: number): string {
    const messages: { [key: string]: string } = {
      "due-soon": `Assignment "${assignmentTitle}" is due in ${Math.ceil(hoursUntilDue)} hours. Time to start studying!`,
      "due-today": `Reminder: "${assignmentTitle}" is due today. Make sure to submit before the deadline.`,
      overdue: `Alert: "${assignmentTitle}" is overdue. Please submit as soon as possible.`,
      "study-session": `Recommended study session for "${assignmentTitle}" starting now. You have ${Math.ceil(hoursUntilDue)} hours to prepare.`,
    }
    return messages[type] || `Reminder about "${assignmentTitle}"`
  }
}
