import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BranchQuery } from '@graphql/branches.query';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, startWith, tap } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-branch-selector',
  templateUrl: './branch-selector.component.html',
  styleUrls: ['./branch-selector.component.scss']
})
export class BranchSelectorComponent implements OnInit {
  @Input() formGroup: FormGroup;

  fetching = false;
  options$ = new BehaviorSubject<string[]>(['master']);
  filteredOptions$: Observable<string[]>;

  @ViewChild('branchInput', { read: MatAutocompleteTrigger })
  branchInputEl: MatAutocompleteTrigger;

  constructor(private branchQuery: BranchQuery) {}

  ngOnInit() {
    this.fetchBranches(false);

    this.filteredOptions$ = combineLatest(
      this.formGroup.get(['branch']).valueChanges.pipe(startWith('')),
      this.options$
    ).pipe(map(([input, branches]) => this.filter(branches, input)));
  }

  fetchBranches(openAfterwards: boolean = true) {
    const { owner, name, branch } = this.formGroup.getRawValue();

    if (!!owner && !!name) {
      this.fetching = true;
      this.branchQuery
        .fetchMapped({ owner, name })
        .pipe(catchError(() => of(['(Repository not found)'])))
        .subscribe(branches => {
          this.fetching = false;
          this.options$.next(branches);

          if (openAfterwards) {
            this.branchInputEl.openPanel();
          }
        });
    }
  }

  private filter(array: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return array.filter(option => option.toLowerCase().includes(filterValue));
  }
}
