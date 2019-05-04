import gql from 'graphql-tag';
import { MappingQuery } from './mapping-query';
import { ApolloQueryResult } from 'apollo-client';
import { Injectable } from '@angular/core';

function treeSort(a: Entry, b: Entry) {
  if (a.type !== b.type) {
    return a.type === 'tree' ? -1 : 1;
  }

  return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
}

export interface Variables {
  name: string;
  owner: string;
  expression: string;
}

export interface Result {
  repository: {
    object: {
      entries: Entry[];
    };
  };
}

export interface Entry {
  name: string;
  type: 'tree' | 'blob';
  object: {
    oid: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TreeQuery extends MappingQuery<Entry[], Result, Variables> {
  document = gql`
    query TreeQuery($name: String!, $owner: String!, $expression: String!) {
      repository(name: $name, owner: $owner) {
        object(expression: $expression) {
          ... on Tree {
            entries {
              name
              type
              object {
                oid
              }
            }
          }
        }
      }
    }
  `;

  protected mapper(result: ApolloQueryResult<Result>): Entry[] {
    return result.data.repository.object.entries
      .map(e => {
        if (e.type === 'blob') {
          return e;
        } else {
          return { ...e, children: [] };
        }
      })
      .sort(treeSort);
  }
}
