import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TextService } from '../../services/text';
import { EmployeeService, Employee, EmployeeStats } from '../../services/employee';
import { AddMemberDialog, MemberFormData } from '../../components/add-member-dialog/add-member-dialog';
import { ViewMemberDialog, MemberData } from '../../components/view-member-dialog/view-member-dialog';
import { EditMemberDialog, EditMemberData } from '../../components/edit-member-dialog/edit-member-dialog';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: 'online' | 'offline';
  hoursThisWeek: number;
  vacationDays: number;
  email: string;
  phone: string;
  user_id: number;
  first_name: string;
  last_name: string;
  vacation_days_total: number;
}

interface Department {
  name: string;
  count: number;
}

@Component({
  selector: 'app-team',
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team implements OnInit {
  text: TextService;
  searchTerm = '';
  totalMembers = 0;
  activeToday = 0;
  onVacation = 0;

  members: TeamMember[] = [];
  departments: Department[] = [];
  loading = true;

  constructor(
    textService: TextService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {
    this.text = textService;
  }

  ngOnInit() {
    this.loadEmployees();
    this.loadStats();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe({
      next: (employees: Employee[]) => {
        this.members = employees.map(emp => ({
          id: emp.id,
          name: `${emp.user.first_name} ${emp.user.last_name}`,
          role: emp.role,
          department: emp.department,
          avatar: emp.avatar,
          status: 'online' as const,
          hoursThisWeek: 0,
          vacationDays: emp.vacation_days_available,
          email: emp.user.email,
          phone: emp.phone,
          user_id: emp.user.id,
          first_name: emp.user.first_name,
          last_name: emp.user.last_name,
          vacation_days_total: emp.vacation_days_total
        }));
        this.calculateDepartments();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  loadStats() {
    this.employeeService.getStats().subscribe({
      next: (stats: EmployeeStats) => {
        this.totalMembers = stats.total_members;
        this.activeToday = stats.active_today;
        this.onVacation = stats.on_vacation;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  calculateDepartments() {
    const deptMap = new Map<string, number>();

    this.members.forEach(member => {
      const count = deptMap.get(member.department) || 0;
      deptMap.set(member.department, count + 1);
    });

    this.departments = Array.from(deptMap.entries()).map(([name, count]) => ({
      name,
      count
    }));
  }

  get filteredMembers(): TeamMember[] {
    if (!this.searchTerm) {
      return this.members;
    }

    const term = this.searchTerm.toLowerCase();
    return this.members.filter(member =>
      member.name.toLowerCase().includes(term) ||
      member.role.toLowerCase().includes(term) ||
      member.department.toLowerCase().includes(term)
    );
  }

  addMember() {
    const dialogRef = this.dialog.open(AddMemberDialog, {
      width: '600px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((result: MemberFormData) => {
      if (result) {
        this.createEmployee(result);
      }
    });
  }

  createEmployee(data: MemberFormData) {
    this.http.post(`${environment.apiUrl}/employees/create_with_user/`, data).subscribe({
      next: (employee: any) => {
        console.log('Employee created:', employee);
        this.loadEmployees();
        this.loadStats();
        alert('Mitarbeiter erfolgreich erstellt');
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        alert('Fehler beim Erstellen des Mitarbeiters');
      }
    });
  }

  viewMember(id: number) {
    const member = this.members.find(m => m.id === id);
    if (!member) return;

    const memberData: MemberData = {
      id: member.id,
      name: member.name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      role: member.role,
      avatar: member.avatar,
      vacationDays: member.vacationDays,
      hoursThisWeek: member.hoursThisWeek
    };

    const dialogRef = this.dialog.open(ViewMemberDialog, {
      width: '600px',
      data: memberData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'edit') {
        this.editMember(id);
      }
    });
  }

  editMember(id: number) {
    const member = this.members.find(m => m.id === id);
    if (!member) return;

    const editData: EditMemberData = {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      role: member.role,
      vacation_days_total: member.vacation_days_total
    };

    const dialogRef = this.dialog.open(EditMemberDialog, {
      width: '600px',
      data: editData
    });

    dialogRef.afterClosed().subscribe((result: EditMemberData) => {
      if (result) {
        this.updateEmployee(result);
      }
    });
  }

  updateEmployee(data: EditMemberData) {
    const updatePayload = {
      user: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email
      },
      phone: data.phone,
      department: data.department,
      role: data.role,
      vacation_days_total: data.vacation_days_total
    };

    this.http.patch(`${environment.apiUrl}/employees/${data.id}/update_with_user/`, updatePayload).subscribe({
      next: () => {
        this.loadEmployees();
        alert('Mitarbeiter erfolgreich aktualisiert');
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        alert('Fehler beim Aktualisieren des Mitarbeiters');
      }
    });
  }

  deleteMember(id: number) {
    if (!confirm('Mitarbeiter wirklich löschen?')) return;

    this.employeeService.delete(id).subscribe({
      next: () => {
        this.loadEmployees();
        this.loadStats();
        alert('Mitarbeiter gelöscht');
      },
      error: (error) => {
        console.error('Error deleting employee:', error);
        alert('Fehler beim Löschen');
      }
    });
  }
}
