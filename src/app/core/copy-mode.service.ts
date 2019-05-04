import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CopyModeService {
  private copyTrapEnabled = new BehaviorSubject<boolean>(true);
  private readonly renderer: Renderer2;
  private readonly enableMessage =
    'Selection trap has been enabled. You can only select code now.';
  private readonly disableMessage =
    'Selection trap has been disabled. You can select everything now.';

  get copyTrapEnabled$(): Observable<boolean> {
    return this.copyTrapEnabled.asObservable();
  }

  constructor(private snackBar: MatSnackBar, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.copyTrapEnabled.pipe(skip(1)).subscribe(enabled => {
      this.snackBar.open(enabled ? this.enableMessage : this.disableMessage, null, {
        duration: 2500
      });
      if (enabled) {
        this.renderer.addClass(document.body, 'selection-trap');
      } else {
        this.renderer.removeClass(document.body, 'selection-trap');
      }
    });
  }

  toggle() {
    this.copyTrapEnabled.next(!this.copyTrapEnabled.getValue());
  }
}
