import { TestBed } from '@angular/core/testing';

import { CheckoutSummary } from './checkout-summary';

describe('CheckoutSummary', () => {
  let service: CheckoutSummary;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckoutSummary);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
