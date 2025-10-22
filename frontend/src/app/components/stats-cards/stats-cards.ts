import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as LucideIcons from 'lucide-angular';
import { TimeTrackingService } from '../../services/time-tracking';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, LucideIcons.LucideAngularModule],
  templateUrl: './stats-cards.html',
  styleUrl: './stats-cards.scss'
})
export class StatsCardsComponent implements OnInit {
  private timeTrackingService = inject(TimeTrackingService);

  icons = {
    clock: LucideIcons.Clock,
    list: LucideIcons.List,
    trendingUp: LucideIcons.TrendingUp,
    arrowUp: LucideIcons.ArrowUp,
    arrowDown: LucideIcons.ArrowDown
  };

  stats: StatCard[] = [
    {
      title: 'Heute',
      value: '0h 0min',
      change: '+0%',
      trend: 'neutral',
      icon: this.icons.clock
    },
    {
      title: 'Diese Woche',
      value: '0h 0min',
      change: '+0%',
      trend: 'neutral',
      icon: this.icons.trendingUp
    },
    {
      title: 'Einträge',
      value: '0',
      change: '+0',
      trend: 'neutral',
      icon: this.icons.list
    }
  ];

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.timeTrackingService.getTimeEntries().subscribe({
      next: (entries) => {
        const total = entries.reduce((sum, e) => sum + e.duration_minutes, 0);
        const hours = Math.floor(total / 60);
        const mins = total % 60;
        
        this.stats[2].value = entries.length.toString();
        // Weitere Berechnungen für heute/Woche später
      },
      error: (err) => console.error('Error loading stats:', err)
    });
  }
}