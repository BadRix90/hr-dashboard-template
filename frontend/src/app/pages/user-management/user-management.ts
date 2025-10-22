import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from '../../components/user-list/user-list';
import { UserFormComponent } from '../../components/user-form/user-form';
import { RoleManagerComponent } from '../../components/role-manager/role-manager';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserListComponent, UserFormComponent, RoleManagerComponent],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss'
})
export class UserManagementComponent {}