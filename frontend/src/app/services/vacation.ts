import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export type VacationStatus = 'pending' | 'approved' | 'rejected';
export type VacationType = 'urlaub' | 'krank' | 'sonderurlaub';

export interface VacationRequest {
  id?: number;
  employee_id: number;
  employee_name?: string;
  start_date: string;
  end_date: string;
  type: VacationType;
  days: number;
  status: VacationStatus;
  reason?: string;
  created_at?: string;
}

export interface VacationBalance {
  employee_id: number;
  total_days: number;
  used_days: number;
  remaining_days: number;
  pending_days: number;
}

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private apiUrl = '/api/vacation';

  constructor(private http: HttpClient) {}

  getVacationRequests(): Observable<VacationRequest[]> {
    return this.http.get<any>(`${this.apiUrl}/requests/`).pipe(
      map(response => Array.isArray(response) ? response : response.results || [])
    );
  }

  getVacationRequest(id: number): Observable<VacationRequest> {
    return this.http.get<VacationRequest>(`${this.apiUrl}/requests/${id}/`);
  }

  createVacationRequest(request: VacationRequest): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/requests/`, request);
  }

  updateVacationRequest(id: number, request: Partial<VacationRequest>): Observable<VacationRequest> {
    return this.http.patch<VacationRequest>(`${this.apiUrl}/requests/${id}/`, request);
  }

  deleteVacationRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/requests/${id}/`);
  }

  approveVacationRequest(id: number): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/requests/${id}/approve/`, {});
  }

  rejectVacationRequest(id: number, reason: string): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/requests/${id}/reject/`, { reason });
  }

  getVacationBalance(employeeId: number): Observable<VacationBalance> {
    return this.http.get<VacationBalance>(`${this.apiUrl}/balance/${employeeId}/`);
  }

  calculateVacationDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    let days = 0;

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        days++;
      }
    }

    return days;
  }
}