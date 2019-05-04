import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { MappingQuery } from '@graphql/mapping-query';

export interface Result {
  viewer: {
    login: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UsernameQuery extends MappingQuery<string, Result, void> {
  document = gql`
    {
      viewer {
        login
      }
    }
  `;

  protected mapper(result: ApolloQueryResult<Result>): string {
    return result.data.viewer.login;
  }
}
