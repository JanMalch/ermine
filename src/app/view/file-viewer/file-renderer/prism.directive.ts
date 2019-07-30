import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { highlightAllUnder } from '@prism/prism.languages-util';
import { Collapser } from '@view/file-viewer/file-renderer/collapser';
import { RenderCacheService } from '@view/file-viewer/file-renderer/render-cache.service';
import { combineLatest, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: '[prism]' // tslint:disable-line:directive-selector
})
export class PrismDirective implements OnInit {
  @Input() oid: string;
  @Input() codeEl: HTMLElement;
  @Input() cacheEnabled: boolean;
  private readonly el: HTMLElement;
  private text$ = new Subject<string>();
  private language$ = new Subject<string>();
  private currentLang: string;
  private collapser: Collapser;

  constructor(
    elRef: ElementRef,
    private renderer: Renderer2,
    private renderCache: RenderCacheService
  ) {
    this.el = elRef.nativeElement;

    combineLatest(
      this.text$.pipe(distinctUntilChanged()),
      this.language$.pipe(distinctUntilChanged())
    )
      .pipe(debounceTime(50))
      .subscribe(([code, language]) => this.highlight(code, language));
  }

  @Input('text') set text(val: string) {
    this.text$.next(val);
  }

  @Input('language') set language(val: string) {
    this.language$.next(val);
  }

  ngOnInit(): void {
    this.collapser = new Collapser(this.codeEl);
  }

  private highlight(code: string, language: string = 'plain') {
    if (!!this.collapser) {
      this.collapser.ngOnDestroy();
    }

    this.renderer.removeClass(this.el, this.currentLang);
    this.renderer.removeClass(this.codeEl, this.currentLang);

    this.currentLang = `language-${language}`;
    this.renderer.addClass(this.el, this.currentLang);

    if (this.renderCache.hasRendered(this.oid, language)) {
      this.renderer.setProperty(
        this.codeEl,
        'innerHTML',
        this.renderCache.getRendered(this.oid, language)
      );
      this.renderer.addClass(this.codeEl, this.currentLang);
    } else {
      this.renderer.setProperty(this.codeEl, 'textContent', code);
      highlightAllUnder(this.el);
      if (this.cacheEnabled) {
        const html = this.codeEl.innerHTML;
        this.renderCache.setRendered(this.oid, language, html);
      }
    }

    this.collapser = new Collapser(this.codeEl);
    this.collapser.ngOnInit();
  }
}
