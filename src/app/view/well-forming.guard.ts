import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  ParamMap,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

@Injectable()
export class WellFormingGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const isUrlRedirect = next.queryParamMap.has('url');
    const hasOwnerAndName = next.queryParamMap.has('owner') && next.queryParamMap.has('name');

    if (!hasOwnerAndName && !isUrlRedirect) {
      return this.router.parseUrl('/select');
    }
    if (isUrlRedirect) {
      return this.treeFromUrlParam(next.queryParamMap.get('url'));
    }

    const hasBranchAndPath =
      next.queryParamMap.has('branch') && next.queryParamMap.has('path');
    if (!hasBranchAndPath) {
      return this.fillBranchAndPath(next.queryParamMap);
    }
    return true;
  }

  fillBranchAndPath(queryParamMap: ParamMap): UrlTree {
    const queryParams = {
      owner: queryParamMap.get('owner'),
      name: queryParamMap.get('name'),
      branch: queryParamMap.get('branch') || 'master',
      path: queryParamMap.get('path') || 'README.md'
    };
    return this.router.createUrlTree(['view'], { queryParams });
  }

  treeFromUrlParam(urlParam: string): UrlTree {
    if (urlParam.startsWith('/')) {
      urlParam = urlParam.substring(1);
    }
    const [owner, name, , branch, ...remainder] = urlParam.split('/');
    const path = remainder.length === 0 ? 'README.md' : remainder.join('/');
    const queryParams = {
      owner,
      name,
      branch: !branch ? 'master' : branch,
      path
    };
    return this.router.createUrlTree(['view'], { queryParams });
  }
}
