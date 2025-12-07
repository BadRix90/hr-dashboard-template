import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface VacationRequest {
  id: number;
  employee: {
    id: number;
    user: {
      first_name: string;
      last_name: string;
    };
  };
  start_date: string;
  end_date: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  days: number;
  created_at: string;
  updated_at: string;
}

export interface VacationRequestCreate {
  start_date: string;
  end_date: string;
  reason?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VacationService {
  private apiUrl = `${environment.apiUrl}/vacation-requests`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VacationRequest[]> {
    return this.http.get<VacationRequest[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<VacationRequest> {
    return this.http.get<VacationRequest>(`${this.apiUrl}/${id}/`);
  }

  create(data: VacationRequestCreate): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/`, data);
  }

  approve(id: number): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/${id}/approve/`, {});
  }

  reject(id: number): Observable<VacationRequest> {
    return this.http.post<VacationRequest>(`${this.apiUrl}/${id}/reject/`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}
