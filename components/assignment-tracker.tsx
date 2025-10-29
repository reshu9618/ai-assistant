"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Assignment {
  id: string
  title: string
  due_date: string
  estimated_hours: number
  priority: string
  status: string
  courses?: { course_code: string }
}

interface AssignmentTrackerProps {
  assignments: Assignment[]
  onStatusChange?: (assignmentId: string, newStatus: string) => void
}

export function AssignmentTracker({ assignments, onStatusChange }: AssignmentTrackerProps) {
  const getProgressColor = (priority: string) => {
    const colors: { [key: string]: string } = {
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-green-500",
    }
    return colors[priority] || "bg-blue-500"
  }

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: string } = {
      pending: "bg-gray-100 text-gray-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
    }
    return badges[status] || "bg-gray-100 text-gray-800"
  }

  const calculateDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const sortedAssignments = [...assignments].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 3
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 3
    return aPriority - bPriority
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignment Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sortedAssignments.map((assignment) => {
            const daysUntilDue = calculateDaysUntilDue(assignment.due_date)
            const isOverdue = daysUntilDue < 0

            return (
              <div key={assignment.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{assignment.title}</h4>
                    <p className="text-xs text-gray-600">{assignment.courses?.course_code}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusBadge(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{assignment.estimated_hours}h estimated</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(assignment.priority)}`}
                        style={{
                          width: assignment.status === "completed" ? "100%" : "30%",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className={isOverdue ? "text-red-600 font-semibold" : "text-gray-600"}>
                    {isOverdue ? `Overdue by ${Math.abs(daysUntilDue)} days` : `Due in ${daysUntilDue} days`}
                  </span>
                  <span className="text-gray-500">{new Date(assignment.due_date).toLocaleDateString()}</span>
                </div>

                {assignment.status !== "completed" && (
                  <button
                    onClick={() => onStatusChange?.(assignment.id, "completed")}
                    className="mt-2 text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  >
                    Mark Complete
                  </button>
                )}
              </div>
            )
          })}

          {sortedAssignments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No assignments yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
