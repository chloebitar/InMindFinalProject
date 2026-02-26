import { Component, Signal , computed,inject} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from '../../products';
import { IProduct } from '../../Interfaces/product-interface';
import { ProductCard } from '../product-list/components/product-card/product-card';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
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
    {
      label: 'ELECTRONICS',
      category: 'electronics',
      image: 'assets/homePage/electronics.png',
    },
    {
      label: 'MEN',
      category: "men's clothing",
      image: 'assets/homePage/men-clothing.png',
    },
    {
      label: 'WOMEN',
      category: "women's clothing",
      image: 'assets/homePage/women-clothing.png',
    },
    {
      label: 'JEWELERY',
      category: 'jewelery',
      image: 'assets/homePage/jewelery.png',
    },
  ];

  private getTopCategoryFromCart(): string | null {
    const raw = localStorage.getItem('cart_items');
    if (!raw) return null;

    const items: any[] = JSON.parse(raw);
    if (!items.length) return null;

    const counts: Record<string, number> = {};
    for (const item of items) {
      if (!item.category) continue;
      counts[item.category] = (counts[item.category] ?? 0) + (item.qty ?? 1);
    }

    const entries = Object.entries(counts);
    if (!entries.length) return null;

    return entries.reduce((best, current) => (current[1] > best[1] ? current : best))[0];
  }

  topCategory: string | null = null;

  recommendedProducts = computed(() => {
    if (!this.topCategory) {
      return this.products().slice(0, 4);
    }

    return this.products()
      .filter((p) => p.category === this.topCategory)
      .slice(0, 4);
  });

  ngOnInit() {
    this.topCategory = this.getTopCategoryFromCart();
  }
}
