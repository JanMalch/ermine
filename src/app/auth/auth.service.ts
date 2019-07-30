import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsernameQuery } from '@graphql/username.query';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthModule } from './auth.module';
import { AuthOptions, NetlifyAuthenticator, Providers } from './netlify-authenticator.rx';

@Injectable({
  providedIn: AuthModule
})
export class AuthService {
  static readonly LOGGED_OUT_STATE: AuthState = {
    extended: false,
    loggedIn: false,
    token: undefined,
    username: undefined
  };
  readonly authState$ = new BehaviorSubject<AuthState>({
    extended: localStorage.getItem('scope') === 'extended',
    loggedIn: !!localStorage.getItem('token'),
    token: localStorage.getItem('token') || null,
    username: undefined
  });
  private readonly authenticator = new NetlifyAuthenticator();
  private readonly extendedScope: AuthOptions = {
    scope: 'repo',
    provider: Providers.GitHub
  };
  private readonly basicScope: AuthOptions = {
    scope: '',
    provider: Providers.GitHub
  };

  constructor(
    private usernameQuery: UsernameQuery,
    private router: Router,
    private apollo: Apollo
  ) {}

  logout() {
    this.authState$.next({
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
          return of({ ...AuthService.LOGGED_OUT_STATE, extended });
        }),
        mergeMap(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('scope', extended ? 'extended' : 'basic');
          return this.usernameQuery
            .fetchMapped()
            .pipe(map(username => ({ ...res, username })));
        }),
        mergeMap(res => {
          this.authState$.next({
            extended,
            loggedIn: true,
            token: res.token,
            username: res.username
          });
          return this.authState$;
        })
      );
  }
}

export interface AuthState {
  loggedIn: boolean;
  token: string | undefined;
  extended: boolean;
  username: string | undefined;
}
