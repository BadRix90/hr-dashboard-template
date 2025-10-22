export interface TimeEntry {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  } | null;
  project: number;
  project_name: string;
  start_time: string;
  end_time: string | null;
  description: string;
  duration_minutes: number;
  created_at: string;
}