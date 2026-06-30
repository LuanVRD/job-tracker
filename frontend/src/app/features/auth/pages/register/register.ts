import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout';
import { ErrorBoxComponent } from '@app/shared/componentes/error-box/error-box';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AuthLayoutComponent,
    ErrorBoxComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.errorMessage.set(null);

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Cadastro efetuado com sucesso!');

        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message);
      }
    });
  }
}
