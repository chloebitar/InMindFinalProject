import { Injectable, inject, signal, computed } from '@angular/core';
import { CartService } from './cart-service';
import { CurrencyService } from './currency-service';

@Injectable({
  providedIn: 'root',
})
export class CheckoutSummary {
  private cart = inject(CartService);
  private currency = inject(CurrencyService);

  deliveryFeeUsd = 3;

  subtotalUsd = computed(() => this.cart.totalPrice()); 
  totalUsd = computed(() => this.subtotalUsd() + this.deliveryFeeUsd);

  subtotalText = computed(() => this.currency.format(this.subtotalUsd()));
  deliveryText = computed(() => this.currency.format(this.deliveryFeeUsd));
  totalText = computed(() => this.currency.format(this.totalUsd()));
}
