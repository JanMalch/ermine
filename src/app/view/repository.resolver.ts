import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Repository } from '@core/models';

// TODO: shared module
@Injectable({
  providedIn: 'root'
})
export class RepositoryResolver implements Resolve<Repository> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Repository {
    return {
      owner: route.queryParamMap.get('owner'),
      name: route.queryParamMap.get('name'),
      branch: route.queryParamMap.get('branch'),
      path: route.queryParamMap.get('path')
    };
  }
}
