import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RolePermission {
  role: string;
  canEditTime: boolean;
  canApproveVacation: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
}

@Component({
  selector: 'app-role-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-manager.html',
  styleUrl: './role-manager.scss'
})
export class RoleManagerComponent {
  roles: RolePermission[] = [
    { role: 'Admin', canEditTime: true, canApproveVacation: true, canManageUsers: true, canViewReports: true },
    { role: 'Manager', canEditTime: true, canApproveVacation: true, canManageUsers: false, canViewReports: true },
    { role: 'Mitarbeiter', canEditTime: true, canApproveVacation: false, canManageUsers: false, canViewReports: false },
  ];

  togglePermission(role: string, permission: keyof RolePermission): void {
    const roleObj = this.roles.find(r => r.role === role);
    if (roleObj && permission !== 'role') {
      (roleObj[permission] as boolean) = !(roleObj[permission] as boolean);
    }
  }
}