import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { Repository } from '@core/models';
import { isHandset } from '@core/responsive';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  readonly isHandset$ = isHandset(this.breakpointObserver);
  private repository: Repository;

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
