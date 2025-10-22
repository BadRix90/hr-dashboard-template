import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TimeTrackingService } from '../../services/time-tracking';
import { ReloadService } from '../../services/reload';
import { TimeEntry } from '../../models/time-entry';

@Component({
  selector: 'app-time-entry-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-entry-list.html',
  styleUrl: './time-entry-list.scss'
})
export class TimeEntryListComponent implements OnInit, OnDestroy {
  private timeTrackingService = inject(TimeTrackingService);
  private reloadService = inject(ReloadService);
  private reloadSubscription?: Subscription;
  
  timeEntries: TimeEntry[] = [];
  loading = true;

  ngOnInit() {
    this.loadEntries();
    
    // Subscribe to reload events
    this.reloadSubscription = this.reloadService.reload$.subscribe(() => {
      this.loadEntries();
    });
  }

  ngOnDestroy() {
    this.reloadSubscription?.unsubscribe();
  }

  loadEntries() {
    this.loading = true;
    this.timeTrackingService.getTimeEntries().subscribe({
      next: (entries) => {
        this.timeEntries = entries;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading entries:', err);
        this.loading = false;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }

  getTotalHours(): string {
    const total = this.timeEntries.reduce((sum, entry) => sum + entry.duration_minutes, 0);
    return this.formatDuration(total);
  }
}