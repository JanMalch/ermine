import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from '@core/models';
import { PrismLanguage } from '@prism/prism.languages';
import { getLanguageForFile } from '@prism/prism.languages-util';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult, QueryOptions, WatchQueryOptions } from 'apollo-client';
import gql from 'graphql-tag';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { MappingQuery } from './mapping-query';

export interface Variables {
  name: string;
  owner: string;
  expression: string;
}

export interface Result {
  repository: {
    object: File;
  };
}

export interface File {
  oid: string;
  text: string | null;
  byteSize: number;
  isBinary: boolean;
  repository?: Repository;
  dirPath?: string;
  name?: string;
  isLargeFile?: boolean;
  language?: PrismLanguage;
  handler?: 'csv' | 'markdown' | 'code' | 'image';
}

function isLargeFile(file: File): boolean {
  return file.text !== null && file.text.length > 1 && file.byteSize > 300_000;
}

@Injectable({
  providedIn: 'root'
})
export class FileQuery extends MappingQuery<File, Result, Variables> {
  document = gql`
    query FileQuery($name: String!, $owner: String!, $expression: String!) {
      repository(name: $name, owner: $owner) {
        object(expression: $expression) {
          ... on Blob {
            oid
            text
            byteSize
            isBinary
          }
        }
      }
    }
  `;

  constructor(apollo: Apollo, private http: HttpClient) {
    super(apollo);
  }

  watchMapped(
    variables?: Variables,
    options?: WatchQueryOptions<Variables>
  ): Observable<File> {
    return super
      .watchMapped(variables, options)
      .pipe(mergeMap(file => this.fixHandlerForImages(file)));
  }

  fetchMapped(variables?: Variables, options?: QueryOptions<Variables>): Observable<File> {
    return super
      .fetchMapped(variables, options)
      .pipe(mergeMap(file => this.fixHandlerForImages(file)));
  }

  fixHandlerForImages(file: File): Observable<File> {
    if (!file.isBinary) {
      return of({ ...file });
    }
    return this.http
      .head<any>(
        getRawContentLink(
          file.repository.owner,
          file.repository.name,
          file.repository.branch,
          file.repository.path
        ),
        { observe: 'response' }
      )
      .pipe(
        map(res => res.headers.get('Content-Type').includes('image')),
        map(isImage => {
          const fixedHandler = isImage ? 'image' : file.handler;
          return {
            ...file,
            handler: fixedHandler
          };
        })
      );
  }

  protected mapper(result: ApolloQueryResult<Result>, variables: Variables): File {
    const file = !!result.data.repository.object ? result.data.repository.object : undefined;
    if (file === undefined) {
      return file;
    }

    const [branch, ...remainder] = variables.expression.split(':');
    const fullPath = remainder.join('');
    const pathElements = fullPath.split('/');
    const path = pathElements.slice(0, -1).join('/');
    const name = pathElements.pop();
    const language = getLanguageForFile(name);
    const handler = variables.expression.endsWith('csv')
      ? 'csv'
      : variables.expression.endsWith('md')
      ? 'markdown'
      : 'code';

    return {
      ...file,
      handler,
      repository: {
        name: variables.name,
        owner: variables.owner,
        branch,
        path: fullPath
      },
      dirPath: path,
      name,
      language,
      isLargeFile: isLargeFile(file)
    };
  }
}

function getRawContentLink(owner, name, branch, path) {
  return `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${path}`;
}
