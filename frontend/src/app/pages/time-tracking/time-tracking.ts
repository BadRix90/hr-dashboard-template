import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../../components/timer/timer';
import { TimeEntryFormComponent } from '../../components/time-entry-form/time-entry-form';
import { TimeEntryListComponent } from '../../components/time-entry-list/time-entry-list';
import { ProjectFormComponent } from '../../components/project-form/project-form';
import { ProjectListComponent } from '../../components/project-list/project-list';
import { Project } from '../../models/project';

@Component({
  selector: 'app-time-tracking',
  standalone: true,
  imports: [
    CommonModule,
    TimerComponent,
    TimeEntryFormComponent,
    TimeEntryListComponent,
    ProjectFormComponent,
    ProjectListComponent
  ],
  templateUrl: './time-tracking.html',
  styleUrl: './time-tracking.scss'
})
export class TimeTrackingComponent {
  showProjectModal = signal(false);
  selectedProject = signal<Project | null>(null);

  openProjectModal(project: Project | null = null) {
    this.selectedProject.set(project);
    this.showProjectModal.set(true);
  }

  closeProjectModal() {
    this.showProjectModal.set(false);
    this.selectedProject.set(null);
  }

  onProjectSaved() {
    this.closeProjectModal();
  }
}