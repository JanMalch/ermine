import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { Repository } from '@core/models';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  private repository: Repository;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay(1)
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    public auth: AuthService,
    private title: Title
  ) {
    this.repository = { ...this.route.snapshot.data.repository };
  }

  ngOnInit(): void {
    this.title.setTitle('Select repository · Ermine');
  }
}
