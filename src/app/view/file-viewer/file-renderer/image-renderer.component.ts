import { Component, Input, OnInit } from '@angular/core';
import { Repository } from '@core/models';

@Component({
  selector: 'app-image-renderer[repository]',
  template: `
    <img
      [src]="imageSrc"
      (load)="imageLoaded = true"
      [hidden]="!imageLoaded"
      [alt]="repository.path"
    />
    <div class="image-loader" [hidden]="imageLoaded">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 64px;
      }
      img {
        background-color: #fafafa;
        object-fit: contain;
      }

      .image-loader:not([hidden]) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `
  ]
})
export class ImageRendererComponent implements OnInit {
  @Input() repository: Repository;

  imageLoaded = false;

  constructor() {}

  get imageSrc(): string {
    // tslint:disable-next-line:max-line-length
    return `https://raw.githubusercontent.com/${this.repository.owner}/${
      this.repository.name
    }/${this.repository.branch}/${this.repository.path}`;
  }

  ngOnInit() {}
}
