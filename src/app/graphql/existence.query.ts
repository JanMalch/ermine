import { Injectable } from '@angular/core';
import { MappingQuery } from '@graphql/mapping-query';
import gql from 'graphql-tag';
import { ApolloQueryResult, QueryOptions, WatchQueryOptions } from 'apollo-client';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Variables {
  name: string;
  owner: string;
  branch: string;
  expression?: string;
}

export interface Result {
  repository: {
    object: string | null;
  };
}

export interface ExistenceResult {
  exists: boolean;
  error: string | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ExistenceQuery extends MappingQuery<ExistenceResult, Result, Variables> {
  document = gql`
    query ExistenceQuery($name: String!, $owner: String!, $expression: String!) {
      repository(name: $name, owner: $owner) {
        object(expression: $expression) {
          oid
        }
      }
    }
  `;

  watchMapped(
    variables?: Variables,
    options?: WatchQueryOptions<Variables>
  ): Observable<ExistenceResult> {
    return super
      .watchMapped(
        {
          expression: `${variables.branch}:`,
          ...variables
        },
        options
      )
      .pipe(catchError(err => this.recoverError(err)));
  }

  fetchMapped(
    variables?: Variables,
    options?: QueryOptions<Variables>
  ): Observable<ExistenceResult> {
    return super
      .fetchMapped(
        {
          expression: `${variables.branch}:`,
          ...variables
        },
        options
      )
      .pipe(catchError(err => this.recoverError(err)));
  }

  recoverError(err: any): Observable<ExistenceResult> {
    if (err.message.startsWith('GraphQL error:')) {
      return of({
        exists: false,
        error: err.message
      });
    } else {
      return throwError(err);
    }
  }

  protected mapper(result: ApolloQueryResult<Result>): ExistenceResult {
    if (result.data.repository == null) {
      return {
        exists: false,
        error: 'Unable to read repository.'
      };
    }
    const exists = result.data.repository.object !== null;
    return {
      exists,
      error: exists ? undefined : 'Branch does not exist.'
    };
  }
}
