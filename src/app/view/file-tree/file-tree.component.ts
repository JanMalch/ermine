import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreeQuery } from '@graphql/tree.query';
import { Repository } from '@core/models';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  DynamicDatabase,
  DynamicDataSource,
  DynamicFlatNode
} from '@view/file-tree/tree.control';
import { TreeOidQuery } from '@graphql/tree-oid.query';
import { TabInfo } from '@view/file-tabs/file-tabs.component';
import { concatMap, first, map, mergeMap } from 'rxjs/operators';
import { from, Observable, ReplaySubject } from 'rxjs';
import { OidResolverQuery } from '@graphql/oid-resolver-query.service';
import { LoadingService } from '@view/loading.service';

@Component({
  selector: 'app-file-tree[repository]',
  templateUrl: './file-tree.component.html',
  styleUrls: ['./file-tree.component.scss'],
  providers: [DynamicDatabase]
})
export class FileTreeComponent implements OnInit {
  private readonly initialLoadDone = new ReplaySubject<true>(1);

  @Input() repository: Repository;

  @Output() fileSelected = new EventEmitter<TabInfo>();

  constructor(
    private treeQuery: TreeQuery,
    private database: DynamicDatabase,
    private oidResolver: OidResolverQuery,
    private loader: LoadingService,
    private treeOidQuery: TreeOidQuery
  ) {
    // this.database.treeOidQuery = treeOidQuery;
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database);

    this.dataSource.data = []; //  database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, nodeData: DynamicFlatNode) => nodeData.expandable;

  ngOnInit() {
    this.database.init(this.repository, this.treeOidQuery);
    this.treeQuery
      .fetchMapped({
        owner: this.repository.owner,
        name: this.repository.name,
        expression: this.repository.branch + ':'
      })
      .subscribe(result => {
        this.dataSource.data = result.map(node => {
          return new DynamicFlatNode(
            node.name,
            node.object.oid,
            node.type,
            0,
            node.type === 'tree'
          );
        });
        this.initialLoadDone.next(true);
      });
    this.dataSource.loading$.subscribe(val => this.loader.setLoading(val));
  }

  openFile(node: DynamicFlatNode) {
    this.fileSelected.emit({
      oid: node.oid,
      fileName: node.item,
      fullPath: node.path
    });
  }

  preloadDirectory(path: string) {
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    this.initialLoadDone
      .pipe(
        first(),
        mergeMap(() => this.resolveOids(path)),
        concatMap((step: PreloadStep) => {
          let node = this.dataSource.data.find(n => n.oid === step.oid);
          if (!node) {
            node = this.dataSource.data.find(n => n.associatedOids.includes(step.oid));
          }
          return from(this.dataSource.toggleNode(node, true));
        })
      )
      .subscribe();
  }

  private resolveOids(directory: string): Observable<PreloadStep> {
    const fragments = directory.split('/');
    const paths = fragments.map((_, i) => fragments.slice(0, i + 1).join('/'));

    let level = 0;
    let parentPath = '';
    return from(paths).pipe(
      concatMap(path =>
        this.oidResolver
          .fetchMapped({
            owner: this.repository.owner,
            name: this.repository.name,
            expression: `${this.repository.branch}:${path}`
          })
          .pipe(
            map(resolved => {
              const step: PreloadStep = {
                oid: resolved.oid,
                parentPath,
                level,
                path
              };
              parentPath = path;
              level++;
              return step;
            })
          )
      )
    );
  }
}

export interface PreloadStep {
  oid: string;
  parentPath: string;
  level: number;
  path?: string;
}
