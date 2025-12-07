import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextService } from '../../services/text';
import { TimeTrackingService, TimeEntry, WeeklyStats } from '../../services/time-tracking';

interface WeekDay {
  day: string;
  hours: number;
}

@Component({
  selector: 'app-time-tracking',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './time-tracking.html',
  styleUrl: './time-tracking.scss',
})
export class TimeTracking implements OnInit, OnDestroy {
  text: TextService;
  currentTime = '00:00:00';
  isTracking = false;
  todayHours = 0;
  weekHours = 0;

  private timerInterval: any;
  private startTime: Date | null = null;

  timeEntries: TimeEntry[] = [];
  weekData: WeekDay[] = [];
  loading = true;

  constructor(
    textService: TextService,
    private timeTrackingService: TimeTrackingService
  ) {
    this.text = textService;
  }

  ngOnInit() {
    this.loadTimeEntries();
    this.loadWeeklyStats();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  loadTimeEntries() {
    this.timeTrackingService.getAll().subscribe({
      next: (entries: TimeEntry[]) => {
        this.timeEntries = entries;
        this.calculateTodayHours();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading time entries:', error);
        this.loading = false;
      }
    });
  }

  loadWeeklyStats() {
    this.timeTrackingService.getWeeklyStats().subscribe({
      next: (stats: WeeklyStats[]) => {
        this.weekData = stats;
        this.weekHours = stats.reduce((sum, day) => sum + day.hours, 0);
      },
      error: (error) => {
        console.error('Error loading weekly stats:', error);
        // Fallback to empty week data
        this.weekData = [
          { day: this.text.weekDays.short.mon, hours: 0 },
          { day: this.text.weekDays.short.tue, hours: 0 },
          { day: this.text.weekDays.short.wed, hours: 0 },
          { day: this.text.weekDays.short.thu, hours: 0 },
          { day: this.text.weekDays.short.fri, hours: 0 },
          { day: this.text.weekDays.short.sat, hours: 0 },
          { day: this.text.weekDays.short.sun, hours: 0 }
        ];
      }
    });
  }

  calculateTodayHours() {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = this.timeEntries.filter(entry => entry.date === today);
    this.todayHours = todayEntries.reduce((sum, entry) => sum + entry.duration, 0);
  }

  startTracking() {
    this.isTracking = true;
    this.startTime = new Date();

    this.timerInterval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }

  stopTracking() {
    this.isTracking = false;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.currentTime = '00:00:00';
  }

  updateCurrentTime() {
    if (!this.isTracking || !this.startTime) {
      return;
    }

    const now = new Date();
    const diff = now.getTime() - this.startTime.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    this.currentTime = `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  addManualEntry() {
    console.log('Add manual entry');
  }

  editEntry(id: number) {
    console.log('Edit entry', id);
  }

  deleteEntry(id: number) {
    this.timeTrackingService.delete(id).subscribe({
      next: () => {
        this.timeEntries = this.timeEntries.filter(entry => entry.id !== id);
        this.calculateTodayHours();
        this.loadWeeklyStats();
      },
      error: (error) => {
        console.error('Error deleting entry:', error);
        alert('Fehler beim Löschen des Eintrags');
      }
    });
  }
}
