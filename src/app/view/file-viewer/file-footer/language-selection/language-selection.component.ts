import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { File } from '@graphql/file-oid.query';
import { PrismLanguage } from '@prism/prism.languages';
import {
  languageLetterGroups,
  LetterGroup,
  totalLanguageCount
} from '@prism/prism.languages-util';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit, OnDestroy {
  readonly selectedLang = this.activeFile.language.id; // this.getActiveFile().language;
  readonly languageCount = totalLanguageCount;
  readonly filterText = new FormControl();
  readonly filteredLanguages$ = new BehaviorSubject<LetterGroup[]>(undefined);
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<LanguageSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public activeFile: File
  ) {}

  ngOnInit() {
    this.filterText.valueChanges
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(150),
        startWith(''),
        map(val => this.filter(val))
      )
      .subscribe(value => this.filteredLanguages$.next(value));
  }

  filter(text: string): LetterGroup[] {
    if (text === '') {
      return languageLetterGroups;
    }

    return languageLetterGroups.reduce((acc, curr) => {
      const filteredLangs = curr.languages.filter(lang => this.fits(lang.name, text));

      if (filteredLangs.length > 0) {
        acc.push({
          letter: curr.letter,
          languages: filteredLangs
        });
      }

      return acc;
    }, []);
  }

  onEnter() {
    const group = this.filteredLanguages$.getValue()[0];
    const lang = group && group.languages[0];
    this.setLanguage(lang && lang.id);
  }

  setLanguage(language: string) {
    this.dialogRef.close(language);
  }

  trackByLangFn(index: number, item: PrismLanguage) {
    return item.id;
  }

  trackByGroupFn(index: number, item: LetterGroup) {
    return item.letter;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private readonly fits = (a: string, b: string) => a.toLowerCase().includes(b.toLowerCase());
}
