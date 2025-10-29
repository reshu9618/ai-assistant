# StudyAI - AI-Powered Student Academic Assistant

A comprehensive web application that helps students manage their time, prioritize assignments, and plan academic schedules using AI-powered recommendations.

## Features

### Dashboard Overview
- Real-time statistics on tasks, deadlines, study hours, and GPA projection
- Multi-tab interface for organized navigation
- Responsive design for all screen sizes

### Task Management
- Add, edit, and delete tasks with priority levels
- Estimated study hours for each assignment
- Mark tasks complete and track progress
- Auto-save to localStorage

### Course Management
- Track enrolled courses with instructor information
- View course schedules and current grades
- Calculate total credits and weighted GPA
- Course-specific assignment tracking

### Calendar Integration
- Monthly calendar view with color-coded events
- Event types: deadlines, exams, classes, study sessions
- Upcoming events sidebar with quick reference
- Visual event management

### AI-Powered Schedule Optimizer
- Generates optimal study schedules based on task priority
- Identifies peak focus hours (9 AM - 12 PM)
- Recommends break intervals for better retention
- Provides personalized study recommendations

### AI Assistant Chat
- Real-time conversation interface
- Personalized academic recommendations
- Analyzes workload and suggests prioritization
- Offers study tips and deadline management advice
- Context-aware responses

### Data Persistence
- All data saved to localStorage
- Tasks and courses persist across sessions
- Onboarding status remembered

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **AI**: Vercel AI SDK
- **Database**: Supabase (optional for production)
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/reshu9618/ai-assistant.git
cd ai-assistant
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables (optional for local development):
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── chat/route.ts          # AI chat endpoint
│   │   │   ├── prioritize/route.ts    # Task prioritization
│   │   │   └── schedule/route.ts      # Schedule generation
│   │   ├── assignments/route.ts       # Assignment CRUD
│   │   ├── courses/route.ts           # Course CRUD
│   │   ├── calendar-events/route.ts   # Calendar events
│   │   ├── reminders/route.ts         # Reminder management
│   │   └── study-sessions/route.ts    # Study session tracking
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Main page
│   └── globals.css                    # Global styles
├── components/
│   ├── dashboard.tsx                  # Main dashboard
│   ├── task-list.tsx                  # Task management
│   ├── course-manager.tsx             # Course management
│   ├── calendar-view.tsx              # Calendar display
│   ├── schedule-optimizer.tsx         # Schedule optimization
│   ├── ai-assistant.tsx               # AI chat interface
│   ├── onboarding-modal.tsx           # Onboarding wizard
│   ├── course-form.tsx                # Course form
│   ├── assignment-form.tsx            # Assignment form
│   ├── assignment-tracker.tsx         # Assignment tracking
│   ├── grade-analytics.tsx            # Grade analytics
│   ├── notification-center.tsx        # Notifications
│   ├── enhanced-calendar.tsx          # Enhanced calendar
│   └── reminder-manager.tsx           # Reminder management
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Supabase client
│   │   └── server.ts                  # Supabase server
│   └── reminder-service.ts            # Reminder service
├── scripts/
│   └── 001_create_tables.sql          # Database schema
└── public/
    └── placeholder.svg                # Placeholder images
\`\`\`

## Usage

### Adding a Task
1. Click the "Tasks" tab
2. Click "Add Task" button
3. Fill in task details (title, course, due date, priority, hours)
4. Click "Add Task" to save

### Adding a Course
1. Click the "Courses" tab
2. Click "Add Course" button
3. Fill in course details (code, name, instructor, credits)
4. Click "Add Course" to save

### Using the AI Assistant
1. Click the "AI Assistant" tab
2. Type your question or request
3. Press Enter or click Send
4. Get personalized academic recommendations

### Generating Optimized Schedule
1. Click the "Schedule" tab
2. Review the current study plan
3. Click "Regenerate Schedule" for AI-optimized recommendations
4. Follow the suggested study sessions

## API Endpoints

### AI Endpoints
- `POST /api/ai/chat` - Chat with AI assistant
- `POST /api/ai/prioritize` - Get task prioritization
- `POST /api/ai/schedule` - Generate optimized schedule

### Task Endpoints
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment
- `PUT /api/assignments/[id]` - Update assignment
- `DELETE /api/assignments/[id]` - Delete assignment

### Course Endpoints
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/[id]` - Update course
- `DELETE /api/courses/[id]` - Delete course

### Calendar Endpoints
- `GET /api/calendar-events` - Get calendar events
- `POST /api/calendar-events` - Create event
- `DELETE /api/calendar-events/[id]` - Delete event

### Reminder Endpoints
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/[id]` - Update reminder
- `DELETE /api/reminders/[id]` - Delete reminder

## Environment Variables

For production deployment with Supabase:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Configure environment variables
6. Click "Deploy"

The application will be live at your Vercel URL.

## Features in Development

- Real calendar API integration (Google Calendar, Outlook)
- University course registration system integration
- Mobile app version
- Advanced analytics and insights
- Collaborative study groups
- Integration with learning management systems (Canvas, Blackboard)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@studyai.com or open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [Vercel AI SDK](https://sdk.vercel.ai/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database by [Supabase](https://supabase.com/)
