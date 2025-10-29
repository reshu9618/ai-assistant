# API Documentation

## Base URL
\`https://your-domain.com/api\`

## Authentication
Currently uses localStorage for client-side state. For production, implement JWT authentication.

## Endpoints

### AI Endpoints

#### POST /api/ai/chat
Chat with the AI assistant.

**Request:**
\`\`\`json
{
  "message": "How should I prioritize my tasks?",
  "context": {
    "tasks": [...],
    "courses": [...],
    "studyStyle": "visual"
  }
}
\`\`\`

**Response:**
\`\`\`json
{
  "response": "Based on your workload...",
  "suggestions": [...]
}
\`\`\`

#### POST /api/ai/schedule
Generate optimized study schedule.

**Request:**
\`\`\`json
{
  "tasks": [...],
  "courses": [...],
  "availableHours": 20
}
\`\`\`

**Response:**
\`\`\`json
{
  "schedule": [...],
  "totalHours": 18,
  "recommendations": [...]
}
\`\`\`

#### POST /api/ai/prioritize
Get task prioritization recommendations.

**Request:**
\`\`\`json
{
  "tasks": [...]
}
\`\`\`

**Response:**
\`\`\`json
{
  "prioritized": [...],
  "reasoning": "..."
}
\`\`\`

### Assignment Endpoints

#### GET /api/assignments
Get all assignments.

**Response:**
\`\`\`json
[
  {
    "id": "1",
    "title": "Math Homework",
    "courseCode": "MATH101",
    "dueDate": "2024-01-15",
    "priority": "high",
    "estimatedHours": 3,
    "completed": false
  }
]
\`\`\`

#### POST /api/assignments
Create new assignment.

#### PUT /api/assignments/[id]
Update assignment.

#### DELETE /api/assignments/[id]
Delete assignment.

### Course Endpoints

#### GET /api/courses
Get all courses.

#### POST /api/courses
Create new course.

#### PUT /api/courses/[id]
Update course.

#### DELETE /api/courses/[id]
Delete course.

### Calendar Endpoints

#### GET /api/calendar-events
Get calendar events.

#### POST /api/calendar-events
Create calendar event.

#### DELETE /api/calendar-events/[id]
Delete calendar event.

### Reminder Endpoints

#### GET /api/reminders
Get all reminders.

#### POST /api/reminders
Create reminder.

#### PUT /api/reminders/[id]
Update reminder.

#### DELETE /api/reminders/[id]
Delete reminder.

## Error Handling

All endpoints return standard error responses:

\`\`\`json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "status": 400
}
\`\`\`

## Rate Limiting

- AI endpoints: 10 requests per minute
- Other endpoints: 100 requests per minute

## Pagination

List endpoints support pagination:

\`\`\`
GET /api/assignments?page=1&limit=10
\`\`\`
