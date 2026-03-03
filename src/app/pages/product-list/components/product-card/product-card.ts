import {Component, Input,inject } from '@angular/core';
import { CartService } from '../../../../shared/services/cart-service';
import { Router, RouterLink } from '@angular/router';
import { CurrencyService } from '../../../../shared/services/currency-service';
import { AuthService } from '../../../../core/auth/auth-services/auth-service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: any;
  authService = inject(AuthService);
  
  cart = inject(CartService);
  router = inject(Router);
  showOverlay = false;
  currencyService = inject(CurrencyService);

  // addToCart() {
  //   if (this.authService.isAuthenticated()) {
  //     this.cart.add(this.product);
  //   } else {
  //     this.router.navigate(['/login']);
  //   }
  // }
  addToCart() {
      this.cart.add(this.product);
    }
   
}