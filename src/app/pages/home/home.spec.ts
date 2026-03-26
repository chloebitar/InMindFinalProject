import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { signal } from '@angular/core';

import { Home } from './home';
import { Products } from '../../shared/services/products-service';
import { RecommendationsService } from '../../shared/services/recommendations-service';
import { CartService } from '../../shared/services/cart-service';
import { CurrencyService } from '../../shared/services/currency-service';
import { AuthService } from '../../core/auth/auth-services/auth-service';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  const productsServiceMock = {
    getAllProducts: () => of([]),
  };

  const recommendationsServiceMock = {
    getRecommended: () => [],
  };

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
      imports: [Home],
      providers: [
        provideRouter([]),
        { provide: Products, useValue: productsServiceMock },
        { provide: RecommendationsService, useValue: recommendationsServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
