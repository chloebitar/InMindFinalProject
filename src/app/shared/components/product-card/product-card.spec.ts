import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { ProductCard } from './product-card';
import { CartService } from '../../services/cart-service';
import { CurrencyService } from '../../services/currency-service';
import { AuthService } from '../../../core/auth/auth-services/auth-service';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const cartServiceMock = {
    add: vi.fn(),
    items: signal([]),
    totalItems: () => 0,
    totalPrice: () => 0,
  };

  const currencyServiceMock = {
    currency: signal('USD'),
    convert: (price: number) => price,
    format: (price: number) => `$${price}`,
  };

  const authServiceMock = {
    isAuthenticated: signal(false),
    user: signal(null),
    logout: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;

    component.product = {
      id: 1,
      title: 'Test Product',
      price: 10,
      image: 'test.jpg',
      category: 'electronics',
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
