import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserForm {
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Mitarbeiter';
  password: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserFormComponent {
  user: UserForm = {
    name: '',
    email: '',
    role: 'Mitarbeiter',
    password: ''
  };

  roles = ['Admin', 'Manager', 'Mitarbeiter'];

  submitForm(): void {
    console.log('User erstellt:', this.user);
    this.resetForm();
  }

  resetForm(): void {
    this.user = { name: '', email: '', role: 'Mitarbeiter', password: '' };
  }
}