-- Create profiles table for student information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  study_style TEXT,
  preferred_study_hours TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  instructor TEXT,
  credits INTEGER,
  current_grade DECIMAL(5,2),
  meeting_times TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create assignments table
CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP NOT NULL,
  estimated_hours DECIMAL(5,2),
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create study sessions table
CREATE TABLE IF NOT EXISTS public.study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create calendar events table
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create reminders table
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL,
  scheduled_time TIMESTAMP NOT NULL,
  message TEXT,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Create RLS policies for courses
CREATE POLICY "courses_select_own" ON public.courses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "courses_insert_own" ON public.courses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "courses_update_own" ON public.courses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "courses_delete_own" ON public.courses FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for assignments
CREATE POLICY "assignments_select_own" ON public.assignments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "assignments_insert_own" ON public.assignments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "assignments_update_own" ON public.assignments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "assignments_delete_own" ON public.assignments FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for study_sessions
CREATE POLICY "study_sessions_select_own" ON public.study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "study_sessions_insert_own" ON public.study_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "study_sessions_update_own" ON public.study_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "study_sessions_delete_own" ON public.study_sessions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for calendar_events
CREATE POLICY "calendar_events_select_own" ON public.calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "calendar_events_insert_own" ON public.calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "calendar_events_update_own" ON public.calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "calendar_events_delete_own" ON public.calendar_events FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for reminders
CREATE POLICY "reminders_select_own" ON public.reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "reminders_insert_own" ON public.reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reminders_update_own" ON public.reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reminders_delete_own" ON public.reminders FOR DELETE USING (auth.uid() = user_id);
