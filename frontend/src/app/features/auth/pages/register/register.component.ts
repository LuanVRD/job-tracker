import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/core/auth/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthLayoutComponent } from '../../components/auth-layout/auth-layout.component';
import { ErrorBoxComponent } from '@app/shared/components/error-box/error-box.component';
import { PasswordInputComponent } from '@app/shared/components/password-input/password-input.component';
import { passwordMatchValidator } from '@app/shared/validators/password-match.validator';
import { LoadingButtonComponent } from "@app/shared/components/loading-button/loading-button.component";

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    AuthLayoutComponent,
    ErrorBoxComponent,
    PasswordInputComponent,
    LoadingButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal<string | null>(null);
  loading = signal(false);

  registerForm: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(6)]]
  }, { validators: passwordMatchValidator });

  ngOnInit() {
    this.setupFormListeners();
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.errorMessage.set(null);

    this.loading.set(true);

    const { passwordConfirm, ...payload } = this.registerForm.getRawValue();

    this.authService.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage.set(error.error?.message);
        this.loading.set(false);
      }
    });
  }

  private setupFormListeners() {
    this.registerForm.valueChanges.subscribe(() => {
      const passwordControl = this.registerForm.get('password');
      const confirmControl = this.registerForm.get('passwordConfirm');

      if (passwordControl?.hasError('minlength') && passwordControl?.dirty) {
        this.errorMessage.set('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      if (this.registerForm.hasError('mismatch') && confirmControl?.dirty) {
        this.errorMessage.set('As senhas não coincidem!');
      } else {
        this.errorMessage.set(null);
      }
    });
  }
}
