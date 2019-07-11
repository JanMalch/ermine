import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter, mergeMap } from 'rxjs/operators';
import { CopyModeService } from '@core/copy-mode.service';
import { AuthService } from '@core/auth.service';
import { StyleService } from '@core/style.service';
import { MatSidenav } from '@angular/material';
import { isHandset } from '@core/responsive';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  get width(): number {
    return this.styleService.navWidth;
  }

  set width(value: number) {
    this.styleService.navWidth = value;
  }

  readonly isHandset$ = isHandset(this.breakpointObserver);

  @ViewChild('drawer') drawer: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public copyMode: CopyModeService,
    public auth: AuthService,
    private styleService: StyleService
  ) {}

  ngOnInit(): void {
    this.styleService.closeDrawer$
      .pipe(
        mergeMap(() => this.isHandset$),
        filter(x => x)
      )
      .subscribe(() => {
        this.drawer.close();
      });
  }

  autoWidth() {
    this.width = document.querySelector('app-file-tree').clientWidth + 10;
  }

  get onViewUrl(): boolean {
    return location.pathname.startsWith('/view');
  }
}
