import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TextService } from '../../services/text';

export interface MemberFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  phone: string;
  department: string;
  role: string;
  avatar: string;
  vacation_days_total: number;
}

@Component({
  selector: 'app-add-member-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './add-member-dialog.html',
  styleUrl: './add-member-dialog.scss',
})
export class AddMemberDialog {
  text: TextService;

  formData: MemberFormData = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    phone: '',
    department: '',
    role: '',
    avatar: '',
    vacation_days_total: 30
  };

  departments = [
    'Engineering',
    'Product',
    'Design',
    'HR',
    'Marketing',
    'Sales',
    'Finance',
    'Operations'
  ];

  roles = [
    'Junior Developer',
    'Senior Developer',
    'Lead Developer',
    'Product Manager',
    'Designer',
    'UX Designer',
    'HR Manager',
    'Marketing Manager',
    'Sales Manager',
    'Accountant',
    'Operations Manager'
  ];

  errors = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    username: '',
    password: ''
  };

  constructor(
    textService: TextService,
    private dialogRef: MatDialogRef<AddMemberDialog>
  ) {
    this.text = textService;
  }

  validateFirstName() {
    if (this.formData.first_name.length > 0 && this.formData.first_name.length < 3) {
      this.errors.first_name = 'Mindestens 3 Zeichen';
    } else {
      this.errors.first_name = '';
    }
  }

  validateLastName() {
    if (this.formData.last_name.length > 0 && this.formData.last_name.length < 3) {
      this.errors.last_name = 'Mindestens 3 Zeichen';
    } else {
      this.errors.last_name = '';
    }
  }

  validatePhone() {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (this.formData.phone && !phoneRegex.test(this.formData.phone)) {
      this.errors.phone = 'Nur Zahlen, +, -, (, ) und Leerzeichen';
    } else {
      this.errors.phone = '';
    }
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.formData.email && !emailRegex.test(this.formData.email)) {
      this.errors.email = 'Ungültige E-Mail';
    } else {
      this.errors.email = '';
    }
  }

  validateUsername() {
    if (this.formData.username.length > 0 && this.formData.username.length < 3) {
      this.errors.username = 'Mindestens 3 Zeichen';
    } else {
      this.errors.username = '';
    }
  }

  validatePassword() {
    if (this.formData.password.length > 0 && this.formData.password.length < 6) {
      this.errors.password = 'Mindestens 6 Zeichen';
    } else {
      this.errors.password = '';
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    // Validate all fields
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateEmail();
    this.validateUsername();
    this.validatePassword();

    // Check for errors
    if (Object.values(this.errors).some(error => error !== '')) {
      alert('Bitte Fehler korrigieren');
      return;
    }

    // Check required fields
    if (!this.formData.username || !this.formData.email ||
        !this.formData.first_name || !this.formData.last_name ||
        !this.formData.password || !this.formData.department ||
        !this.formData.role) {
      alert('Bitte alle Pflichtfelder ausfüllen');
      return;
    }

    // Generate avatar if empty
    if (!this.formData.avatar) {
      this.formData.avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.formData.first_name}`;
    }

    this.dialogRef.close(this.formData);
  }
}
