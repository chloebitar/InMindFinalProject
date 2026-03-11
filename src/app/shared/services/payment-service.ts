import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPaymentMethod } from '../../Interfaces/payment-method';

@Injectable({
  providedIn: 'root',
})
export class Payment {
  private http = inject(HttpClient);

  methods$ = this.http.get<IPaymentMethod[]>('assets/data/payment-methods.json');
}
