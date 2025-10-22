import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TimeTrackingService } from '../../services/time-tracking';
import { ReloadService } from '../../services/reload';
import { Project } from '../../models/project';

@Component({
  selector: 'app-time-entry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './time-entry-form.html',
  styleUrl: './time-entry-form.scss'
})
export class TimeEntryFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private timeTrackingService = inject(TimeTrackingService);
  private reloadService = inject(ReloadService);
  
  projects: Project[] = [];
  entryForm!: FormGroup;
  
  ngOnInit() {
    this.loadProjects();
    this.initForm();
  }

  initForm() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    this.entryForm = this.fb.group({
      project: [null, Validators.required],
      startDate: [this.formatDate(oneHourAgo), Validators.required],
      startTime: [this.formatTime(oneHourAgo), Validators.required],
      endDate: [this.formatDate(now), Validators.required],
      endTime: [this.formatTime(now), Validators.required],
      description: ['']
    });
  }

  loadProjects() {
    this.timeTrackingService.getProjects().subscribe({
      next: (projects) => this.projects = projects,
      error: (err) => console.error('Error loading projects:', err)
    });
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
  }

  calculateDuration(): number {
    const form = this.entryForm.value;
    const start = new Date(`${form.startDate}T${form.startTime}`);
    const end = new Date(`${form.endDate}T${form.endTime}`);
    return Math.round((end.getTime() - start.getTime()) / 60000);
  }

  onSubmit() {
    if (this.entryForm.invalid) return;
    
    const form = this.entryForm.value;
    const duration = this.calculateDuration();
    
    if (duration <= 0) {
      alert('Endzeit muss nach Startzeit liegen!');
      return;
    }

    const payload = {
      project: form.project,
      start_time: `${form.startDate}T${form.startTime}:00Z`,
      end_time: `${form.endDate}T${form.endTime}:00Z`,
      description: form.description,
      duration_minutes: duration
    };

    this.timeTrackingService.createTimeEntry(payload).subscribe({
      next: () => {
        alert('Eintrag gespeichert!');
        this.entryForm.reset();
        this.initForm();
        this.reloadService.triggerReload();
      },
      error: (err) => console.error('Error saving entry:', err)
    });
  }

  getDuration(): string {
    if (this.entryForm.invalid) return '0h 0min';
    const minutes = this.calculateDuration();
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
}