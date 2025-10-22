import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-password-reset-confirm',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './password-reset-confirm.html',
  styleUrl: './password-reset-confirm.scss'
})
export class PasswordResetConfirmComponent implements OnInit {
  confirmForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  token = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.confirmForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];
  }

  onSubmit(): void {
    if (this.confirmForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';

      const payload = { token: this.token, password: this.confirmForm.value.password };

      this.http.post('http://localhost:8000/api/password-reset/confirm/', payload)
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.successMessage = 'Passwort erfolgreich geändert!';
            setTimeout(() => this.router.navigate(['/login']), 2000);
          },
          error: () => {
            this.isLoading = false;
            this.errorMessage = 'Ungültiger oder abgelaufener Token';
          }
        });
    }
  }
}