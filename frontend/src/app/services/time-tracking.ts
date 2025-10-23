import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project';
import { TimeEntry } from '../models/time-entry';

@Injectable({
  providedIn: 'root'
})
export class TimeTrackingService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<any>(`${this.apiUrl}/projects/`).pipe(
      map(response => Array.isArray(response) ? response : response.results || [])
    );
  }

  getTimeEntries(): Observable<TimeEntry[]> {
    return this.http.get<any>(`${this.apiUrl}/time-entries/`).pipe(
      map(response => Array.isArray(response) ? response : response.results || [])
    );
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