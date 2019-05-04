import gql from 'graphql-tag';
import { MappingQuery } from './mapping-query';
import { ApolloQueryResult, QueryOptions, WatchQueryOptions } from 'apollo-client';
import { Injectable } from '@angular/core';
import { getLanguageForFile } from '../prism/prism.languages-util';
import { PrismLanguage } from '../prism/prism.languages';
import { Repository } from '@core/models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { map, mergeMap } from 'rxjs/operators';

export function determineHandler(languageId: string): 'csv' | 'markdown' | 'code' {
  switch (languageId) {
    case 'markdown-preview':
      return 'markdown';
    case 'csv-preview':
      return 'csv';
    default:
      return 'code';
  }
}

export interface Variables {
  name: string;
  owner: string;
  oid: string;
  fileName: string;
  branch: string;
  dirPath: string;
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
  repository?: Partial<Repository>;
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
export class FileOidQuery extends MappingQuery<File, Result, Variables> {
  constructor(apollo: Apollo, private http: HttpClient) {
    super(apollo);
  }

  document = gql`
    query FileQuery($name: String!, $owner: String!, $oid: GitObjectID!) {
      repository(name: $name, owner: $owner) {
        object(oid: $oid) {
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

  protected mapper(result: ApolloQueryResult<Result>, variables: Variables): File {
    const file = !!result.data.repository.object ? result.data.repository.object : undefined;
    if (file === undefined) {
      return file;
    }

    const language = getLanguageForFile(variables.fileName);
    /*const handler = variables.fileName.endsWith("csv") ? "csv"
      : variables.fileName.endsWith("md") ? "markdown" : "code";
*/
    const handler = determineHandler(language.id);
    const fullPath =
      variables.dirPath.length === 0
        ? variables.fileName
        : variables.dirPath + '/' + variables.fileName;

    return {
      ...file,
      handler,
      repository: {
        name: variables.name,
        owner: variables.owner,
        branch: variables.branch,
        path: fullPath
      },
      dirPath: variables.dirPath,
      name: variables.fileName,
      language,
      isLargeFile: isLargeFile(file)
    };
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
}

function getRawContentLink(owner, name, branch, path) {
  return `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${path}`;
}
