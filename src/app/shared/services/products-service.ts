import { inject, Injectable } from '@angular/core';
import { IProduct } from '../../Interfaces/product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Products {
  http = inject(HttpClient);
  private baseUrl = 'https://fakestoreapi.com';
  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/products`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }

  getByCategory(category: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${this.baseUrl}/products/category/${encodeURIComponent(category)}`,
    );
  }

  getProductById(id: number) {
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`);
  }
}
