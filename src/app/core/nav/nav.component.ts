import { Component, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { delay, filter, map, mergeMap, shareReplay } from 'rxjs/operators';
import { CopyModeService } from '@core/copy-mode.service';
import { AuthService } from '@core/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { StyleService } from '@core/style.service';
import { MatSidenav } from '@angular/material';

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

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay(1)
  );

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

  get onViewUrl(): boolean {
    return location.pathname.startsWith('/view');
  }
}
