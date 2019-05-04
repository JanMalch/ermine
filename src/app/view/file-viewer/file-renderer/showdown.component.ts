import { Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { ShowdownConverter } from 'ngx-showdown';
import { highlightAllUnder } from '@prism/prism.languages-util';

@Component({
  selector: 'app-showdown',
  template: '',
  styleUrls: ['showdown.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShowdownComponent {
  private readonly el: HTMLElement;

  @Input() set text(val: string) {
    const html = this.showdown.makeHtml(val);
    this.renderer.setProperty(this.el, 'innerHTML', html);
    this.highlight();
  }

  constructor(
    elRef: ElementRef,
    private renderer: Renderer2,
    private showdown: ShowdownConverter
  ) {
    this.el = elRef.nativeElement;
  }

  private highlight() {
    Array.from(this.el.querySelectorAll('code[class*="language-"]')).forEach(
      ({ parentElement }) => this.renderer.addClass(parentElement, 'line-numbers')
    );

    Array.from(this.el.querySelectorAll('table')).forEach(el =>
      this.renderer.addClass(el, 'mat-elevation-z2')
    );

    highlightAllUnder(this.el);
  }
}
