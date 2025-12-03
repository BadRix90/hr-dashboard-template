import { Component } from '@angular/core';
import { TextService } from '../../services/text';

interface VacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  days: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.html',
  styleUrl: './vacation.scss',
})
export class Vacation {
  text: TextService;
  availableDays = 25;
  usedDays = 8;
  pendingRequests = 2;

  vacations: VacationRequest[] = [
    {
      id: 1,
      startDate: '2024-12-20',
      endDate: '2024-12-27',
      days: 5,
      status: 'approved'
    },
    {
      id: 2,
      startDate: '2025-01-15',
      endDate: '2025-01-19',
      days: 5,
      status: 'pending'
    },
    {
      id: 3,
      startDate: '2024-11-01',
      endDate: '2024-11-05',
      days: 3,
      status: 'approved'
    }
  ];

  constructor(textService: TextService) {
    this.text = textService;
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'pending': return this.text.vacation.status.pending;
      case 'approved': return this.text.vacation.status.approved;
      case 'rejected': return this.text.vacation.status.rejected;
      default: return status;
    }
  }
}
