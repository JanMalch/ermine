import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-renderer[text][language]',
  template: `
    <pre
      prism
      [text]="text"
      [oid]="oid"
      [cacheEnabled]="!isLargeFile"
      [language]="language"
      [codeEl]="codeEl"
      class="line-numbers"
    ><code #codeEl></code></pre>
  `,
  styles: [
    `
      :host {
        flex: 1;
        background: #282b2e;
        overflow: auto;
      }
    `
  ]
})
export class CodeRendererComponent {
  @Input() oid: string;
  @Input() text: string;
  @Input() language: string;
  @Input() isLargeFile: boolean;
}
