import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: LoginRequest) {
    return this.http.post<AuthResponse>('/auth/login', credentials);
  }

  register(credentials: RegisterRequest) {
    return this.http.post<AuthResponse>('/auth/register', credentials);
  }
}