import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Project } from '../models/project';
import { environment } from '../../environments/environment';

export interface ProjectCreate {
  name: string;
  description: string;
  is_active: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/timetracking/projects`;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<any>(`${this.apiUrl}/`).pipe(
      map(response => Array.isArray(response) ? response : response.results || [])
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}/`);
  }

  createProject(project: ProjectCreate): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/`, project);
  }

  updateProject(id: number, project: Partial<Project>): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}/`, project);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/`);
  }

  toggleProjectStatus(id: number, isActive: boolean): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/${id}/`, { is_active: isActive });
  }
}