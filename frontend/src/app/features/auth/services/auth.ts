import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  login(credentials: any) {
    return this.http.post('/auth/login', credentials);
  }

  register(credentials: any) {
    return this.http.post('/auth/register', credentials);
  }
}