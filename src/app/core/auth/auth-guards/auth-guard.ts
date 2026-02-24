import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth-services/auth-service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('AuthGuard called for route:', state.url);
  console.log('Current authentication status:', authService.isAuthenticated());
  if (!authService.isAuthenticated()) {
    console.log('User is not authenticated, redirecting to login');
    router.navigate(['/login']);
    return false;
  }
  return true;
};
