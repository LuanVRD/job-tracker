import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  currentUser = signal<User | null>(null);

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>('/auth/login', credentials).pipe(
      tap((response) => this.handleAuthentication(response))
    );
  }

  register(credentials: RegisterRequest) {
    return this.http.post<AuthResponse>('/auth/register', credentials).pipe(
      tap((response) => this.handleAuthentication(response))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private handleAuthentication(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    this.currentUser.set({
      name: response.name,
      email: response.email
    })
  }
}