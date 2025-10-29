import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context } = body

    const systemPrompt = `You are an empathetic and knowledgeable academic advisor helping a student manage their time, assignments, and stress. 
You have access to their course load, upcoming deadlines, and study patterns.

Context:
- Total Courses: ${context?.totalCourses || 0}
- Upcoming Deadlines: ${context?.upcomingDeadlines || 0}
- Study Hours This Week: ${context?.studyHours || 0}
- GPA: ${context?.gpa || "N/A"}

Provide supportive, practical advice that:
1. Acknowledges their workload and stress
2. Offers concrete, actionable suggestions
3. Prioritizes their well-being alongside academic success
4. Suggests specific study techniques and time management strategies`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt: `${systemPrompt}\n\nStudent: ${message}`,
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat:", error)
    return NextResponse.json({ error: "Failed to process message" }, { status: 500 })
  }
}
