"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export interface Notification {
  id: string
  type: "success" | "warning" | "error" | "info"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
}

interface NotificationCenterProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
}

export function NotificationCenter({ notifications, onDismiss }: NotificationCenterProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([])

  useEffect(() => {
    setVisibleNotifications(notifications.filter((n) => !n.isRead).slice(-3))
  }, [notifications])

  const getTypeStyles = (type: string) => {
    const styles: { [key: string]: string } = {
      success: "bg-green-50 border-green-200 text-green-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      error: "bg-red-50 border-red-200 text-red-800",
      info: "bg-blue-50 border-blue-200 text-blue-800",
    }
    return styles[type] || styles.info
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {visibleNotifications.map((notification) => (
        <Card key={notification.id} className={`border p-4 ${getTypeStyles(notification.type)}`}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-sm">{notification.title}</h3>
              <p className="text-sm mt-1">{notification.message}</p>
              <p className="text-xs opacity-70 mt-2">{new Date(notification.timestamp).toLocaleTimeString()}</p>
            </div>
            <button onClick={() => onDismiss(notification.id)} className="ml-2 text-lg opacity-50 hover:opacity-100">
              ×
            </button>
          </div>
        </Card>
      ))}
    </div>
  )
}
