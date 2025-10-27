import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardsComponent } from '../../components/stats-cards/stats-cards';
import { TimerComponent } from '../../components/timer/timer';
import { TimeEntryListComponent } from '../../components/time-entry-list/time-entry-list';
import { VacationBalanceComponent } from '../../components/vacation-balance/vacation-balance';
import { ProjectListComponent } from '../../components/project-list/project-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardsComponent,
    TimerComponent,
    TimeEntryListComponent,
    VacationBalanceComponent,
    ProjectListComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {}