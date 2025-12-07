import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface TimeEntry {
  id: number;
  employee: {
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  date: string;
  start_time: string;
  end_time: string;
  project: string;
  description: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface TimeEntryCreate {
  date: string;
  start_time: string;
  end_time: string;
  project?: string;
  description?: string;
}

export interface WeeklyStats {
  day: string;
  hours: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  private apiUrl = `${environment.apiUrl}/time-entries`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<TimeEntry> {
    return this.http.get<TimeEntry>(`${this.apiUrl}/${id}/`);
  }

  create(data: TimeEntryCreate): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/`, data);
  }

  update(id: number, data: Partial<TimeEntryCreate>): Observable<TimeEntry> {
    return this.http.patch<TimeEntry>(`${this.apiUrl}/${id}/`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  getWeeklyStats(): Observable<WeeklyStats[]> {
    return this.http.get<WeeklyStats[]>(`${this.apiUrl}/weekly_stats/`);
  }
}
