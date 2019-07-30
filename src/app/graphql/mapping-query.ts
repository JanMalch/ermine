import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { QueryOptions, R, WatchQueryOptions } from 'apollo-angular/types';
import { ApolloQueryResult } from 'apollo-client';
import { DocumentNode } from 'graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export abstract class MappingQuery<O, T = {}, V = R> extends Query<T, V> {
  public abstract get document(): DocumentNode;

  public watchMapped(variables?: V, options?: WatchQueryOptions<V>): Observable<O> {
    return this.watch(variables, options).valueChanges.pipe(
      map(value => this.mapper(value, variables))
    );
  }

  public fetchMapped(variables?: V, options?: QueryOptions<V>): Observable<O> {
    return this.fetch(variables, options).pipe(map(value => this.mapper(value, variables)));
  }

  protected abstract mapper(result: ApolloQueryResult<T>, variables: V): O;
}
