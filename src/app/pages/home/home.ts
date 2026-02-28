import { Component, Signal, computed, inject, signal, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from '../../shared/services/products-service';
import { IProduct } from '../../Interfaces/product-interface';
import { ProductCard } from '../product-list/components/product-card/product-card';
import { Router, RouterLink } from '@angular/router';
import { RecommendationsService } from '../../shared/services/recommendations-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  productsService = inject(Products);

  products: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });

  goToProducts() {
    this.router.navigate(['/products']);
  }

  categories = [
    { label: 'ELECTRONICS', category: 'electronics', image: 'assets/homePage/electronics.png' },
    { label: 'MEN', category: "men's clothing", image: 'assets/homePage/men-clothing.png' },
    { label: 'WOMEN', category: "women's clothing", image: 'assets/homePage/women-clothing.png' },
    { label: 'JEWELERY', category: 'jewelery', image: 'assets/homePage/jewelery.png' },
  ];

  reco = inject(RecommendationsService);

  recommendedProducts = computed(() => {
    return this.reco.getRecommended(this.products(), 4);
  });
}
