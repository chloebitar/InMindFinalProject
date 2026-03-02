import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { CartService } from '../../../shared/services/cart-service';
import { CurrencyService } from '../../../shared/services/currency-service';
@Component({
  selector: 'app-cart-total',
  imports: [DecimalPipe],
  templateUrl: './cart-total.html',
  styleUrl: './cart-total.scss',
})
export class CartTotal {
  cart = inject(CartService);
  currency = inject(CurrencyService);

  deliveryFeeUsd = 3;

  subtotalUsd = () => this.cart.totalPrice();

  deliveryFeeDisplay = () => this.currency.convert(this.deliveryFeeUsd);

  totalDisplay = () => this.currency.convert(this.subtotalUsd() + this.deliveryFeeUsd);

  subtotalText = () => this.currency.format(this.subtotalUsd());
  deliveryText = () => this.currency.format(this.deliveryFeeUsd);
  totalText = () => this.currency.format(this.subtotalUsd() + this.deliveryFeeUsd);

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
