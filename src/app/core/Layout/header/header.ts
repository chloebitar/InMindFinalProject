import { Component,inject ,signal} from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { CartService } from '../../../shared/services/cart-service';
import { CurrencyService } from '../../../shared/services/currency-service';
import { AuthService } from '../../auth/auth-services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cart = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);
  currencyService = inject(CurrencyService);

  menuOpen = signal(false);

  onProfileClick() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.menuOpen.update((v) => !v);
  }

  logout() {
    this.menuOpen.set(false);
    this.authService.logout();
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  toggleCurrency() {
    this.currencyService.toggle();
  }
}
