import { Component, Input } from '@angular/core';
import * as csv from 'csvtojson';

@Component({
  selector: 'app-csv',
  template: `
    <table class="pretty mat-elevation-z2">
      <thead>
        <tr>
          <th *ngFor="let header of headers">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data">
          <td *ngFor="let cell of row">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: calc(100% - 32px);
        margin: 16px;
      }
    `
  ]
})
export class CsvComponent {
  headers: string[] = [];
  data: string[][] = [];

  @Input() set text(val: string) {
    csv({
      delimiter: 'auto',
      output: 'csv',
      noheader: true
    })
      .fromString(val)
      .then(rows => {
        // tslint:disable-next-line:variable-name
        const [_headers, ..._data] = rows;
        this.headers = _headers || [];
        this.data = _data;
      });
  }
}
