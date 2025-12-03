import { Component } from '@angular/core';
import { StatsCard } from '../stats-card/stats-card';
import { TextService } from '../../services/text';

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
export class Dashboard {
  text: TextService;
  stats: StatCard[];

  constructor(textService: TextService) {
    this.text = textService;

    this.stats = [
      {
        title: this.text.dashboard.vacationDays,
        value: '12',
        icon: 'calendar_today',
        route: '/vacation',
        color: 'primary'
      },
      {
        title: this.text.dashboard.hoursThisWeek,
        value: '40.5',
        icon: 'schedule',
        route: '/time-tracking',
        color: 'accent'
      },
      {
        title: this.text.dashboard.activeMembers,
        value: '8',
        icon: 'people',
        route: '/team',
        color: 'primary'
      },
      {
        title: this.text.dashboard.pendingRequests,
        value: '3',
        icon: 'pending_actions',
        route: '/requests',
        color: 'warn'
      }
    ];
  }
}
