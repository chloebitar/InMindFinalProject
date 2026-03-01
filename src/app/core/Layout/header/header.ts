import { Component,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart-service';
import { CurrencyService } from '../../../shared/services/currency-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  cart = inject(CartService);
  currencyService = inject(CurrencyService);

  toggleCurrency() {
    this.currencyService.toggle();
  }
}
