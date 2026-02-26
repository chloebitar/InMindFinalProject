import {Component, Input,inject } from '@angular/core';
import { CartService } from '../../../../shared/services/cart-service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: any;

  cart = inject(CartService);
  showOverlay = false;

  addToCart() {
    this.cart.add(this.product);
  }
}