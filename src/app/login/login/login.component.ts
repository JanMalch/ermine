import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AuthState } from '@auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {}

  get returnUrl(): string {
    const returnTo = this.activatedRoute.snapshot.queryParamMap.get('returnTo');
    return returnTo === null ? '/select' : returnTo;
  }

  ngOnInit() {
    this.title.setTitle('Login · Ermine');
  }

  onSuccess(response: AuthState) {
    this.router.navigateByUrl(this.returnUrl);
  }
}
