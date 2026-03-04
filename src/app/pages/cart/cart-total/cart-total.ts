import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart-service';
import { CurrencyService } from '../../../shared/services/currency-service';
import { RouterLink } from '@angular/router';
import { CheckoutSummary } from '../../../shared/services/checkout-summary';
@Component({
  selector: 'app-cart-total',
  imports: [RouterLink],
  templateUrl: './cart-total.html',
  styleUrl: './cart-total.scss',
})
export class CartTotal {
  cart = inject(CartService);
  currency = inject(CurrencyService);
  summary=inject(CheckoutSummary)
  

  inc(id: number) {
    this.cart.inc(id);
  }
  dec(id: number) {
    this.cart.dec(id);
  }
  remove(id: number) {
    this.cart.remove(id);
  }
  clear() {
    this.cart.clear();
  }

  
}
