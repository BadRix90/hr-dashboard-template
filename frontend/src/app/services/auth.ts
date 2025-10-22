import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export type UserRole = 'Admin' | 'Manager' | 'Mitarbeiter';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  isLoggedIn = signal(false);
  currentRole = signal<UserRole | null>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login/`, { email, password })
      .pipe(tap(user => this.setCurrentUser(user)));
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
    this.currentRole.set(null);
  }

  hasRole(role: UserRole): boolean {
    return this.currentRole() === role;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isManager(): boolean {
    return this.hasRole('Manager') || this.isAdmin();
  }

  private setCurrentUser(user: User): void {
    if (user.token) {
      localStorage.setItem('auth_token', user.token);
    }
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isLoggedIn.set(true);
    this.currentRole.set(user.role);
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('current_user');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.isLoggedIn.set(true);
      this.currentRole.set(user.role);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}