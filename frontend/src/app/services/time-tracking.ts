import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { TimeEntry } from '../models/time-entry';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects/`);
  }

  getTimeEntries(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/time-entries/`);
  }

  createTimeEntry(entry: any): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/time-entries/`, entry);
  }

  startTimer(projectId: number): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/time-entries/start_timer/`, {
      project_id: projectId
    });
  }

  stopTimer(entryId: number): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(`${this.apiUrl}/time-entries/${entryId}/stop_timer/`, {});
  }
}