import { TestBed } from '@angular/core/testing';

import { CartService } from './cart-service';


describe('CartService', () => {
  let service: CartService;

  const product1 = {
    id: 1,
    title: 'Bag',
    price: 10,
    image: 'bag.jpg',
    category: 'fashion',
  };


  const product2={
    id:2,
    title:"test",
    price:20,
    image:"test",
    category:"test",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total price',()=>{
      service.add(product1,2)
      service.add(product2,3)
      const total = service.totalPrice();
      expect(total).toBe(80);
  })

  it('should calculate correct total',()=>{
    service.add(product1,2),
    service.dec(1)
    const total =service.totalPrice();
    expect(total).toBe(0);
  })

  
});
