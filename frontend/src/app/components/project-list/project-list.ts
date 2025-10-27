import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectListComponent {
  editProject = output<Project>();
  
  projects = signal<Project[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.loading.set(true);
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Fehler beim Laden der Projekte');
        this.loading.set(false);
      }
    });
  }

  onEdit(project: Project) {
    this.editProject.emit(project);
  }

  onDelete(project: Project) {
    if (confirm(`Projekt "${project.name}" wirklich löschen?`)) {
      this.projectService.deleteProject(project.id).subscribe({
        next: () => this.loadProjects(),
        error: (err) => alert('Fehler beim Löschen')
      });
    }
  }

  toggleStatus(project: Project) {
    this.projectService.toggleProjectStatus(project.id, !project.is_active).subscribe({
      next: () => this.loadProjects(),
      error: (err) => alert('Fehler beim Aktualisieren')
    });
  }
}