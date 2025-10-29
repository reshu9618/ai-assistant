import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assignments, availableHours, studyStyle, courses } = body

    const prompt = `You are an expert academic scheduler. Create an optimized study schedule for a student.

Student Profile:
- Study Style: ${studyStyle}
- Available Hours This Week: ${availableHours}
- Total Courses: ${courses.length}

Upcoming Assignments:
${assignments
  .map(
    (a: any) =>
      `- ${a.title} (${a.courses?.course_code}) - Due: ${new Date(a.due_date).toLocaleDateString()} - Priority: ${a.priority} - Est. Hours: ${a.estimated_hours}`,
  )
  .join("\n")}

Please provide:
1. A day-by-day study schedule for the next 7 days
2. Specific time blocks for each assignment
3. Break recommendations
4. Study techniques tailored to the student's style
5. Risk mitigation strategies for high-priority assignments

Format as a clear, actionable plan.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    return NextResponse.json({ schedule: text })
  } catch (error) {
    console.error("Error generating schedule:", error)
    return NextResponse.json({ error: "Failed to generate schedule" }, { status: 500 })
  }
}
