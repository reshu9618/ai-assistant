# StudyAI Architecture

## System Overview

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Dashboard Components                            │   │
│  │  - Overview, Tasks, Calendar, Courses, Schedule │   │
│  │  - AI Assistant Chat Interface                  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              API Layer (Next.js Routes)                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  /api/ai/* - AI endpoints (chat, schedule)      │   │
│  │  /api/assignments/* - Task management           │   │
│  │  /api/courses/* - Course management             │   │
│  │  /api/calendar-events/* - Calendar events       │   │
│  │  /api/reminders/* - Reminder management         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│           Services & Business Logic                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │  AI Service (Vercel AI SDK)                     │   │
│  │  Reminder Service                               │   │
│  │  Schedule Optimizer                             │   │
│  │  Data Validation & Processing                   │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Data Layer                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  localStorage (Client-side)                     │   │
│  │  Supabase (Server-side - Optional)              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Component Hierarchy

\`\`\`
App (page.tsx)
├── Dashboard
│   ├── Sidebar Navigation
│   ├── Tab Content
│   │   ├── Overview Tab
│   │   ├── Tasks Tab (TaskList)
│   │   ├── Calendar Tab (CalendarView)
│   │   ├── Courses Tab (CourseManager)
│   │   ├── Schedule Tab (ScheduleOptimizer)
│   │   └── AI Tab (AIAssistant)
│   └── Modals
│       ├── OnboardingModal
│       ├── TaskForm
│       ├── CourseForm
│       └── AssignmentForm
└── NotificationCenter
\`\`\`

## Data Flow

### Task Management Flow
1. User adds task via TaskForm
2. Data saved to localStorage
3. Dashboard updates with new task
4. AI analyzes task for prioritization
5. Schedule optimizer regenerates plan

### AI Chat Flow
1. User sends message
2. Message sent to /api/ai/chat
3. AI SDK processes with context
4. Response returned to frontend
5. Message displayed in chat interface

### Schedule Generation Flow
1. User clicks "Regenerate Schedule"
2. Request sent to /api/ai/schedule
3. AI analyzes all tasks and courses
4. Optimal schedule generated
5. Schedule displayed with recommendations

## State Management

- **Client State**: React hooks (useState, useEffect)
- **Persistent State**: localStorage
- **Server State**: Supabase (optional)
- **UI State**: Component-level state

## Security Considerations

- Row Level Security (RLS) on Supabase
- Input validation on all forms
- API rate limiting
- Environment variables for secrets
- CORS configuration
- XSS protection via React

## Performance Optimizations

- Code splitting with dynamic imports
- Image optimization
- Caching strategies
- Lazy loading components
- Memoization of expensive computations
- Database query optimization

## Scalability

- Stateless API design
- Database indexing
- Caching layer
- CDN for static assets
- Horizontal scaling ready
