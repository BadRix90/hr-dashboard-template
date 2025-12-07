import { Component, OnInit } from '@angular/core';
import { StatsCard } from '../stats-card/stats-card';
import { TextService } from '../../services/text';
import { EmployeeService, EmployeeStats } from '../../services/employee';
import { VacationService } from '../../services/vacation';
import { TimeTrackingService } from '../../services/time-tracking';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [StatsCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  text: TextService;
  stats: StatCard[];

  constructor(
    textService: TextService,
    private employeeService: EmployeeService,
    private vacationService: VacationService,
    private timeTrackingService: TimeTrackingService
  ) {
    this.text = textService;

    // Initialize with placeholder values
    this.stats = [
      {
        title: this.text.dashboard.vacationDays,
        value: '...',
        icon: 'calendar_today',
        route: '/vacation',
        color: 'primary'
      },
      {
        title: this.text.dashboard.hoursThisWeek,
        value: '...',
        icon: 'schedule',
        route: '/time-tracking',
        color: 'accent'
      },
      {
        title: this.text.dashboard.activeMembers,
        value: '...',
        icon: 'people',
        route: '/team',
        color: 'primary'
      },
      {
        title: this.text.dashboard.pendingRequests,
        value: '...',
        icon: 'pending_actions',
        route: '/vacation',
        color: 'warn'
      }
    ];
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Load vacation days
    this.employeeService.getMe().subscribe({
      next: (employee) => {
        this.stats[0].value = employee.vacation_days_available.toString();
      },
      error: (error) => {
        console.error('Error loading employee data:', error);
        // Fallback to first employee
        this.employeeService.getAll().subscribe({
          next: (employees) => {
            if (employees.length > 0) {
              this.stats[0].value = employees[0].vacation_days_available.toString();
            }
          }
        });
      }
    });

    // Load hours this week
    this.timeTrackingService.getWeeklyStats().subscribe({
      next: (weekStats) => {
        const totalHours = weekStats.reduce((sum, day) => sum + day.hours, 0);
        this.stats[1].value = totalHours.toFixed(1);
      },
      error: (error) => {
        console.error('Error loading time stats:', error);
        this.stats[1].value = '0';
      }
    });

    // Load active members
    this.employeeService.getStats().subscribe({
      next: (stats: EmployeeStats) => {
        this.stats[2].value = stats.active_today.toString();
      },
      error: (error) => {
        console.error('Error loading employee stats:', error);
        this.stats[2].value = '0';
      }
    });

    // Load pending requests
    this.vacationService.getAll().subscribe({
      next: (vacations) => {
        const pending = vacations.filter(v => v.status === 'pending').length;
        this.stats[3].value = pending.toString();
      },
      error: (error) => {
        console.error('Error loading vacation requests:', error);
        this.stats[3].value = '0';
      }
    });
  }
}
