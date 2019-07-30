import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService, AuthState } from '@auth/auth.service';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-choice[extendedScope]',
  templateUrl: './login-choice.component.html',
  styleUrls: ['./login-choice.component.scss']
})
export class LoginChoiceComponent implements OnInit {
  @Input() extendedScope: boolean;
  @Output() success = new EventEmitter<AuthState>();

  err$ = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  startLogin() {
    this.authService
      .login(this.extendedScope)
      .pipe(first())
      .subscribe({
        next: response => this.success.emit(response),
        error: err => this.err$.next(err)
      });
  }
}
