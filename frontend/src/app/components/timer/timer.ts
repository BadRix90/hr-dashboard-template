import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeTrackingService } from '../../services/time-tracking';
import { ReloadService } from '../../services/reload';
import { Project } from '../../models/project';
import { TimeEntry } from '../../models/time-entry';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './timer.html',
  styleUrl: './timer.scss'
})
export class TimerComponent implements OnInit {
  private timeTrackingService = inject(TimeTrackingService);
  private reloadService = inject(ReloadService);
  
  projects: Project[] = [];
  selectedProjectId: number | null = null;
  activeEntry: TimeEntry | null = null;
  isRunning = false;

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.timeTrackingService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (err) => console.error('Error loading projects:', err)
    });
  }

  startTimer() {
    if (!this.selectedProjectId) return;
    
    this.timeTrackingService.startTimer(this.selectedProjectId).subscribe({
      next: (entry) => {
        this.activeEntry = entry;
        this.isRunning = true;
      },
      error: (err) => console.error('Error starting timer:', err)
    });
  }

  stopTimer() {
    if (!this.activeEntry) return;
    
    this.timeTrackingService.stopTimer(this.activeEntry.id).subscribe({
      next: (entry) => {
        this.activeEntry = null;
        this.isRunning = false;
        this.reloadService.triggerReload();
      },
      error: (err) => console.error('Error stopping timer:', err)
    });
  }
}