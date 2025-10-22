import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export type UserRole = 'admin' | 'manager' | 'employee';

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  department: string;
  vacation_days: number;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  isLoggedIn = signal(false);
  currentRole = signal<UserRole | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken();
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login/`, { username, password })
      .pipe(tap(response => this.handleAuthSuccess(response)));
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/auth/logout/`, { refresh_token: refreshToken }).subscribe();
    }
    this.clearTokens();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<{ access: string }> {
    const refreshToken = localStorage.getItem('refresh_token');
    return this.http.post<{ access: string }>(`${this.apiUrl}/auth/refresh/`, { refresh: refreshToken })
      .pipe(tap(response => localStorage.setItem('access_token', response.access)));
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  isAdmin(): boolean {
    return this.currentRole() === 'admin';
  }

  isManager(): boolean {
    const role = this.currentRole();
    return role === 'admin' || role === 'manager';
  }

  private handleAuthSuccess(response: LoginResponse): void {
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    if (this.isAuthenticated()) {
      this.http.get<User>(`${this.apiUrl}/users/me/`).subscribe({
        next: user => {
          this.currentUserSubject.next(user);
          this.isLoggedIn.set(true);
          this.currentRole.set(user.role);
        },
        error: () => this.clearTokens()
      });
    }
  }

  private clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
    this.currentRole.set(null);
  }
}