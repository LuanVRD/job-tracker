import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/features/auth/services/auth';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const baseUrl = 'http://localhost:5001/api'
  const token = localStorage.getItem(authService.TOKEN_KEY);

  const isAuthUrl = () => {
    return req.url.includes(authService.AUTH_PATH);
  };

  let cloneReq = req.clone({
    url: req.url.startsWith('/') ? `${baseUrl}${req.url}` : req.url,
  });

  if (!isAuthUrl() && token) {
    cloneReq = cloneReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloneReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!isAuthUrl() && error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
