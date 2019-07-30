import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  closeDrawer$ = new Subject();
  private readonly renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // tslint:disable-next-line:variable-name
  private _navWidth = 300;

  get navWidth(): number {
    return this._navWidth;
  }

  set navWidth(value: number) {
    this._navWidth = value;
    this.updateTabHeader();
  }

  updateTabHeader() {
    const fileTabEl = document.querySelector('.mat-tab-header');
    if (!fileTabEl) {
      return;
    }

    this.renderer.setStyle(
      fileTabEl,
      'width',
      `calc(100vw - ${this._navWidth}px - 88px - 32px - 5 * 40px)`
    );
  }
}
