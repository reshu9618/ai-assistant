"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AssignmentFormProps {
  courses: Array<{ id: string; course_code: string; course_name: string }>
  onSubmit: (assignmentData: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function AssignmentForm({ courses, onSubmit, onCancel, isLoading = false }: AssignmentFormProps) {
  const [formData, setFormData] = useState({
    course_id: courses[0]?.id || "",
    title: "",
    description: "",
    due_date: "",
    estimated_hours: 2,
    priority: "medium",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "estimated_hours" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    setFormData({
      course_id: courses[0]?.id || "",
      title: "",
      description: "",
      due_date: "",
      estimated_hours: 2,
      priority: "medium",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select
              name="course_id"
              value={formData.course_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_code} - {course.course_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assignment Title</label>
            <Input name="title" placeholder="Midterm Exam" value={formData.title} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              placeholder="Assignment details..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <Input name="due_date" type="datetime-local" value={formData.due_date} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estimated Hours</label>
              <Input
                name="estimated_hours"
                type="number"
                min="0.5"
                step="0.5"
                value={formData.estimated_hours}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Assignment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
