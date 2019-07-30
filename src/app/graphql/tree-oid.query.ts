import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { MappingQuery } from './mapping-query';
import { treeSort } from './tree.query';

export interface Variables {
  name: string;
  owner: string;
  oid: string;
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
export class TreeOidQuery extends MappingQuery<Entry[], Result, Variables> {
  document = gql`
    query TreeQuery($name: String!, $owner: String!, $oid: GitObjectID!) {
      repository(name: $name, owner: $owner) {
        object(oid: $oid) {
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
