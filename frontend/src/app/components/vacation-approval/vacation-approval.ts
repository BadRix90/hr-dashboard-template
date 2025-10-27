import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VacationService, VacationRequest } from '../../services/vacation';

@Component({
  selector: 'app-vacation-approval',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacation-approval.html',
  styleUrl: './vacation-approval.scss'
})
export class VacationApprovalComponent {
  requests = signal<VacationRequest[]>([]);
  loading = signal(true);
  showRejectModal = signal(false);
  selectedRequestId = signal<number | null>(null);

  constructor(private vacationService: VacationService) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading.set(true);
    this.vacationService.getVacationRequests().subscribe({
      next: (data) => {
        this.requests.set(data.filter(r => r.status === 'pending'));
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Fehler beim Laden:', err);
        this.loading.set(false);
      }
    });
  }

  approveRequest(id: number, employeeName: string) {
    if (!confirm(`Urlaubsantrag von ${employeeName} genehmigen?`)) return;

    this.vacationService.approveVacationRequest(id).subscribe({
      next: () => {
        this.requests.update(reqs => reqs.filter(r => r.id !== id));
        alert('Antrag genehmigt!');
      },
      error: (err) => alert('Fehler beim Genehmigen')
    });
  }

  openRejectModal(id: number) {
    this.selectedRequestId.set(id);
    this.showRejectModal.set(true);
  }

  rejectRequest(reason: string) {
    const id = this.selectedRequestId();
    if (!id) return;

    this.vacationService.rejectVacationRequest(id, reason).subscribe({
      next: () => {
        this.requests.update(reqs => reqs.filter(r => r.id !== id));
        this.showRejectModal.set(false);
        alert('Antrag abgelehnt');
      },
      error: (err) => alert('Fehler beim Ablehnen')
    });
  }

  closeRejectModal() {
    this.showRejectModal.set(false);
    this.selectedRequestId.set(null);
  }
}