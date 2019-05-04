import { Injectable } from '@angular/core';
import { AuthOptions, NetlifyAuthenticator, Providers } from '@core/netlify-authenticator.rx';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { UsernameQuery } from '@graphql/username.query';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authenticator = new NetlifyAuthenticator();
  private readonly extendedScope: AuthOptions = {
    scope: 'repo',
    provider: Providers.GitHub
  };
  private readonly basicScope: AuthOptions = {
    scope: '',
    provider: Providers.GitHub
  };

  readonly authState = new BehaviorSubject<AuthState>({
    extended: localStorage.getItem('scope') === 'extended',
    loggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    username: undefined
  });

  constructor(
    private usernameQuery: UsernameQuery,
    private router: Router,
    private apollo: Apollo
  ) {}

  get isLoggedIn$(): Observable<boolean> {
    return this.authState.asObservable().pipe(map(state => state.loggedIn));
  }

  get username$(): Observable<string> {
    return this.authState.asObservable().pipe(map(state => state.username));
  }

  get authState$(): Observable<AuthState> {
    return this.authState.asObservable();
  }

  get token$(): Observable<string | undefined> {
    return this.authState.asObservable().pipe(map(state => state.token));
  }

  get isExtendedScope$(): Observable<boolean> {
    return this.authState.asObservable().pipe(map(state => state.extended));
  }

  logout() {
    this.authState.next({
      extended: false,
      loggedIn: false,
      token: undefined,
      username: undefined
    });
    localStorage.clear();
    this.apollo.getClient().clearStore();
    this.router.navigateByUrl('/');
  }

  login(extended: boolean): Observable<AuthState> {
    this.apollo.getClient().clearStore();
    return this.authenticator
      .authenticate$(extended ? this.extendedScope : this.basicScope)
      .pipe(
        catchError(err => {
          localStorage.setItem('token', null);
          localStorage.setItem('scope', null);
          return of({
            extended,
            loggedIn: false,
            token: undefined,
            username: undefined
          });
        }),
        tap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('scope', extended ? 'extended' : 'basic');
        }),
        mergeMap(res =>
          this.usernameQuery.fetchMapped().pipe(
            map(username => ({
              ...res,
              username
            }))
          )
        ),
        tap(res =>
          this.authState.next({
            extended,
            loggedIn: true,
            token: res.token,
            username: res.username
          })
        ),
        mergeMap(() => this.authState$)
      );
  }
}

export interface AuthState {
  loggedIn: boolean;
  token: string | undefined;
  extended: boolean;
  username: string | undefined;
}
