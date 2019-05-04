import { ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Repository } from '@core/models';
import { filter, mergeMap, startWith, tap } from 'rxjs/operators';
import { File, FileOidQuery } from '@graphql/file-oid.query';
import { TabInfo } from '@view/file-tabs/file-tabs.component';
import { LoadingService } from '@view/loading.service';
import { FileLoaderService } from '@view/file-loader.service';

@Component({
  selector: 'app-file-viewer[file][repository]',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  file$: Observable<File>;

  private fileChange$ = new BehaviorSubject<TabInfo>(null);

  @Input() set file(value: TabInfo) {
    this.fileChange$.next(value);
  }

  @Input() repository: Repository;

  constructor(private fileLoader: FileLoaderService) {}

  ngOnInit() {
    this.file$ = this.fileChange$.pipe(
      filter(file => file !== null),
      mergeMap(file =>
        this.fileLoader.getFile({
          owner: this.repository.owner,
          name: this.repository.name,
          branch: this.repository.branch,
          fileName: file.fileName,
          dirPath: file.fullPath,
          oid: file.oid
        })
      ),
      startWith(undefined)
    );
  }
}
