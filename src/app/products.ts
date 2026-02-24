import { inject, Injectable } from '@angular/core';
import { IProduct } from './Interfaces/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Products {
  http=inject(HttpClient);
  getAllProducts() : Observable<IProduct[]> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products');
  }
}
