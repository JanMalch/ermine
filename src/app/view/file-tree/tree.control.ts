import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Injectable } from '@angular/core';
import { Repository } from '@core/models';
import { Entry, TreeOidQuery } from '@graphql/tree-oid.query';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class DynamicFlatNode {
  public associatedOids: string[] = [];

  constructor(
    public item: string,
    public oid: string = null,
    public type: 'blob' | 'tree' = null,
    public level = 1,
    public expandable = false,
    public path: string = '',
    public isLoading = false
  ) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
export class DynamicDatabase {
  dataMap = new Map<string, DynamicFlatNode[]>();
  private repository: Repository;
  private treeOidQuery: TreeOidQuery;

  init(repository: Repository, treeOidQuery: TreeOidQuery) {
    this.repository = repository;
    this.treeOidQuery = treeOidQuery;
  }

  async getChildren(
    oid: string,
    level: number,
    parent: string
  ): Promise<DynamicFlatNode[] | undefined> {
    if (!this.dataMap.has(oid)) {
      const entries = await this.fetchEntries(oid);
      let nodes: DynamicFlatNode[];
      if (entries.length === 1) {
        const { object, name, type } = entries[0];
        if (type === 'tree') {
          nodes = [await this.chainSingleChildren(object.oid, name, level, parent)];
        }
      }
      if (!nodes) {
        nodes = entries.map(e => {
          const isDir = e.type === 'tree';
          return new DynamicFlatNode(e.name, e.object.oid, e.type, level + 1, isDir, parent);
        });
      }
      this.dataMap.set(oid, nodes);
    }
    return Promise.resolve(this.dataMap.get(oid));
  }

  async chainSingleChildren(
    oid: string,
    name: string,
    level: number,
    parent: string
  ): Promise<DynamicFlatNode | undefined> {
    const collectedOids = [oid];
    const entry: Entry = {
      name,
      type: 'tree',
      object: {
        oid
      }
    };
    while (true) {
      const [firstEntry, ...remainder] = await this.fetchEntries(oid);
      const hasOneChild = firstEntry.type === 'tree' && remainder.length === 0;
      if (!hasOneChild) {
        break;
      }
      oid = firstEntry.object.oid;
      collectedOids.push(oid);
      entry.name += `/${firstEntry.name}`;
      entry.object.oid = oid;
    }
    const node = new DynamicFlatNode(
      entry.name,
      entry.object.oid,
      entry.type,
      level + 1,
      true,
      parent
    );
    collectedOids.pop();
    node.associatedOids = [...collectedOids];
    return Promise.resolve(node);
  }

  areChildrenFetched(oid: string): boolean {
    return this.dataMap.has(oid);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }

  private async fetchEntries(oid: string): Promise<Entry[]> {
    return this.treeOidQuery
      .fetchMapped({
        name: this.repository.name,
        owner: this.repository.owner,
        oid
      })
      .toPromise();
  }
}

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  constructor(
    private treeControl: FlatTreeControl<DynamicFlatNode>,
    private database: DynamicDatabase
  ) {}

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }

  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.changed.subscribe(
      (change: SelectionChange<DynamicFlatNode>) => {
        if (change.added || change.removed) {
          this.handleTreeControl(change);
        }
      }
    );

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(async node => await this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  async toggleNode(node: DynamicFlatNode, expand: boolean) {
    const parentPath = node.path.length === 0 ? node.item : node.path + '/' + node.item;
    const children = await this.database.getChildren(node.oid, node.level, parentPath);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    if (expand) {
      const nodes = [...children];
      this.data.splice(index + 1, 0, ...nodes);
      this.treeControl.expand(node);
    } else {
      this.treeControl.collapseDescendants(node);
      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {}
      this.data.splice(index + 1, count);
    }

    // notify the change, distinct by OID
    this.data = this.data.filter((v, i, a) => a.findIndex(n => n.oid === v.oid) === i);
  }

  disconnect(collectionViewer: CollectionViewer): void {}
}
