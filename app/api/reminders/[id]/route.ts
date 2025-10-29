import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase.from("reminders").update(body).eq("id", id).eq("user_id", user.id).select()

    if (error) throw error
    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Reminder not found" }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error updating reminder:", error)
    return NextResponse.json({ error: "Failed to update reminder" }, { status: 500 })
  }
}
