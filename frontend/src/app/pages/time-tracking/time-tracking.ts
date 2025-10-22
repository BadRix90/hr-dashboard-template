import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from '../../components/timer/timer';
import { TimeEntryFormComponent } from '../../components/time-entry-form/time-entry-form';
import { TimeEntryListComponent } from '../../components/time-entry-list/time-entry-list';

@Component({
  selector: 'app-time-tracking',
  standalone: true,
  imports: [CommonModule, TimerComponent, TimeEntryFormComponent, TimeEntryListComponent],
  templateUrl: './time-tracking.html',
  styleUrl: './time-tracking.scss'
})
export class TimeTrackingComponent {}