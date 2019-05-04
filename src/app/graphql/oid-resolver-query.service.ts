import gql from 'graphql-tag';
import { MappingQuery } from './mapping-query';
import { ApolloQueryResult } from 'apollo-client';
import { Injectable } from '@angular/core';

export interface Variables {
  name: string;
  owner: string;
  expression: string;
}

export interface Result {
  repository: {
    object: {
      oid: string;
      __typename: 'Tree' | 'Blob';
    };
  };
}

export interface ResolvedOid {
  oid: string;
  type: 'Tree' | 'Blob';
}

@Injectable({
  providedIn: 'root'
})
export class OidResolverQuery extends MappingQuery<ResolvedOid, Result, Variables> {
  document = gql`
    query OidResolverQuery($name: String!, $owner: String!, $expression: String!) {
      repository(name: $name, owner: $owner) {
        object(expression: $expression) {
          oid
        }
      }
    }
  `;

  protected mapper(result: ApolloQueryResult<Result>, variables: Variables): ResolvedOid {
    const file = !!result.data.repository.object ? result.data.repository.object : undefined;

    return {
      oid: file.oid,
      type: file.__typename
    };
  }
}
