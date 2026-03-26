import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

import { CartTotal } from './cart-total';
import { CartService } from '../../../shared/services/cart-service';
import { CurrencyService } from '../../../shared/services/currency-service';
import { CheckoutSummary } from '../../../shared/services/checkout-summary';

describe('CartTotal', () => {
  let component: CartTotal;
  let fixture: ComponentFixture<CartTotal>;

  const cartServiceMock = {
    items: signal([]),
    totalPrice: () => 0,
    totalItems: () => 0,
  };

  const currencyServiceMock = {
    currency: signal('USD'),
    convert: (price: number) => price,
    format: (price: number) => `$${price}`,
  };

  const checkoutSummaryMock = {
    subtotalText: () => '$0',
    deliveryText: () => '$0',
    totalText: () => '$0',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartTotal],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: CheckoutSummary, useValue: checkoutSummaryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartTotal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
