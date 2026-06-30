import { HttpInterceptorFn } from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = 'http://localhost:5001/api'
  const token = localStorage.getItem('token');

  let cloneReq = req.clone({
    url: req.url.startsWith('/') ? `${baseUrl}${req.url}` : req.url,
  });

  if (token) {
    cloneReq = cloneReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloneReq);
};
