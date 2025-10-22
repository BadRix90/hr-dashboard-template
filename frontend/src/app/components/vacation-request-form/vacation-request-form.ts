import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface VacationRequest {
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-vacation-request-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacation-request-form.html',
  styleUrl: './vacation-request-form.scss'
})
export class VacationRequestFormComponent {
  request: VacationRequest = {
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  };

  submitRequest(): void {
    if (!this.request.startDate || !this.request.endDate) {
      alert('Bitte alle Felder ausfüllen');
      return;
    }
    console.log('Urlaubsantrag:', this.request);
    this.resetForm();
  }

  resetForm(): void {
    this.request = {
      startDate: '',
      endDate: '',
      reason: '',
      status: 'pending'
    };
  }
}