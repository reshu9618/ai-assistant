"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "./calendar-view"
import { TaskList } from "./task-list"
import { AIAssistant } from "./ai-assistant"
import { CourseManager } from "./course-manager"
import { ScheduleOptimizer } from "./schedule-optimizer"

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [notifications, setNotifications] = useState(3)
  const [stats, setStats] = useState({
    tasksToday: 5,
    upcomingDeadlines: 3,
    studyHoursThisWeek: 12,
    gpaProjection: 3.8,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStats = localStorage.getItem("student-stats")
      if (savedStats) {
        setStats(JSON.parse(savedStats))
      }
    }
  }, [])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
              SA
            </div>
            {sidebarOpen && <span className="font-bold text-sidebar-foreground">StudyAI</span>}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "tasks", label: "Tasks", icon: "✓" },
            { id: "calendar", label: "Calendar", icon: "📅" },
            { id: "courses", label: "Courses", icon: "📚" },
            { id: "schedule", label: "Schedule", icon: "⏰" },
            { id: "ai", label: "AI Assistant", icon: "🤖" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors">
            <span className="text-lg">⚙️</span>
            {sidebarOpen && <span className="text-sm">Settings</span>}
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors"
          >
            {sidebarOpen ? <span className="text-lg">✕</span> : <span className="text-lg">☰</span>}
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between z-10">
          <h1 className="text-2xl font-bold text-foreground">Academic Assistant</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <span className="text-xl">🔔</span>
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
          </div>
        </div>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="ai">AI</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <OverviewTab stats={stats} />
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <TaskList />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <CalendarView />
            </TabsContent>

            <TabsContent value="courses" className="space-y-6">
              <CourseManager />
            </TabsContent>

            <TabsContent value="schedule" className="space-y-6">
              <ScheduleOptimizer />
            </TabsContent>

            <TabsContent value="ai" className="space-y-6">
              <AIAssistant />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function OverviewTab({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Tasks Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{stats.tasksToday}</div>
          <p className="text-xs text-muted-foreground mt-1">2 completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-accent">{stats.upcomingDeadlines}</div>
          <p className="text-xs text-muted-foreground mt-1">Next: 2 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Study Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-secondary">{stats.studyHoursThisWeek}h</div>
          <p className="text-xs text-muted-foreground mt-1">This week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">GPA Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{stats.gpaProjection}</div>
          <p className="text-xs text-muted-foreground mt-1">Based on current work</p>
        </CardContent>
      </Card>
    </div>
  )
}
