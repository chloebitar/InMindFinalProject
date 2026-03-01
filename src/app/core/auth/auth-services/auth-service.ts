import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ILoginToken } from '../auth-interfaces/login-token';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthenticated = signal(false);
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient,
  ) {
    console.log(this.getToken());
    console.log('Is authenticated:', !!this.getToken());
    this.isAuthenticated.set(!!this.getToken());
  }

  tokenkey = 'Authenticationtoken';

  getToken(): string {
    return this.cookieService.get(this.tokenkey);
  }

  setToken(token: string): void {
    this.cookieService.set(this.tokenkey, token, { expires: 2, sameSite: 'Strict' });
  }

  // authentication(email: string, password: string): Observable<string> {
  //   return this.http
  //     .post<ILoginToken>('https://melaine-palaeobiologic-savourily.ngrok-free.dev/api/auth/login', {
  //       email,
  //       password,
  //     })
  //     .pipe(
  //       tap((res) => {
  //         if (!res.token) return;
  //         this.setToken(res.token);
  //         this.isAuthenticated.set(true);
  //         this.router.navigate(['/']);
  //       }),
  //       map((res) => res.token),
  //     );
  // }

  authentication(email: string, password: string): Observable<string> {
    console.log('Mock login called', email, password);

    return of({
      Login: {
        AccessToken: 'fake-jwt-token',
      },
    }).pipe(
      tap((res) => {
        this.setToken(res.Login.AccessToken);
        this.isAuthenticated.set(true);
        this.router.navigate(['/dashboard']);
      }),
      map((res) => res.Login.AccessToken),
    );
  }

  logout() {
    this.cookieService.delete(this.tokenkey);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  signup(email:string, firstName: string, lastName: string, password: string, username: string): Observable<string> {
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
          this.router.navigate(['/']);
        }),
        map((res) => res.token),
      );;
  
 }
}
