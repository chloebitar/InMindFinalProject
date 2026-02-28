import {Component, Input,inject } from '@angular/core';
import { CartService } from '../../../../shared/services/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
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