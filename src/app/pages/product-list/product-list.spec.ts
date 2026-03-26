import { ComponentFixture, TestBed } from '@angular/core/testing';
import { convertToParamMap, provideRouter, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProductList } from './product-list';
import { Products } from '../../shared/services/products-service';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  const productsServiceMock = {
    getAllProducts: () => of([]),
  };

  const activatedRouteMock = {
    queryParamMap: of(convertToParamMap({ cat: null })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [
        provideRouter([]),
        { provide: Products, useValue: productsServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
