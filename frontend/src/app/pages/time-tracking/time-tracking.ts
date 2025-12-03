import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextService } from '../../services/text';

interface TimeEntry {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  project?: string;
  description?: string;
}

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
  todayHours = 7.5;
  weekHours = 38.5;

  private timerInterval: any;
  private startTime: Date | null = null;

  timeEntries: TimeEntry[] = [
    {
      id: 1,
      date: '2024-12-03',
      startTime: '09:00',
      endTime: '17:30',
      duration: 8.5,
      project: 'HR Dashboard',
      description: 'Frontend-Entwicklung'
    },
    {
      id: 2,
      date: '2024-12-02',
      startTime: '08:30',
      endTime: '16:00',
      duration: 7.5,
      project: 'HR Dashboard',
      description: 'Backend API Setup'
    },
    {
      id: 3,
      date: '2024-12-01',
      startTime: '09:00',
      endTime: '17:00',
      duration: 8.0,
      project: 'Kunden-Meeting'
    }
  ];

  weekData: WeekDay[];

  constructor(textService: TextService) {
    this.text = textService;
    this.weekData = [
      { day: this.text.weekDays.short.mon, hours: 8.5 },
      { day: this.text.weekDays.short.tue, hours: 7.5 },
      { day: this.text.weekDays.short.wed, hours: 8.0 },
      { day: this.text.weekDays.short.thu, hours: 7.5 },
      { day: this.text.weekDays.short.fri, hours: 7.0 },
      { day: this.text.weekDays.short.sat, hours: 0 },
      { day: this.text.weekDays.short.sun, hours: 0 }
    ];
  }

  ngOnInit() {
    this.updateCurrentTime();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
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
    console.log('Delete entry', id);
  }
}
