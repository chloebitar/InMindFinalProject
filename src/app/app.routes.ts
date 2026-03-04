import { Routes } from '@angular/router';
import { adminGuard } from './shared/guards/admin-guard';
import { checkoutGuardGuard } from './pages/checkout/guards/checkout-guard-guard';
import { MainLayout } from './core/Layout/main-layout';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-form/login-form').then((m) => m.LoginForm),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/sign-up/sign-up').then((m) => m.SignUp),
  },

  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home').then((m) => m.Home),
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile').then((m) => m.Profile),
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/product-list/product-list').then((m) => m.ProductList),
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./pages/single-product/single-product').then((m) => m.SingleProduct),
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((m) => m.Cart),
      },
      {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then((m) => m.Checkout),
        canActivate: [checkoutGuardGuard],
      },
      {
        path: 'success',
        loadComponent: () =>
          import('./pages/order-success/order-success').then((m) => m.OrderSuccess),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
        canActivate: [adminGuard],
      },
    ],
  },

  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
