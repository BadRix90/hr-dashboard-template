import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Notification {
  id: number;
  type: 'vacation' | 'time' | 'team' | 'system';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/`);
  }

  getById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}/${id}/`);
  }

  markAsRead(id: number): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}/${id}/mark_read/`, {});
  }

  markAllAsRead(): Observable<{status: string}> {
    return this.http.post<{status: string}>(`${this.apiUrl}/mark_all_read/`, {});
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }
}
