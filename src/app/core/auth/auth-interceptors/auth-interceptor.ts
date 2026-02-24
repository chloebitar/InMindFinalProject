import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  if (token) {
    const AuthHeader = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(AuthHeader).pipe(
      catchError((err) => {
        if (err.status === 401) {
          authService.logout();
          router.navigate(['/login']);
        }
        if (err.status === 404) {
          router.navigate(['/not-found']);
        }
        return throwError(() => err);
      }),
    );
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        router.navigate(['/login']);
      }

      if (error.status === 404) {
        router.navigate(['/not-found']);
      }

      return throwError(() => error);
    }),
  );
};
