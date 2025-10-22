import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService, UserCreateRequest } from '../../services/user';
import { UserRole } from '../../services/auth';

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

  roles: UserRole[] = ['Admin', 'Manager', 'Mitarbeiter'];
  
  userForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['Mitarbeiter', Validators.required],
    department: [''],
    vacation_days: [30, [Validators.required, Validators.min(0)]]
  });

  submitForm(): void {
    if (this.userForm.invalid) return;

    const userData: UserCreateRequest = this.userForm.value;

    this.userService.createUser(userData).subscribe({
      next: () => {
        alert('User erfolgreich erstellt!');
        this.userForm.reset({ role: 'Mitarbeiter', vacation_days: 30 });
      },
      error: (err) => console.error('Error creating user:', err)
    });
  }
}