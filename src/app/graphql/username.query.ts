import { Injectable } from '@angular/core';
import { MappingQuery } from '@graphql/mapping-query';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

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
