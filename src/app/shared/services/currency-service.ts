import { Injectable,signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
    private usdToLbpRate = 89500;

  currency = signal<'USD' | 'LBP'>('USD');

  toggle() {
    this.currency.set(
      this.currency() === 'USD' ? 'LBP' : 'USD'
    );
  }

  convert(price: number) {
    if (this.currency() === 'USD') {
      return price;
    } else {
      return price * this.usdToLbpRate;
    }
  }

  format(price: number) {
    if (this.currency() === 'USD') {
      return `$${price.toFixed(2)}`;
    } else {
      return `${(price * this.usdToLbpRate).toLocaleString()} LBP`;
    }
  }
}
