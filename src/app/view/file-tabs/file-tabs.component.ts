import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { StyleService } from '@core/style.service';

@Component({
  selector: 'app-file-tabs[files][activeOid]',
  templateUrl: './file-tabs.component.html',
  styleUrls: ['./file-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileTabsComponent implements OnInit {
  @Input() files: TabInfo[] = [];
  @Output() fileSelected = new EventEmitter<TabInfo>();
  @Output() fileClosed = new EventEmitter<string>();
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  constructor(private styleService: StyleService) {}

  @Input() set activeOid(value: string) {
    const activeIndex = this.files.findIndex(info => info.oid === value);
    if (!!this.matTabGroup) {
      this.matTabGroup.selectedIndex = activeIndex;
      this.matTabGroup.realignInkBar();
    }
  }

  ngOnInit() {
    this.styleService.updateTabHeader();
  }
}

export interface TabInfo {
  oid: string;
  fileName: string;
  fullPath: string;
}
