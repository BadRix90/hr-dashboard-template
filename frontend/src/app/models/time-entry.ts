import { User } from './user.model';

export interface TimeEntry {
  id: number;
  user: Pick<User, 'id' | 'username' | 'email'> | null;
  project: number;
  project_name: string;
  start_time: string;
  end_time: string | null;
  description: string;
  duration_minutes: number;
  created_at: string;
}

export interface TimeEntryCreate {
  project: number;
  start_time: string;
  end_time?: string;
  description: string;
  duration_minutes: number;
}