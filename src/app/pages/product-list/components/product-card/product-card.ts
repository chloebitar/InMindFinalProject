import {Component, Input,inject } from '@angular/core';
import { CartService } from '../../../../shared/services/cart-service';
import { RouterLink } from '@angular/router';
import { CurrencyService } from '../../../../shared/services/currency-service';

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
  currencyService = inject(CurrencyService);

  addToCart() {
    this.cart.add(this.product);
  }
}