import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal, inject, computed } from '@angular/core';
import { Products } from '../../shared/services/products-service';
import { IProduct } from '../../Interfaces/product-interface';
import { ProductCard } from './components/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  productsService = inject(Products);
  products: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });

  route = inject(ActivatedRoute);
  category = toSignal(this.route.queryParamMap.pipe(map((params) => params.get('cat'))), {
    initialValue: null,
  });

  filteredProducts = computed(() => {
    const category = this.category();
    const all = this.products();

    if (!category) return all;

    if (category === 'clothing') {
      return all.filter(
        (p) => p.category === "men's clothing" || p.category === "women's clothing",
      );
    }

    return all.filter((p) => p.category === category);
  });
}
