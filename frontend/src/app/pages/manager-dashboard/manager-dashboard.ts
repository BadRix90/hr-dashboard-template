import { Component } from '@angular/core';
import { TeamOverviewComponent } from '../../components/team-overview/team-overview';
import { OvertimeTrackerComponent } from '../../components/overtime-tracker/overtime-tracker';
import { ExportCsvComponent } from '../../components/export-csv/export-csv';
import { VacationApprovalComponent } from '../../components/vacation-approval/vacation-approval';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [
    TeamOverviewComponent,
    OvertimeTrackerComponent,
    ExportCsvComponent,
    VacationApprovalComponent
  ],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.scss'
})
export class ManagerDashboardComponent {}