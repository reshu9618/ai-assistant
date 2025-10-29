"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface CourseFormProps {
  onSubmit: (courseData: any) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function CourseForm({ onSubmit, onCancel, isLoading = false }: CourseFormProps) {
  const [formData, setFormData] = useState({
    course_code: "",
    course_name: "",
    instructor: "",
    credits: 3,
    current_grade: 0,
    meeting_times: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "credits" || name === "current_grade" ? Number.parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
    setFormData({
      course_code: "",
      course_name: "",
      instructor: "",
      credits: 3,
      current_grade: 0,
      meeting_times: "",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Course</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Course Code</label>
              <Input
                name="course_code"
                placeholder="CS101"
                value={formData.course_code}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Course Name</label>
              <Input
                name="course_name"
                placeholder="Introduction to Computer Science"
                value={formData.course_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Instructor</label>
              <Input name="instructor" placeholder="Dr. Smith" value={formData.instructor} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Credits</label>
              <Input name="credits" type="number" min="1" max="6" value={formData.credits} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Current Grade (%)</label>
              <Input
                name="current_grade"
                type="number"
                min="0"
                max="100"
                value={formData.current_grade}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meeting Times</label>
              <Input
                name="meeting_times"
                placeholder="MWF 10:00-11:00"
                value={formData.meeting_times}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
