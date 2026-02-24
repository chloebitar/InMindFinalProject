import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: any;

  showOverlay = false;

  addToCart() {
    console.log('Added to cart:', this.product);
  }
}