import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private readonly TOKEN_KEY = '@jobtracker/token';

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
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private handleAuthentication(response: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    this.currentUser.set({
      name: response.name,
      email: response.email
    })
  }
}