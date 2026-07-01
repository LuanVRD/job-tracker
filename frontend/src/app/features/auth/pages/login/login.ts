import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from "../../components/auth-layout/auth-layout";
import { ErrorBoxComponent } from "@app/shared/componentes/error-box/error-box";
import { PasswordInputComponent } from '@app/shared/componentes/password-input/password-input';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthLayoutComponent,
    ErrorBoxComponent,
    PasswordInputComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  loginForm: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.errorMessage.set(null);

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message);
      }
    });
  }
}
