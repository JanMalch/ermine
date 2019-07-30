import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { ExistenceQuery } from '@graphql/existence.query';

@Component({
  selector: 'app-select-form',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss']
})
export class SelectFormComponent implements OnInit {
  repoForm: FormGroup;

  loading = false;

  routingFailed: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private existenceQuery: ExistenceQuery
  ) {}

  get historyAvailable(): boolean {
    return !!this.history.owner;
  }

  get historyString(): string {
    return this.historyAvailable
      ? `Fill '${this.history.owner}/${this.history.name}/${this.history.branch}'`
      : 'History unavailable';
  }

  get history(): { owner: string; branch: string; name: string } {
    const owner = localStorage.getItem('last-owner');
    const name = localStorage.getItem('last-name');
    const branch = localStorage.getItem('last-branch');
    return { owner, branch, name };
  }

  ngOnInit() {
    const repository = { ...this.route.snapshot.data.repository };

    repository.branch = !repository.branch ? 'master' : repository.branch;

    this.repoForm = this.formBuilder.group({
      owner: new FormControl(repository.owner, [Validators.required]),
      name: new FormControl(repository.name, [Validators.required]),
      branch: new FormControl(repository.branch, [Validators.required])
    });
  }

  submit() {
    this.loading = true;
    this.routingFailed = undefined;
    const value = this.repoForm.getRawValue();

    Object.entries(value).forEach(([key, val]) =>
      localStorage.setItem(`last-${key}`, val.toString())
    );

    this.existenceQuery
      .fetchMapped({
        ...value
      })
      .subscribe(({ error, exists }) => {
        if (!exists) {
          this.routingFailed = error;
          this.loading = false;
        } else {
          this.router.navigate(['/view'], { queryParams: { ...value } });
        }
      });
  }

  setLastValues() {
    this.repoForm.setValue({
      ...this.history
    });
  }
}
