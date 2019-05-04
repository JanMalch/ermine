import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScrollIntoView]'
})
export class ScrollIntoViewDirective implements AfterViewInit {
  @Input() appScrollIntoView: boolean;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (this.appScrollIntoView) {
      this.el.nativeElement.scrollIntoView();
    }
  }
}
