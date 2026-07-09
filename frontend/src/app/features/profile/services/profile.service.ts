import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CurrentUser } from '../models/current-user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getBasicData() {
    return this.http.get<CurrentUser>('/user/me');
  }
}