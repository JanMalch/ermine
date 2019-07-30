import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { applyMixins } from '@core/mixins';
import { Repository } from '@core/models';
import { ExistenceQuery } from '@graphql/existence.query';
import { RepositoryResolver } from '@view/repository.resolver';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RepositoryExistsGuard implements CanActivate, RepositoryResolver {
  resolve: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Repository;

  constructor(private existenceQuery: ExistenceQuery, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const repository = this.resolve(next, state);
    return this.existenceQuery
      .fetchMapped({
        owner: repository.owner,
        name: repository.name,
        branch: repository.branch
      })
      .pipe(
        map(result =>
          result.exists
            ? true
            : this.router.createUrlTree(['/select'], {
                queryParams: { ...repository }
              })
        )
      );
  }
}

applyMixins(RepositoryExistsGuard, [RepositoryResolver]);
