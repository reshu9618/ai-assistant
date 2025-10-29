"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  title: string
  course: string
  dueDate: string
  priority: "high" | "medium" | "low"
  completed: boolean
  estimatedHours: number
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("student-tasks")
      if (saved) return JSON.parse(saved)
    }
    return [
      {
        id: "1",
        title: "Complete Calculus Problem Set",
        course: "MATH 101",
        dueDate: "2024-11-05",
        priority: "high",
        completed: false,
        estimatedHours: 3,
      },
      {
        id: "2",
        title: "Read Chapter 5-7 for History",
        course: "HIST 201",
        dueDate: "2024-11-06",
        priority: "medium",
        completed: false,
        estimatedHours: 2,
      },
      {
        id: "3",
        title: "Lab Report - Chemistry",
        course: "CHEM 150",
        dueDate: "2024-11-04",
        priority: "high",
        completed: false,
        estimatedHours: 4,
      },
      {
        id: "4",
        title: "Essay Draft - Literature",
        course: "ENG 102",
        dueDate: "2024-11-08",
        priority: "medium",
        completed: true,
        estimatedHours: 5,
      },
    ]
  })

  const [isOpen, setIsOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    course: "",
    dueDate: "",
    priority: "medium" as const,
    estimatedHours: 1,
  })

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks)
    if (typeof window !== "undefined") {
      localStorage.setItem("student-tasks", JSON.stringify(updatedTasks))
    }
  }

  const toggleTask = (id: string) => {
    updateTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id: string) => {
    updateTasks(tasks.filter((t) => t.id !== id))
  }

  const addTask = () => {
    if (!newTask.title || !newTask.course || !newTask.dueDate) return

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
    }

    updateTasks([...tasks, task])
    setNewTask({ title: "", course: "", dueDate: "", priority: "medium", estimatedHours: 1 })
    setIsOpen(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/20 text-destructive"
      case "medium":
        return "bg-accent/20 text-accent"
      case "low":
        return "bg-secondary/20 text-secondary"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Tasks</h2>
          <p className="text-sm text-muted-foreground">Manage and prioritize your assignments</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <span>➕</span>
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new assignment or task to track</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Complete Problem Set"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="course">Course Code</Label>
                <Input
                  id="course"
                  placeholder="e.g., MATH 101"
                  value={newTask.course}
                  onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hours">Estimated Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={newTask.estimatedHours}
                  onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number.parseFloat(e.target.value) })}
                />
              </div>
              <Button onClick={addTask} className="w-full">
                Add Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {sortedTasks.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <p>No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              sortedTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-medium text-foreground ${task.completed ? "line-through" : ""}`}>
                        {task.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {task.course}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{task.estimatedHours}h estimated</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <Button variant="ghost" size="sm">
                      <span>✏️</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                      <span>🗑️</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
