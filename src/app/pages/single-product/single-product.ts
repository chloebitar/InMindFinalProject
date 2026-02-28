import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { computed, Signal } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Products } from '../../shared/services/products-service';
import { CartService } from '../../shared/services/cart-service';
import { IProduct } from '../../Interfaces/product-interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../product-list/components/product-card/product-card';
import { RecommendationsService } from '../../shared/services/recommendations-service';

@Component({
  selector: 'app-single-product',
  imports: [ProductCard],
  templateUrl: './single-product.html',
  styleUrl: './single-product.scss',
  standalone: true,
})
export class SingleProduct {
  private route = inject(ActivatedRoute);
  private productsService = inject(Products);
  private cartService = inject(CartService);

  product: Signal<IProduct | null> = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.productsService.getProductById(id)),
    ),
    { initialValue: null },
  );

  products: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });

  recommendedProducts = computed(() => {
    const current = this.product();
    const all = this.products();

    if (!current) return [];

    return all.filter((p) => p.category === current.category && p.id !== current.id).slice(0, 3);
  });

  addToCart() {
    const p = this.product();
    if (!p) return;
    this.cartService.add(p, 1);
  }

  shareProduct() {
    const p = this.product();
    if (!p) return;

    const url = `${location.origin}/products/${p.id}`;

    if (navigator.share) {
      navigator.share({
        title: p.title,
        text: 'Check this product:',
        url,
      });
      return;
    }

    navigator.clipboard.writeText(url);
    alert('Link copied!');
  }
}
