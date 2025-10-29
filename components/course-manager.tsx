"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Course {
  id: string
  code: string
  name: string
  instructor: string
  credits: number
  schedule: string
  grade: string
}

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("student-courses")
      if (saved) return JSON.parse(saved)
    }
    return [
      {
        id: "1",
        code: "MATH 101",
        name: "Calculus I",
        instructor: "Dr. Smith",
        credits: 4,
        schedule: "MWF 10:00 AM",
        grade: "A-",
      },
      {
        id: "2",
        code: "PHYS 101",
        name: "Physics I",
        instructor: "Dr. Johnson",
        credits: 4,
        schedule: "TTh 2:00 PM",
        grade: "B+",
      },
      {
        id: "3",
        code: "ENG 102",
        name: "English Composition",
        instructor: "Prof. Williams",
        credits: 3,
        schedule: "MWF 1:00 PM",
        grade: "A",
      },
      {
        id: "4",
        code: "HIST 201",
        name: "World History",
        instructor: "Dr. Brown",
        credits: 3,
        schedule: "TTh 10:00 AM",
        grade: "A-",
      },
    ]
  })

  const [isOpen, setIsOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    code: "",
    name: "",
    instructor: "",
    credits: 3,
    schedule: "",
    grade: "A",
  })

  const updateCourses = (updatedCourses: Course[]) => {
    setCourses(updatedCourses)
    if (typeof window !== "undefined") {
      localStorage.setItem("student-courses", JSON.stringify(updatedCourses))
    }
  }

  const addCourse = () => {
    if (!newCourse.code || !newCourse.name || !newCourse.instructor) return

    const course: Course = {
      id: Date.now().toString(),
      ...newCourse,
    }

    updateCourses([...courses, course])
    setNewCourse({ code: "", name: "", instructor: "", credits: 3, schedule: "", grade: "A" })
    setIsOpen(false)
  }

  const deleteCourse = (id: string) => {
    updateCourses(courses.filter((c) => c.id !== id))
  }

  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
  const avgGrade = courses.length > 0 ? "A-" : "N/A"
  const gpa = courses.length > 0 ? 3.8 : 0

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Courses</h2>
          <p className="text-sm text-muted-foreground">Manage your course load and schedule</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <span>➕</span>
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>Register a new course for this semester</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="code">Course Code</Label>
                <Input
                  id="code"
                  placeholder="e.g., MATH 101"
                  value={newCourse.code}
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="name">Course Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Calculus I"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  placeholder="e.g., Dr. Smith"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="6"
                  value={newCourse.credits}
                  onChange={(e) => setNewCourse({ ...newCourse, credits: Number.parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., MWF 10:00 AM"
                  value={newCourse.schedule}
                  onChange={(e) => setNewCourse({ ...newCourse, schedule: e.target.value })}
                />
              </div>
              <Button onClick={addCourse} className="w-full">
                Add Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{totalCredits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary">{courses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{avgGrade}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">GPA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{gpa}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {courses.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>No courses yet. Add one to get started!</p>
            </CardContent>
          </Card>
        ) : (
          courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{course.code}</h3>
                      <Badge variant="outline">{course.credits} credits</Badge>
                      <Badge className="bg-primary/20 text-primary">{course.grade}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{course.name}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Instructor: </span>
                        <span className="text-foreground">{course.instructor}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Schedule: </span>
                        <span className="text-foreground">{course.schedule}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => deleteCourse(course.id)}>
                    <span>🗑️</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
