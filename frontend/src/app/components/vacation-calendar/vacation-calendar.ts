import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VacationDay {
  date: Date;
  employee: string;
  status: 'approved' | 'pending';
}

@Component({
  selector: 'app-vacation-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-calendar.html',
  styleUrl: './vacation-calendar.scss'
})
export class VacationCalendarComponent {
  currentMonth = new Date();
  vacations: VacationDay[] = [
    { date: new Date(2025, 9, 25), employee: 'Max Mustermann', status: 'approved' },
    { date: new Date(2025, 9, 26), employee: 'Max Mustermann', status: 'approved' },
  ];

  getDaysInMonth(): Date[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const days: Date[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  }

  isVacationDay(date: Date): boolean {
    return this.vacations.some(v => 
      v.date.toDateString() === date.toDateString()
    );
  }
}