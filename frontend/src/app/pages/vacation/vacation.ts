import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TextService } from '../../services/text';
import { VacationService, VacationRequest } from '../../services/vacation';
import { EmployeeService, Employee } from '../../services/employee';
import { CreateVacationDialog, VacationFormData } from '../../components/create-vacation-dialog/create-vacation-dialog';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-vacation',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './vacation.html',
  styleUrl: './vacation.scss',
})
export class Vacation implements OnInit {
  text: TextService;
  availableDays = 0;
  usedDays = 0;
  pendingRequests = 0;
  employeeId = 0;

  vacations: VacationRequest[] = [];
  loading = true;

  constructor(
    textService: TextService,
    private vacationService: VacationService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toast: ToastService
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
        this.employeeId = employee.id;
      },
      error: (error) => {
        console.error('Error loading employee data:', error);
        // Fallback to first employee
        this.employeeService.getAll().subscribe({
          next: (employees: Employee[]) => {
            if (employees.length > 0) {
              const emp = employees[0];
              this.availableDays = emp.vacation_days_available;
              this.usedDays = emp.vacation_days_used;
              this.employeeId = emp.id;
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

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateVacationDialog, {
      width: '600px',
      data: {
        employee_id: this.employeeId,
        available_days: this.availableDays
      }
    });

    dialogRef.afterClosed().subscribe((result: VacationFormData) => {
      if (result) {
        this.createVacationRequest(result);
      }
    });
  }

  createVacationRequest(data: VacationFormData) {
    this.vacationService.create(data).subscribe({
      next: () => {
        this.loadVacations();
        this.loadEmployeeData();
        this.toast.success('Urlaubsantrag erfolgreich gestellt');
      },
      error: (error) => {
        console.error('Error creating vacation request:', error);
        this.toast.error('Fehler beim Erstellen des Urlaubsantrags');
      }
    });
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'pending': return 'Ausstehend';
      case 'approved': return 'Genehmigt';
      case 'rejected': return 'Abgelehnt';
      default: return status;
    }
  }
}
