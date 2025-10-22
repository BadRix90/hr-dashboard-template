import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EmployeeBalance {
  name: string;
  totalDays: number;
  usedDays: number;
  remainingDays: number;
  pendingDays: number;
}

@Component({
  selector: 'app-vacation-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-balance.html',
  styleUrl: './vacation-balance.scss'
})
export class VacationBalanceComponent {
  employees: EmployeeBalance[] = [
    { name: 'Max Mustermann', totalDays: 30, usedDays: 12, remainingDays: 18, pendingDays: 5 },
    { name: 'Anna Schmidt', totalDays: 28, usedDays: 8, remainingDays: 20, pendingDays: 3 },
    { name: 'Tom Meyer', totalDays: 30, usedDays: 15, remainingDays: 15, pendingDays: 0 },
  ];

  getPercentageUsed(employee: EmployeeBalance): number {
    return (employee.usedDays / employee.totalDays) * 100;
  }
}