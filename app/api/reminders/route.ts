import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("reminders")
      .select("*, assignments(title, due_date, courses(course_code))")
      .eq("user_id", user.id)
      .order("scheduled_time", { ascending: true })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching reminders:", error)
    return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { assignment_id, reminder_type, scheduled_time, message } = body

    const { data, error } = await supabase
      .from("reminders")
      .insert({
        user_id: user.id,
        assignment_id,
        reminder_type,
        scheduled_time,
        message,
        is_sent: false,
      })
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Error creating reminder:", error)
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 })
  }
}
