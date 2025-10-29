import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { assignments, courses, studyStyle } = body

    const prompt = `You are an academic advisor helping a student prioritize their assignments. 
    
Student Study Style: ${studyStyle}

Current Courses:
${courses.map((c: any) => `- ${c.course_code}: ${c.course_name} (Grade: ${c.current_grade}%)`).join("\n")}

Upcoming Assignments:
${assignments.map((a: any) => `- ${a.title} (${a.courses?.course_code}) - Due: ${new Date(a.due_date).toLocaleDateString()} - Priority: ${a.priority} - Est. Hours: ${a.estimated_hours}`).join("\n")}

Based on this information, provide:
1. A prioritized list of assignments (ranked by urgency and importance)
2. Recommended study schedule for today
3. Specific study tips for this student's style
4. Estimated time to complete each assignment
5. Risk assessment for each course

Format your response as a clear, actionable plan.`

    const { text } = await generateText({
      model: "openai/gpt-4o-mini",
      prompt,
    })

    return NextResponse.json({ recommendation: text })
  } catch (error) {
    console.error("Error generating AI recommendation:", error)
    return NextResponse.json({ error: "Failed to generate recommendation" }, { status: 500 })
  }
}
