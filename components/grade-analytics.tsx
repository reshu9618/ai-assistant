"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
  id: string
  course_code: string
  course_name: string
  current_grade: number
  credits: number
}

interface GradeAnalyticsProps {
  courses: Course[]
}

export function GradeAnalytics({ courses }: GradeAnalyticsProps) {
  const calculateGPA = () => {
    if (courses.length === 0) return 0

    const gradeToGPA = (grade: number) => {
      if (grade >= 93) return 4.0
      if (grade >= 90) return 3.7
      if (grade >= 87) return 3.3
      if (grade >= 83) return 3.0
      if (grade >= 80) return 2.7
      if (grade >= 77) return 2.3
      if (grade >= 73) return 2.0
      if (grade >= 70) return 1.7
      if (grade >= 67) return 1.3
      if (grade >= 60) return 1.0
      return 0.0
    }

    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0)
    const weightedGPA = courses.reduce((sum, course) => sum + gradeToGPA(course.current_grade) * course.credits, 0)

    return (weightedGPA / totalCredits).toFixed(2)
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600"
    if (grade >= 80) return "text-blue-600"
    if (grade >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeLetter = (grade: number) => {
    if (grade >= 93) return "A"
    if (grade >= 90) return "A-"
    if (grade >= 87) return "B+"
    if (grade >= 83) return "B"
    if (grade >= 80) return "B-"
    if (grade >= 77) return "C+"
    if (grade >= 73) return "C"
    if (grade >= 70) return "C-"
    if (grade >= 67) return "D+"
    if (grade >= 60) return "D"
    return "F"
  }

  const averageGrade =
    courses.length > 0 ? (courses.reduce((sum, c) => sum + c.current_grade, 0) / courses.length).toFixed(1) : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">GPA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-600">{calculateGPA()}</div>
          <p className="text-sm text-gray-600 mt-2">Weighted GPA across {courses.length} courses</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Average Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-4xl font-bold ${getGradeColor(Number.parseFloat(averageGrade as string))}`}>
            {averageGrade}%
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Letter Grade: {getGradeLetter(Number.parseFloat(averageGrade as string))}
          </p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Course Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-sm">{course.course_code}</p>
                  <p className="text-xs text-gray-600">{course.course_name}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getGradeColor(course.current_grade)}`}
                      style={{ width: `${course.current_grade}%` }}
                    ></div>
                  </div>
                  <span className={`font-semibold text-sm ${getGradeColor(course.current_grade)}`}>
                    {course.current_grade}% ({getGradeLetter(course.current_grade)})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
