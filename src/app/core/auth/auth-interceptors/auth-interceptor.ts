import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);

  const token = cookieService.get('Authenticationtoken');

  const headers: Record<string, string> = {
    'ngrok-skip-browser-warning': 'true',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const authReq = req.clone({
    setHeaders: headers,
  });

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        cookieService.delete('Authenticationtoken', '/');
        router.navigate(['/login']);
      }

      if (err.status === 404) {
        router.navigate(['/not-found']);
      }

      return throwError(() => err);
    }),
  );
};
