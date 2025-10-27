import { Component, signal, output, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService, ProjectCreate } from '../../services/project';
import { Project } from '../../models/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss'
})
export class ProjectFormComponent {
  project = input<Project | null>(null);
  closeModal = output<void>();
  projectSaved = output<Project>();

  form = signal<ProjectCreate>({ name: '', description: '', is_active: true });
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    const existingProject = this.project();
    if (existingProject) {
      this.form.set({
        name: existingProject.name,
        description: existingProject.description,
        is_active: existingProject.is_active
      });
    }
  }

  onSubmit() {
    this.loading.set(true);
    this.error.set(null);
    const projectData = this.form();
    const existingProject = this.project();

    const saveAction = existingProject
      ? this.projectService.updateProject(existingProject.id, projectData)
      : this.projectService.createProject(projectData);

    saveAction.subscribe({
      next: (saved) => {
        this.projectSaved.emit(saved);
        this.closeModal.emit();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Fehler beim Speichern');
        this.loading.set(false);
      }
    });
  }

  updateField(field: keyof ProjectCreate, value: any) {
    this.form.update(current => ({ ...current, [field]: value }));
  }

  close() {
    this.closeModal.emit();
  }
}