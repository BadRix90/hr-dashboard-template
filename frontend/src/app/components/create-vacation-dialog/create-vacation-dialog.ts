import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextService } from '../../services/text';

export interface CreateVacationData {
  employee_id: number;
  available_days: number;
}

export interface VacationFormData {
  start_date: string;
  end_date: string;
  reason: string;
  employee_id: number;
}

@Component({
  selector: 'app-create-vacation-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-vacation-dialog.html',
  styleUrl: './create-vacation-dialog.scss',
})
export class CreateVacationDialog {
  text: TextService;

  startDate: Date | null = null;
  endDate: Date | null = null;
  reason = '';

  calculatedDays = 0;
  minDate = new Date();

  errors = {
    start_date: '',
    end_date: '',
    days: ''
  };

  constructor(
    textService: TextService,
    private dialogRef: MatDialogRef<CreateVacationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CreateVacationData
  ) {
    this.text = textService;
  }

  onStartDateChange() {
    this.validateDates();
    this.calculateDays();
  }

  onEndDateChange() {
    this.validateDates();
    this.calculateDays();
  }

  validateDates() {
    this.errors.start_date = '';
    this.errors.end_date = '';
    this.errors.days = '';

    if (this.startDate && this.startDate < this.minDate) {
      this.errors.start_date = 'Datum darf nicht in der Vergangenheit liegen';
    }

    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      this.errors.end_date = 'Enddatum muss nach Startdatum liegen';
    }
  }

  calculateDays() {
    if (!this.startDate || !this.endDate) {
      this.calculatedDays = 0;
      return;
    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    // Calculate business days (excluding weekends)
    let days = 0;
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday or Saturday
        days++;
      }
      current.setDate(current.getDate() + 1);
    }

    this.calculatedDays = days;

    // Check if enough vacation days available
    if (this.calculatedDays > this.data.available_days) {
      this.errors.days = `Nicht genug Urlaubstage verfügbar (${this.data.available_days} Tage)`;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.validateDates();

    // Check for errors
    if (Object.values(this.errors).some(error => error !== '')) {
      return;
    }

    // Check required fields
    if (!this.startDate || !this.endDate) {
      return;
    }

    if (this.calculatedDays === 0) {
      this.errors.days = 'Mindestens 1 Urlaubstag erforderlich';
      return;
    }

    if (this.calculatedDays > this.data.available_days) {
      return;
    }

    const formData: VacationFormData = {
      start_date: this.formatDate(this.startDate),
      end_date: this.formatDate(this.endDate),
      reason: this.reason,
      employee_id: this.data.employee_id
    };

    this.dialogRef.close(formData);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
