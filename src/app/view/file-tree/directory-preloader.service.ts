import { Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { OidResolverQuery } from '@graphql/oid-resolver-query.service';
import { concatMap, map } from 'rxjs/operators';
import { Repository } from '@core/models';

@Injectable()
export class DirectoryPreloaderService {
  fetchOid = new Subject<PreloadStep>();

  get fetchOid$(): Observable<PreloadStep> {
    return this.fetchOid.asObservable();
  }

  constructor(private oidResolver: OidResolverQuery) {}

  preload(directory: string, repository: Repository): Observable<PreloadStep> {
    const fragments = directory.split('/');
    const paths = fragments.map((_, i) => fragments.slice(0, i + 1).join('/'));

    let level = 0;
    let parentPath = '';
    return from(paths).pipe(
      concatMap(path =>
        this.oidResolver
          .fetchMapped({
            owner: repository.owner,
            name: repository.name,
            expression: `${repository.branch}:${path}`
          })
          .pipe(
            map(resolved => {
              const step: PreloadStep = {
                oid: resolved.oid,
                parentPath,
                level
              };
              parentPath = path;
              level++;
              return step;
            })
          )
      )
    );
  }
}

export interface PreloadStep {
  oid: string;
  parentPath: string;
  level: number;
  path?: string;
}
