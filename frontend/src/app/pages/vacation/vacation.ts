import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextService } from '../../services/text';
import { VacationService, VacationRequest, VacationRequestCreate } from '../../services/vacation';
import { EmployeeService, Employee } from '../../services/employee';

@Component({
  selector: 'app-vacation',
  imports: [CommonModule, FormsModule],
  templateUrl: './vacation.html',
  styleUrl: './vacation.scss',
})
export class Vacation implements OnInit {
  text: TextService;
  availableDays = 0;
  usedDays = 0;
  pendingRequests = 0;

  vacations: VacationRequest[] = [];
  loading = true;

  newRequest: VacationRequestCreate = {
    start_date: '',
    end_date: '',
    reason: ''
  };

  constructor(
    textService: TextService,
    private vacationService: VacationService,
    private employeeService: EmployeeService
  ) {
    this.text = textService;
  }

  ngOnInit() {
    this.loadEmployeeData();
    this.loadVacations();
  }

  loadEmployeeData() {
    this.employeeService.getMe().subscribe({
      next: (employee: Employee) => {
        this.availableDays = employee.vacation_days_available;
        this.usedDays = employee.vacation_days_used;
      },
      error: (error) => {
        console.error('Error loading employee data:', error);
        // Fallback to first employee if "me" endpoint fails
        this.employeeService.getAll().subscribe({
          next: (employees) => {
            if (employees.length > 0) {
              this.availableDays = employees[0].vacation_days_available;
              this.usedDays = employees[0].vacation_days_used;
            }
          }
        });
      }
    });
  }

  loadVacations() {
    this.vacationService.getAll().subscribe({
      next: (vacations: VacationRequest[]) => {
        this.vacations = vacations;
        this.pendingRequests = vacations.filter(v => v.status === 'pending').length;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading vacations:', error);
        this.loading = false;
      }
    });
  }

  submitRequest() {
    if (!this.newRequest.start_date || !this.newRequest.end_date) {
      alert('Bitte Start- und Enddatum auswählen');
      return;
    }

    this.vacationService.create(this.newRequest).subscribe({
      next: (vacation) => {
        this.vacations.unshift(vacation);
        this.pendingRequests++;
        this.newRequest = { start_date: '', end_date: '', reason: '' };
        alert('Urlaubsantrag erfolgreich erstellt');
      },
      error: (error) => {
        console.error('Error creating vacation request:', error);
        alert('Fehler beim Erstellen des Antrags');
      }
    });
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
