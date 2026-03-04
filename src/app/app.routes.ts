import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guards/auth-guard';
import { adminGuard } from './shared/guards/admin-guard';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'login',
    loadComponent: () => import('./pages/login-form/login-form').then((m) => m.LoginForm),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
    //canActivate: [authGuard],
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/product-list/product-list').then((m) => m.ProductList),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
  },

  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
  },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [adminGuard],
  },

  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/single-product/single-product').then((m) => m.SingleProduct),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
