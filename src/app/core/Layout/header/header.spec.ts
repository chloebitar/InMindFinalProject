import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

import { Header } from './header';
import { CartService } from '../../../shared/services/cart-service';
import { CurrencyService } from '../../../shared/services/currency-service';
import { AuthService } from '../../auth/auth-services/auth-service';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  const cartServiceMock = {
    items: signal([]),
    totalItems: () => 0,
    totalPrice: () => 0,
  };

  const authServiceMock = {
    isAuthenticated: signal(false),
    user: signal(null),
    logout: vi.fn(),
  };

  const currencyServiceMock = {
    toggle: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
