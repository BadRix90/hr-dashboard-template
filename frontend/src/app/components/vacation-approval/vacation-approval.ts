import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacationService, VacationRequest } from '../../services/vacation';

@Component({
  selector: 'app-vacation-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-approval.html',
  styleUrl: './vacation-approval.scss'
})
export class VacationApprovalComponent implements OnInit {
  private vacationService = inject(VacationService);
  
  requests: VacationRequest[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.vacationService.getVacationRequests().subscribe({
      next: (requests) => {
        this.requests = requests.filter(r => r.status === 'pending');
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading requests:', err);
        this.loading = false;
      }
    });
  }

  approveRequest(id: number): void {
    this.vacationService.approveVacationRequest(id).subscribe({
      next: () => {
        this.requests = this.requests.filter(r => r.id !== id);
      },
      error: (err) => console.error('Error approving request:', err)
    });
  }

  rejectRequest(id: number): void {
    const reason = prompt('Grund für Ablehnung:');
    if (!reason) return;

    this.vacationService.rejectVacationRequest(id, reason).subscribe({
      next: () => {
        this.requests = this.requests.filter(r => r.id !== id);
      },
      error: (err) => console.error('Error rejecting request:', err)
    });
  }
}