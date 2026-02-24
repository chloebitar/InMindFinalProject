import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginForm } from './pages/login-form/login-form';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from './products';
import { inject } from '@angular/core';
import { IProduct } from './Interfaces/product-interface';
import { Dashboard } from './pages/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginForm, Dashboard],
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
