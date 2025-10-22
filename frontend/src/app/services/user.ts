import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRole } from './auth';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  department?: string;
  hire_date?: string;
  vacation_days?: number;
  created_at?: string;
}

export interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department?: string;
  vacation_days?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}/`);
  }

  createUser(user: UserCreateRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  changeUserRole(userId: number, role: UserRole): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${userId}/role/`, { role });
  }

  activateUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/`, { status: 'active' });
  }

  deactivateUser(id: number): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}/`, { status: 'inactive' });
  }

  getUsersByRole(role: UserRole): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?role=${role}`);
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?search=${query}`);
  }
}
