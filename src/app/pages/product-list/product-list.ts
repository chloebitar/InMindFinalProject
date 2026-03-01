import { Component, signal  } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal, inject, computed } from '@angular/core';
import { Products } from '../../shared/services/products-service';
import { IProduct } from '../../Interfaces/product-interface';
import { ProductCard } from './components/product-card/product-card';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, UpperCasePipe],
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
  search = signal('');
  sortBy = signal<'featured' | 'price-asc' | 'price-desc' | 'title-asc'>('featured');

  setSearch(value: string) {
    this.search.set(value);
  }

  setSort(value: string) {
    this.sortBy.set(value as any);
  }

  filteredProducts = computed(() => {
    const category = this.category();
    const all = this.products();
    const q = this.search().trim().toLowerCase();
    const sort = this.sortBy();

    let list = !category
      ? all
      : category === 'clothing'
        ? all.filter((p) => p.category === "men's clothing" || p.category === "women's clothing")
        : all.filter((p) => p.category === category);

    if (q) {
      list = list.filter((p) => (p.title || '').toLowerCase().includes(q));
    }

    if (sort === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sort === 'title-asc') {
      list = [...list].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return list;
  });
}
