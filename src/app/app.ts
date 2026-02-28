import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginForm } from './pages/login-form/login-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from './shared/services/products-service';
import { inject } from '@angular/core';
import { IProduct } from './Interfaces/product-interface';
import { Dashboard } from './pages/dashboard/dashboard';
import { Header } from './core/Layout/header/header';
import { Footer } from './core/Layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('FinalProject');
  productsService = inject(Products);
  products: Signal<IProduct[]> = toSignal(this.productsService.getAllProducts(), {
    initialValue: [],
  });
}
