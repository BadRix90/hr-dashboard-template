import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationRequestFormComponent } from '../../components/vacation-request-form/vacation-request-form';
import { VacationCalendarComponent } from '../../components/vacation-calendar/vacation-calendar';
import { VacationApprovalComponent } from '../../components/vacation-approval/vacation-approval';
import { VacationBalanceComponent } from '../../components/vacation-balance/vacation-balance';

@Component({
  selector: 'app-vacation',
  standalone: true,
  imports: [CommonModule, VacationRequestFormComponent, VacationCalendarComponent, VacationApprovalComponent, VacationBalanceComponent],
  templateUrl: './vacation.html',
  styleUrl: './vacation.scss'
})
export class VacationComponent {}