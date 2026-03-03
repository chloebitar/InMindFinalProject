import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth-services/auth-service';

export const adminGuard: CanActivateFn = (route, state) => {
    const auth = inject(AuthService);
    const router = inject(Router);

    const user = auth.user(); 

    if (user && user.role === 'admin') {
      return true;
    }

    router.navigate(['/']); 
    return false;
};
