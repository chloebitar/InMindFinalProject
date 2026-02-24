import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guards/auth-guard';
import { Dashboard } from './pages/dashboard/dashboard';
import { NotFound } from './pages/not-found/not-found';
import { LoginForm } from './pages/login-form/login-form';
import { SignUp } from './pages/sign-up/sign-up';
import { ProductList } from './pages/product-list/product-list';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'login', component: LoginForm },
  { path: 'signup', component: SignUp },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: NotFound,
  },
];
