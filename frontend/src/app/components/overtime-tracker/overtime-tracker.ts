import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OvertimeEntry {
  employee: string;
  date: Date;
  hours: number;
  reason: string;
}

@Component({
  selector: 'app-overtime-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overtime-tracker.html',
  styleUrl: './overtime-tracker.scss'
})
export class OvertimeTrackerComponent {
  overtimeEntries: OvertimeEntry[] = [
    { employee: 'Max Mustermann', date: new Date(2025, 9, 15), hours: 4, reason: 'Projekt Deadline' },
    { employee: 'Tom Meyer', date: new Date(2025, 9, 18), hours: 8, reason: 'Notfall-Support' },
    { employee: 'Max Mustermann', date: new Date(2025, 9, 20), hours: 2, reason: 'Meeting' },
  ];

  getTotalOvertime(): number {
    return this.overtimeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  }
}