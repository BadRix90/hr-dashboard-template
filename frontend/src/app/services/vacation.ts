import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

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
  rejection_reason?: string;
  created_at?: string;
}

export interface VacationBalance {
  employee_id: number;
  total_days: number;
  used_days: number;
  remaining_days: number;
  pending_days: number;
}

@Injectable({ providedIn: 'root' })
export class VacationService {
  private apiUrl = `${environment.apiUrl}/vacation/requests`;

  constructor(private http: HttpClient) { }

  getVacationRequests(): Observable<VacationRequest[]> {
    return this.http.get<any>(`${this.apiUrl}/`).pipe(
      map(response => Array.isArray(response) ? response : response.results || [])
    );
  }

  getVacationRequest(id: number): Observable<VacationRequest> {
    return this.http.get<VacationRequest>(`${this.apiUrl}/${id}/`);
  }

  createVacationRequest(request: Partial<VacationRequest>): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/`, request);
  }

  updateVacationRequest(id: number, request: Partial<VacationRequest>): Observable<VacationRequest> {
    return this.http.patch<VacationRequest>(`${this.apiUrl}/${id}/`, request);
  }

  deleteVacationRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  approveVacationRequest(id: number): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/${id}/approve/`, {});
  }

  rejectVacationRequest(id: number, reason: string): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/${id}/reject/`, { reason });
  }

  getVacationBalance(employeeId: number): Observable<VacationBalance> {
    return this.http.get<VacationBalance>(`${environment.apiUrl}/vacation/balance/${employeeId}/`);
  }

  calculateVacationDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));

    let workDays = 0;
    for (let i = 0; i <= diffDays; i++) {
      const current = new Date(start.getTime() + i * oneDay);
      const day = current.getDay();
      if (day !== 0 && day !== 6) workDays++;
    }

    return workDays;
  }
}
  
