import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { isHandset } from '@core/responsive';
import { determineHandler, File } from '@graphql/file-oid.query';
import { prismLanguages } from '@prism/prism.languages';
import { LanguageSelectionComponent } from '@view/file-viewer/file-footer/language-selection/language-selection.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-file-footer[file]',
  templateUrl: './file-footer.component.html',
  styleUrls: ['./file-footer.component.scss']
})
export class FileFooterComponent implements OnInit {
  @Input() file: File;
  @Output() languageChanged = new EventEmitter();

  readonly languages = [...prismLanguages].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  readonly isHandset$ = isHandset(this.breakpointObserver);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  get copyContent(): string {
    const { owner, name, branch, path } = this.file.repository;
    return `https://ermine.netlify.com/view?url=${owner}/${name}/blob/${branch}/${path}`;
  }

  get githubLink(): string {
    const { owner, name, branch, path } = this.file.repository;
    return `https://github.com/${owner}/${name}/blob/${branch}/${path}`;
  }

  get rawContentLink(): string {
    const { owner, name, branch, path } = this.file.repository;
    return `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${path}`;
  }

  ngOnInit() {}

  setLanguage(id: string) {
    this.file.language = this.languages.find(lang => lang.id === id);
    this.file.handler = determineHandler(id);
    this.languageChanged.emit();
  }

  copySnack(result: { isSuccess: boolean; content: string }) {
    console.log('result:', result);
    if (result.isSuccess) {
      const snackRef = this.matSnackBar.open('Successfully copied link', 'OPEN NOW', {
        duration: 3500
      });
      snackRef.onAction().subscribe(() => window.open(result.content, '_blank'));
    } else {
      this.matSnackBar.open('Failed to copy link', null, { duration: 1500 });
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(LanguageSelectionComponent, {
      width: '350px',
      maxWidth: '85vw',
      data: this.file
    });
    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(langId => this.setLanguage(langId));
  }
}
