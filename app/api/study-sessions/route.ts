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
      .from("study_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("start_time", { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching study sessions:", error)
    return NextResponse.json({ error: "Failed to fetch study sessions" }, { status: 500 })
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
    const { assignment_id, start_time, end_time, duration_minutes, notes } = body

    const { data, error } = await supabase
      .from("study_sessions")
      .insert({
        user_id: user.id,
        assignment_id,
        start_time,
        end_time,
        duration_minutes,
        notes,
      })
      .select()

    if (error) throw error

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error("Error creating study session:", error)
    return NextResponse.json({ error: "Failed to create study session" }, { status: 500 })
  }
}
