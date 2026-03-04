import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth-services/auth-service';
import { inject } from '@angular/core';

export const checkoutGuardGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService)
      const router = inject(Router);

      const user = auth.user();

      if (user ) {
        return true;
      }

      router.navigate(['/login']);
      return false;
};
