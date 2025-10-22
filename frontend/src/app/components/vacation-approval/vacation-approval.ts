import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VacationRequest {
  id: number;
  employee: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-vacation-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-approval.html',
  styleUrl: './vacation-approval.scss'
})
export class VacationApprovalComponent {
  requests: VacationRequest[] = [
    { id: 1, employee: 'Max Mustermann', startDate: new Date(2025, 10, 1), endDate: new Date(2025, 10, 5), reason: 'Familienurlaub', status: 'pending' },
    { id: 2, employee: 'Anna Schmidt', startDate: new Date(2025, 10, 15), endDate: new Date(2025, 10, 20), reason: 'Erholung', status: 'pending' },
  ];

  approve(id: number): void {
    const request = this.requests.find(r => r.id === id);
    if (request) request.status = 'approved';
    console.log('Genehmigt:', id);
  }

  reject(id: number): void {
    const request = this.requests.find(r => r.id === id);
    if (request) request.status = 'rejected';
    console.log('Abgelehnt:', id);
  }
}