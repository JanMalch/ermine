import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { File, FileOidQuery, Variables } from '@graphql/file-oid.query';
import { tap } from 'rxjs/operators';
import { LoadingService } from '@view/loading.service';

@Injectable()
export class FileLoaderService {
  private readonly fileCache = new Map<string, File>();

  constructor(private fileQuery: FileOidQuery, private loader: LoadingService) {}

  getFile(variables: Variables): Observable<File> {
    if (this.fileCache.has(variables.oid)) {
      return of(this.fileCache.get(variables.oid));
    } else {
      this.loader.setLoading(true);
      return this.fileQuery.fetchMapped(variables).pipe(
        tap(f => {
          if (!f.isLargeFile && !f.isBinary) {
            this.fileCache.set(variables.oid, f);
          }
        }),
        tap(() => this.loader.setLoading(false))
      );
    }
  }

  clearCache() {
    this.fileCache.clear();
  }
}
