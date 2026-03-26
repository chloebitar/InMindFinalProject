import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { Cart } from './cart';
import { CartService } from '../../shared/services/cart-service';
import { CurrencyService } from '../../shared/services/currency-service';
import { CheckoutSummary } from '../../shared/services/checkout-summary';

describe('Cart', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;

  const cartServiceMock = {
    items: signal([]),
    totalItems: () => 0,
    totalPrice: () => 0,
    remove: vi.fn(),
  };

  const currencyServiceMock = {
    currency: signal('USD'),
    convert: (price: number) => price,
    format: (price: number) => `$${price}`,
  };

  const checkoutSummaryMock = {
    subtotalText: () => '$0',
    deliveryFee: () => '$0',
    totalText: () => '$0',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: CheckoutSummary, useValue: checkoutSummaryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
