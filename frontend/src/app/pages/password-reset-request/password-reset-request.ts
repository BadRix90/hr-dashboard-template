import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  private apiUrl = environment.apiUrl;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.http.post(`${this.apiUrl}/api/password-reset/`, this.resetForm.value)
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