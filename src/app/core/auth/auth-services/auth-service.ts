import { Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { ILoginToken } from '../auth-interfaces/login-token';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IUser } from '../auth-interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly isAuthenticated = signal(false);
  public readonly user = signal<IUser | null>(null);
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private http: HttpClient,
  ) {
    console.log(this.getToken());
    console.log('Is authenticated:', !!this.getToken());
    this.isAuthenticated.set(!!this.getToken());

    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      try {
        this.user.set(JSON.parse(rawUser) as IUser);
      } catch {
        localStorage.removeItem('user');
      }
    }
  }

  tokenkey = 'Authenticationtoken';

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
          this.setUserCookie({ id: res.user.id, username: res.user.username });
          localStorage.setItem('user', JSON.stringify(res.user));
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
  //   }).pipe(
  //     tap((res) => {
  //       this.setToken(res.Login.AccessToken);
  //       this.isAuthenticated.set(true);
  //     }),
  //     map((res) => res.Login.AccessToken),
  //   );
  // }

  logout() {
    // const userId = this.user()?.id;

    // if (userId) {
    //   localStorage.removeItem(`cart_items_${userId}`);
    // }
    this.cookieService.delete(this.tokenkey);
    this.cookieService.delete('userId');
    this.cookieService.delete('username');
    localStorage.removeItem('user');
    this.isAuthenticated.set(false);
    this.user.set(null);
    this.router.navigate(['/login']);
  }

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
          this.setUserCookie({ id: res.user.id, username: res.user.username });
          this.user.set(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/']);
        }),
        map((res) => res.token),
      );
  }

  private setUserCookie(user: { id: number; username: string }) {
    this.cookieService.set('userId', String(user.id), { expires: 2, sameSite: 'Strict' });
    this.cookieService.set('username', user.username, { expires: 2, sameSite: 'Strict' });
  }


  setUser(u: IUser) {
    this.user.set(u);
    localStorage.setItem('user', JSON.stringify(u));
  }
}
