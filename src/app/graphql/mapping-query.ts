import { Query } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { QueryOptions, R, WatchQueryOptions } from 'apollo-angular/types';
import { Observable, throwError } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { catchError, first, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class MappingQuery<O, T = {}, V = R> extends Query<T, V> {
  public abstract get document(): DocumentNode;
  protected abstract mapper(result: ApolloQueryResult<T>, variables: V): O;

  public watchMapped(variables?: V, options?: WatchQueryOptions<V>): Observable<O> {
    return this.watch(variables, options).valueChanges.pipe(
      map(value => this.mapper(value, variables))
    );
  }

  public fetchMapped(variables?: V, options?: QueryOptions<V>): Observable<O> {
    return this.fetch(variables, options).pipe(map(value => this.mapper(value, variables)));
  }
}
