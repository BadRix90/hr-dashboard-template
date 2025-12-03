import { Component } from '@angular/core';
import { StatsCard } from '../stats-card/stats-card';

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
  stats: StatCard[] = [
    {
      title: 'Vacation Days',
      value: '12',
      icon: 'calendar_today',
      route: '/vacation',
      color: 'primary'
    },
    {
      title: 'Hours This Week',
      value: '40.5',
      icon: 'schedule',
      route: '/time-tracking',
      color: 'accent'
    },
    {
      title: 'Active Team Members',
      value: '8',
      icon: 'people',
      route: '/team',
      color: 'primary'
    },
    {
      title: 'Pending Requests',
      value: '3',
      icon: 'pending_actions',
      route: '/requests',
      color: 'warn'
    }
  ];
}
