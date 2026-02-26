import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../../Interfaces/cart-items';


const STORAGE_KEY = 'cart_items';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _items = signal<CartItem[]>(this.loadFromStorage());

  items = this._items.asReadonly();

  totalItems = computed(() => this._items().reduce((sum, item) => sum + item.qty, 0));

  totalPrice = computed(() => this._items().reduce((sum, item) => sum + item.price * item.qty, 0));

  constructor() {

    effect(() => {
      const value = this._items();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
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

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  }
}
