import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/loading.service';
import { Repository } from '@core/models';
import { StyleService } from '@core/style.service';
import { OidResolverQuery } from '@graphql/oid-resolver-query.service';
import { FileLoaderService } from '@view/file-loader.service';
import { TabInfo } from '@view/file-tabs/file-tabs.component';
import { FileTreeComponent } from '@view/file-tree/file-tree.component';
import { RenderCacheService } from '@view/file-viewer/file-renderer/render-cache.service';
import { BehaviorSubject } from 'rxjs';

export const loadingBarAnimation = trigger('loadingBar', [
  transition(':enter', [
    style({ transform: 'scaleY(0)', opacity: 0 }),
    animate('250ms', style({ transform: 'scaleY(1)', opacity: 1 }))
  ]),
  transition(':leave', [
    style({ transform: 'scaleY(1)', opacity: 1 }),
    animate('250ms 250ms', style({ transform: 'scaleY(0)', opacity: 0 }))
  ])
]);

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  animations: [loadingBarAnimation]
})
export class ViewComponent implements AfterViewInit, OnDestroy {
  repository: Repository;
  currentFile$ = new BehaviorSubject<TabInfo>(null);
  @ViewChild(FileTreeComponent) fileTree: FileTreeComponent;
  private openFileMap = new Map<string, TabInfo>();

  constructor(
    public loader: LoadingService,
    private route: ActivatedRoute,
    private oidResolver: OidResolverQuery,
    private styleService: StyleService,
    private fileLoader: FileLoaderService,
    private renderCache: RenderCacheService,
    private title: Title
  ) {}

  get currentOid(): string {
    return this.currentFile$.getValue().oid;
  }

  get openFiles(): TabInfo[] {
    return Array.from(this.openFileMap.values());
  }

  ngAfterViewInit() {
    this.repository = this.route.snapshot.data.repository;
    if (this.repository.branch !== 'master') {
      this.title.setTitle(
        `${this.repository.owner}/${this.repository.name} at ${
          this.repository.branch
        } · Ermine`
      );
    } else {
      this.title.setTitle(`${this.repository.owner}/${this.repository.name} · Ermine`);
    }
    this.initialLoadFromUrlPath();
  }

  onFileSelected(file: TabInfo) {
    if (!!file) {
      this.openFileMap.set(file.oid, file);
      this.currentFile$.next(file);
      this.styleService.closeDrawer$.next(true);
    }
  }

  onFileClosed(oid: string | null) {
    if (oid === null) {
      this.openFileMap.clear();
      this.currentFile$.next(null);
    } else {
      this.openFileMap.delete(oid);
      if (oid === this.currentOid) {
        // active file has been closed
        const index = this.openFiles.findIndex(f => f.oid === oid);
        const nextFile = this.openFiles[Math.max(0, index - 1)];
        this.currentFile$.next(nextFile);
      }
    }
  }

  initialLoadFromUrlPath() {
    this.oidResolver
      .fetchMapped({
        name: this.repository.name,
        owner: this.repository.owner,
        expression: `${this.repository.branch}:${this.repository.path}`
      })
      .subscribe(resolved => {
        if (resolved.type === 'Blob') {
          const [fileName, ...remainder] = this.repository.path.split('/').reverse();
          const dirPath = remainder.reverse().join('/');
          if (dirPath.length > 0) {
            this.fileTree.preloadDirectory(dirPath);
          }
          this.onFileSelected({
            fileName,
            fullPath: dirPath,
            oid: resolved.oid
          });
        } else {
          this.fileTree.preloadDirectory(this.repository.path);
          this.loadReadme();
        }
      });
  }

  loadReadme() {
    this.oidResolver
      .fetchMapped({
        name: this.repository.name,
        owner: this.repository.owner,
        expression: `${this.repository.branch}:README.md`
      })
      .subscribe(resolved => {
        this.onFileSelected({
          fullPath: '',
          fileName: 'README.md',
          oid: resolved.oid
        });
      });
  }

  ngOnDestroy(): void {
    this.fileLoader.clearCache();
    this.renderCache.clearCache();
  }
}
