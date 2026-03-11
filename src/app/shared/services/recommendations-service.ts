import { Injectable, inject } from '@angular/core';
import { IProduct } from '../../Interfaces/product-interface';
import { AuthService } from '../../core/auth/auth-services/auth-service';
import { ICartItem } from '../../Interfaces/cart-items';

@Injectable({ providedIn: 'root' })
export class RecommendationsService {
  private auth = inject(AuthService);

  private readonly storagePref = 'cart_items';

  private getCartKey(): string {
    const uid = this.auth.user()?.id;
    return uid ? `${this.storagePref}_${uid}` : `${this.storagePref}_guest`;
  }

  private getCartItems(): ICartItem[] {
    try {
      const raw = localStorage.getItem(this.getCartKey());
      return raw ? (JSON.parse(raw) as ICartItem[]) : [];
    } catch {
      return [];
    }
  }

  getTopCategoryFromCart(): string | null {
    const items = this.getCartItems();
    if (!items.length) return null;

    const counts: Record<string, number> = {};
    for (const item of items) {
      if (!item.category) continue;
      counts[item.category] = (counts[item.category] ?? 0) + (item.qty ?? 1);
    }

    let bestCat: string | null = null;
    let bestCount = 0;

    for (const [cat, count] of Object.entries(counts)) {
      if (count > bestCount) {
        bestCount = count;
        bestCat = cat;
      }
    }

    return bestCat;
  }

  getRecommended(products: IProduct[], limit = 4): IProduct[] {
    const top = this.getTopCategoryFromCart();
    if (!top) return products.slice(0, limit);
    return products.filter((p) => p.category === top).slice(0, limit);
  }
}
