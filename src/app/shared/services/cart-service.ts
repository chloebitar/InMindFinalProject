import { Injectable, signal, computed, effect,inject } from '@angular/core';
import { CartItem } from '../../Interfaces/cart-items';
import { AuthService } from '../../core/auth/auth-services/auth-service';



const storage_pref = 'cart_items';

@Injectable({ providedIn: 'root' })
export class CartService {
  auth = inject(AuthService);

  private storageKey = computed(() => {
    const uid = this.auth.user()?.id;
    return uid ? `${storage_pref}_${uid}` : `${storage_pref}_guest`;
  });

  private _items = signal<CartItem[]>(this.loadFromStorage(this.storageKey()));

  items = this._items.asReadonly();

  totalItems = computed(() => this._items().reduce((sum, item) => sum + item.qty, 0));

  totalPrice = computed(() => this._items().reduce((sum, item) => sum + item.price * item.qty, 0));

  private migrateGuestToUser(userId: number) {
    const guestKey = 'cart_items_guest';
    const userKey = `cart_items_${userId}`;

    const guestRaw = localStorage.getItem(guestKey);
    if (!guestRaw) return;

    const guest: CartItem[] = JSON.parse(guestRaw);

    const user: CartItem[] = JSON.parse(localStorage.getItem(userKey) || '[]');

    for (const g of guest) {
      const existing = user.find((u) => u.id === g.id);
      if (existing) existing.qty += g.qty;
      else user.push(g);
    }

    localStorage.setItem(userKey, JSON.stringify(user));
    localStorage.removeItem(guestKey);

    this._items.set(user);
  }

  constructor() {
    effect(() => {
      const uid = this.auth.user()?.id;

      if (uid) {
        this.migrateGuestToUser(uid);
      }

      const key = this.storageKey();
      this._items.set(this.loadFromStorage(key));
    });

    effect(() => {
      const key = this.storageKey();
      localStorage.setItem(key, JSON.stringify(this._items()));
    });
  }

  add(product: any, qty: number = 1) {
    const items = this._items();
    const existing = items.find((i) => i.id === product.id);

    if (existing) {
      this._items.set(items.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i)));
      return;
    }

    const newItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
      qty,
    };

    this._items.set([...items, newItem]);
  }

  remove(productId: number) {
    this._items.set(this._items().filter((i) => i.id !== productId));
  }

  inc(productId: number) {
    this._items.set(this._items().map((i) => (i.id === productId ? { ...i, qty: i.qty + 1 } : i)));
  }

  dec(productId: number) {
    this._items.set(
      this._items()
        .map((i) => (i.id === productId ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  }

  clear() {
    this._items.set([]);
  }

  private loadFromStorage(key: string): CartItem[] {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
