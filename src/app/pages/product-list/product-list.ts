import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Signal } from '@angular/core';
import { inject } from '@angular/core';
import { Products } from '../../products';
import { IProduct } from '../../Interfaces/product-interface';
import { ProductCard } from './components/product-card/product-card';


@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  productsService = inject(Products);
  products: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });
}




