import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ILoginToken } from '../auth-interfaces/login-token';
import { IUser } from '../auth-interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthenticated = signal(false);
  public readonly user = signal<IUser | null>(null);

  tokenkey = 'Authenticationtoken';

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient,
  ) {
    this.restoreSession();
  }

  getToken(): string {
    return this.cookieService.get(this.tokenkey);
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenkey, token, { expires: 2, sameSite: 'Strict' });
  }

  authentication(email: string, password: string): Observable<string> {
    return this.http
      .post<ILoginToken>('https://melaine-palaeobiologic-savourily.ngrok-free.dev/api/auth/login', {
        email,
        password,
      })
      .pipe(
        tap((res) => {
          if (!res.token) return;

          this.setToken(res.token);

          this.isAuthenticated.set(true);
          this.user.set(res.user);

          this.router.navigate(['/']);
        }),
        map((res) => res.token),
      );
  }

  // authentication(email: string, password: string): Observable<string> {
  //   console.log('Mock login called', email, password);

  //   return of({
  //     Login: {
  //       AccessToken: 'fake-jwt-token',
  //     },
  //     user:{
  //       id:2,
  //       email: "chloebitar32@gmail.com",
  //       firstName: "chloe",
  //       lastName: "bitar",
  //       username: "chloebitar",
  //       dateOfBirth: "1-2-2026", 
  //       imageUrl: "test.jpg",
  //       role:"user",
  //       createdAt: "1-2-2026",
  //       updatedAt: "1-2-2026",
  //     }
  //   }).pipe(
  //     tap((res) => {
  //       this.setToken(res.Login.AccessToken);
  //       this.isAuthenticated.set(true);
  //       this.user.set(res.user);
  //     }),
  //     map((res) => res.Login.AccessToken),
  //   );
  // }

  signup(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    username: string,
  ): Observable<string> {
    return this.http
      .post<ILoginToken>(
        'https://melaine-palaeobiologic-savourily.ngrok-free.dev/api/auth/register',
        {
          email,
          firstName,
          lastName,
          password,
          username,
        },
      )
      .pipe(
        tap((res) => {
          if (!res.token) return;
          this.setToken(res.token);
          this.isAuthenticated.set(true);
          this.user.set(res.user);
          this.router.navigate(['/']);
        }),
        map((res) => res.token),
      );
  }

  logout() {
    this.cookieService.delete(this.tokenkey);

    this.isAuthenticated.set(false);
    this.user.set(null);

    this.router.navigate(['/login']);
  }

  setUser(u: IUser) {
    this.user.set(u);
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>('https://melaine-palaeobiologic-savourily.ngrok-free.dev/api/user');
  }

  restoreSession() {
    const token = this.getToken();

    if (!token) {
      this.isAuthenticated.set(false);
      this.user.set(null);
      return;
    }

    this.getCurrentUser().subscribe({
      next: (user) => {
        this.isAuthenticated.set(true);
        this.user.set(user);
      },
      error: (err) => {
        this.isAuthenticated.set(false);
        this.user.set(null);
      },
    });
  }
}
