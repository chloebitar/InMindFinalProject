import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { SingleProduct } from './single-product';
import { Products } from '../../shared/services/products-service';
import { CartService } from '../../shared/services/cart-service';
import { CurrencyService } from '../../shared/services/currency-service';

describe('SingleProduct', () => {
  let component: SingleProduct;
  let fixture: ComponentFixture<SingleProduct>;

  const productMock = {
    id: 1,
    title: 'Test Product',
    price: 10,
    description: 'Test description',
    category: 'electronics',
    image: 'test.jpg',
  };

  const productsServiceMock = {
    getProductById: () => of(productMock),
    getAllProducts: () => of([]),
  };

  const cartServiceMock = {
    add: vi.fn(),
  };

  const currencyServiceMock = {
    convert: (price: number) => price,
    format: (price: number) => `$${price}`,
  };

  const activatedRouteMock = {
    paramMap: of(convertToParamMap({ id: '1' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProduct],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Products, useValue: productsServiceMock },
        { provide: CartService, useValue: cartServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
