import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User, UserRole } from '../../services/user';
import { UserFormComponent } from '../user-form/user-form';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {
  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal(true);
  showUserForm = signal(false);
  selectedUser = signal<User | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
      }
    });
  }

  openUserForm(): void {
    this.selectedUser.set(null);
    this.showUserForm.set(true);
  }

  closeUserForm(): void {
    this.showUserForm.set(false);
    this.selectedUser.set(null);
  }

  onUserCreated(): void {
    this.closeUserForm();
    this.loadUsers();
  }

  editUser(user: User): void {
    this.selectedUser.set(user);
    this.showUserForm.set(true);
  }

  deleteUser(id: number): void {
    if (!confirm('Mitarbeiter wirklich löschen?')) return;
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.users.update(list => list.filter(u => u.id !== id));
      },
      error: (err) => console.error('Fehler beim Löschen:', err)
    });
  }

  getRoleLabel(role: UserRole): string {
    return { admin: 'Administrator', manager: 'Manager', employee: 'Mitarbeiter' }[role];
  }
}