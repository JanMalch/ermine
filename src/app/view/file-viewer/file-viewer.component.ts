import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '@core/models';
import { File } from '@graphql/file-oid.query';
import { FileLoaderService } from '@view/file-loader.service';
import { TabInfo } from '@view/file-tabs/file-tabs.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-file-viewer[file][repository]',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit {
  file$: Observable<File>;
  @Input() repository: Repository;
  private fileChange$ = new BehaviorSubject<TabInfo>(null);

  constructor(private fileLoader: FileLoaderService) {}

  @Input() set file(value: TabInfo) {
    this.fileChange$.next(value);
  }

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
