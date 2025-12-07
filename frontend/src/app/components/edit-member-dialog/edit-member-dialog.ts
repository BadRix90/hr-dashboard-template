import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TextService } from '../../services/text';

export interface EditMemberData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  vacation_days_total: number;
}

@Component({
  selector: 'app-edit-member-dialog',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './edit-member-dialog.html',
  styleUrl: './edit-member-dialog.scss',
})
export class EditMemberDialog {
  text: TextService;
  formData: EditMemberData;

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
    email: ''
  };

  constructor(
    textService: TextService,
    private dialogRef: MatDialogRef<EditMemberDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EditMemberData
  ) {
    this.text = textService;
    this.formData = { ...data };
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

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    // Validate all fields
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateEmail();

    // Check for errors
    if (Object.values(this.errors).some(error => error !== '')) {
      alert('Bitte Fehler korrigieren');
      return;
    }

    // Check required fields
    if (!this.formData.first_name || !this.formData.last_name ||
        !this.formData.email || !this.formData.department ||
        !this.formData.role) {
      alert('Bitte alle Pflichtfelder ausfüllen');
      return;
    }

    this.dialogRef.close(this.formData);
  }
}
