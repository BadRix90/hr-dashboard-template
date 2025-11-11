import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService, UserCreate, UserRole } from '../../services/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Output() userCreated = new EventEmitter<void>();
  roles: UserRole[] = ['admin', 'manager', 'employee'];

  userForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    role: ['employee', Validators.required],
    department: [''],
    vacation_days: [30, [Validators.required, Validators.min(0)]]
  });

  getRoleLabel(role: UserRole): string {
    return { admin: 'Administrator', manager: 'Manager', employee: 'Mitarbeiter' }[role];
  }

  submitForm(): void {
    if (this.userForm.invalid) return;
    const userData: UserCreate = this.userForm.value;
    this.userService.createUser(userData).subscribe({
      next: () => {
        this.userCreated.emit();
        this.userForm.reset({ role: 'employee', vacation_days: 30 });
      },
      error: (err) => console.error('❌ Fehler:', err)
    });
  }
}