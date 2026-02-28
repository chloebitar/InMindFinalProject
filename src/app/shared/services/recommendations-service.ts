import { Injectable } from '@angular/core';
import { IProduct } from '../../Interfaces/product-interface';

@Injectable({ providedIn: 'root' })
export class RecommendationsService {
  private readonly CART_KEY = 'cart_items';

  getTopCategoryFromCart(): string | null {
    const raw = localStorage.getItem(this.CART_KEY);
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

  getRecommended(products: IProduct[], limit = 4): IProduct[] {
    const top = this.getTopCategoryFromCart();
    if (!top) return products.slice(0, limit);
    return products.filter((p) => p.category === top).slice(0, limit);
  }
}
