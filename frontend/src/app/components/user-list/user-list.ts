import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Mitarbeiter';
  status: 'active' | 'inactive';
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent {
  users: User[] = [
    { id: 1, name: 'Max Mustermann', email: 'max@firma.de', role: 'Admin', status: 'active' },
    { id: 2, name: 'Anna Schmidt', email: 'anna@firma.de', role: 'Manager', status: 'active' },
    { id: 3, name: 'Tom Meyer', email: 'tom@firma.de', role: 'Mitarbeiter', status: 'active' },
  ];

  deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
    console.log('User gelöscht:', id);
  }
}