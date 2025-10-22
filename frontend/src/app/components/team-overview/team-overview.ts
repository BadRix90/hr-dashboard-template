import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  hoursWorked: number;
  overtimeHours: number;
  vacationDays: number;
  status: 'working' | 'vacation' | 'sick';
}

@Component({
  selector: 'app-team-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-overview.html',
  styleUrl: './team-overview.scss'
})
export class TeamOverviewComponent {
  team: TeamMember[] = [
    { name: 'Max Mustermann', hoursWorked: 160, overtimeHours: 8, vacationDays: 12, status: 'working' },
    { name: 'Anna Schmidt', hoursWorked: 152, overtimeHours: 0, vacationDays: 8, status: 'vacation' },
    { name: 'Tom Meyer', hoursWorked: 168, overtimeHours: 16, vacationDays: 15, status: 'working' },
  ];

  getTotalHours(): number {
    return this.team.reduce((sum, member) => sum + member.hoursWorked, 0);
  }

  getTotalOvertime(): number {
    return this.team.reduce((sum, member) => sum + member.overtimeHours, 0);
  }
}