import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VacationService, VacationType, VacationRequest } from '../../services/vacation';

@Component({
  selector: 'app-vacation-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vacation-request-form.html',
  styleUrl: './vacation-request-form.scss'
})
export class VacationRequestFormComponent {
  private fb = inject(FormBuilder);
  private vacationService = inject(VacationService);

  types: VacationType[] = ['urlaub', 'krank', 'sonderurlaub'];
  
  vacationForm: FormGroup = this.fb.group({
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
    type: ['urlaub', Validators.required],
    reason: ['']
  });

  calculateDays(): number {
    const form = this.vacationForm.value;
    if (!form.start_date || !form.end_date) return 0;
    return this.vacationService.calculateVacationDays(form.start_date, form.end_date);
  }

  onSubmit(): void {
    if (this.vacationForm.invalid) return;

    const days = this.calculateDays();
    if (days <= 0) {
      alert('Enddatum muss nach Startdatum liegen!');
      return;
    }

    const request: VacationRequest = {
      ...this.vacationForm.value,
      employee_id: 1,
      days: days,
      status: 'pending' as const
    };

    this.vacationService.createVacationRequest(request).subscribe({
      next: () => {
        alert('Urlaubsantrag erfolgreich gestellt!');
        this.vacationForm.reset({ type: 'urlaub' });
      },
      error: (err) => console.error('Error creating vacation request:', err)
    });
  }

  getDays(): string {
    const days = this.calculateDays();
    return days > 0 ? `${days} Tage` : '0 Tage';
  }
}