import { Component, inject } from '@angular/core';
import { CartService } from '../../shared/services/cart-service';
import { EmptyCart } from './empty-cart/empty-cart';
import { CartTotal } from './cart-total/cart-total';

@Component({
  selector: 'app-cart',
  imports: [EmptyCart, CartTotal],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cart = inject(CartService);
  removeFromCart(product: any) {
    this.cart.remove(product.id);
  }
}
