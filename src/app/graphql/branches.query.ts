import gql from 'graphql-tag';
import { MappingQuery } from './mapping-query';
import { ApolloQueryResult } from 'apollo-client';
import { Injectable } from '@angular/core';

export interface Variables {
  name: string;
  owner: string;
}

interface Edge {
  node: {
    name: string;
  };
}

export interface Result {
  repository: {
    refs: {
      totalCount: number;
      edges: Edge[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class BranchQuery extends MappingQuery<string[], Result, Variables> {
  document = gql`
    query($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name) {
        refs(first: 100, refPrefix: "refs/heads/") {
          totalCount
          edges {
            node {
              name
            }
          }
        }
      }
    }
  `;

  protected mapper(result: ApolloQueryResult<Result>): string[] {
    return result.data.repository.refs.edges.map(edge => edge.node.name);
  }
}
