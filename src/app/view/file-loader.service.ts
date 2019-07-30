import { Injectable } from '@angular/core';
import { File, FileOidQuery, Variables } from '@graphql/file-oid.query';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class FileLoaderService {
  private readonly fileCache = new Map<string, File>();

  constructor(private fileQuery: FileOidQuery) {}

  getFile(variables: Variables): Observable<File> {
    if (this.fileCache.has(variables.oid)) {
      return of(this.fileCache.get(variables.oid));
    } else {
      return this.fileQuery.fetchMapped(variables).pipe(
        tap(f => {
          if (!f.isLargeFile && !f.isBinary) {
            this.fileCache.set(variables.oid, f);
          }
        })
      );
    }
  }

  clearCache() {
    this.fileCache.clear();
  }
}
