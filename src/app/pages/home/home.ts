import { Component } from '@angular/core';
import { Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from '../../products';
import { inject } from '@angular/core';
import { IProduct } from '../../Interfaces/product-interface';
import { ProductCard } from '../product-list/components/product-card/product-card';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ICategoryTile } from '../../Interfaces/icategory-tile';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  productsService = inject(Products);
  products: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });

  goToProducts() {
    this.router.navigate(['/products']);
  }

  categories = [
    {
      label: 'ELECTRONICS',
      category: 'electronics',
      image: 'assets/homePage/electronics.png',
    },
    {
      label: 'MEN',
      category: "men's clothing",
      image: 'assets/homePage/men-clothing.png',
    },
      {
      label: 'WOMEN',
      category: "women's clothing",
      image: 'assets/homePage/women-clothing.png',
    },
    {
      label: 'JEWELERY',
      category: 'jewelery',
      image: 'assets/homePage/jewelery.png',
    },

  
  ];
}
