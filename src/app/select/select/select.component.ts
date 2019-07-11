import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth.service';
import { Repository } from '@core/models';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { isHandset } from '@core/responsive';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  private repository: Repository;
  readonly isHandset$ = isHandset(this.breakpointObserver);

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
