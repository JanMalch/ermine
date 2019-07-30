import Authenticator from 'netlify-auth-providers';
import { Observable } from 'rxjs';

export enum Providers {
  GitHub = 'github',
  GitLab = 'gitlab',
  Bitbucket = 'bitbucket',
  Email = 'email'
}

export interface Settings {
  site_id?: string;
  base_url?: string;
}

export interface AuthOptions {
  provider?: Providers;
  scope?: string | string[];
  beta_invite?: string;
  invite_code?: string;
  login?: boolean;
}

export interface AuthResponse {
  token: string;
  provider: Providers;
}

export class NetlifyAuthenticator {
  public readonly authenticator;

  constructor(settings: Settings = {}) {
    this.authenticator = new Authenticator(settings);
  }

  authenticate$(options: AuthOptions, scopeSeparator: string = ' '): Observable<AuthResponse> {
    const opt = { ...options };

    if (Array.isArray(opt.scope)) {
      opt.scope = opt.scope.join(scopeSeparator);
    }

    return Observable.create(observer => {
      this.authenticator.authenticate(opt, (err, data) => {
        if (!!err) {
          observer.error(err);
        }
        if (!!data) {
          observer.next(data);
          observer.complete();
        }
      });
    });
  }
}
