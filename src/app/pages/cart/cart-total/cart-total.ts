import { Component, inject } from '@angular/core';
import { CartService } from '../../../shared/services/cart-service';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-cart-total',
  imports: [DecimalPipe],
  templateUrl: './cart-total.html',
  styleUrl: './cart-total.scss',
})
export class CartTotal {
  cart = inject(CartService);

  deliveryFee = 3;

  subtotal = () => this.cart.totalPrice();
  total = () => this.subtotal() + this.deliveryFee;

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
