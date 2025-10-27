import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TeamOverview {
  total_employees: number;
  present_today: number;
  on_vacation: number;
  sick_today: number;
}

export interface PendingRequest {
  id: number;
  employee_name: string;
  type: string;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
}

export interface OvertimeSummary {
  employee_id: number;
  employee_name: string;
  total_overtime: number;
  current_month: number;
}

@Injectable({ providedIn: 'root' })
export class ManagerService {
  private apiUrl = `${environment.apiUrl}/manager`;

  constructor(private http: HttpClient) {}

  getTeamOverview(): Observable<TeamOverview> {
    return this.http.get<TeamOverview>(`${this.apiUrl}/team-overview/`);
  }

  getPendingRequests(): Observable<PendingRequest[]> {
    return this.http.get<PendingRequest[]>(`${this.apiUrl}/pending-requests/`);
  }

  getOvertimeSummary(): Observable<OvertimeSummary[]> {
    return this.http.get<OvertimeSummary[]>(`${this.apiUrl}/overtime-summary/`);
  }

  getTeamTimeEntries(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/team-entries/?start=${startDate}&end=${endDate}`);
  }
}