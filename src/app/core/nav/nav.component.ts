import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AuthService } from '@auth/auth.service';
import { CopyModeService } from '@core/copy-mode.service';
import { isHandset } from '@core/responsive';
import { StyleService } from '@core/style.service';
import { filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements OnInit {
  readonly isHandset$ = isHandset(this.breakpointObserver);
  @ViewChild('drawer') drawer: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public copyMode: CopyModeService,
    public auth: AuthService,
    private styleService: StyleService
  ) {}

  get width(): number {
    return this.styleService.navWidth;
  }

  set width(value: number) {
    this.styleService.navWidth = value;
  }

  get onViewUrl(): boolean {
    return location.pathname.startsWith('/view');
  }

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
}
