import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-reset-request',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './password-reset-request.html',
  styleUrl: './password-reset-request.scss'
})
export class PasswordResetRequestComponent {
  resetForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.http.post('http://localhost:8000/api/password-reset/', this.resetForm.value)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'Reset-Link wurde an Ihre E-Mail gesendet!';
            this.resetForm.reset();
          },
          error: () => {
            this.isLoading = false;
            this.errorMessage = 'E-Mail-Adresse nicht gefunden';
          }
        });
    }
  }
}