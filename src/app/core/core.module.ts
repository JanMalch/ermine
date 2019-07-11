import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MaterialModule } from '@material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '@shared/shared.module';
import { DragSizerComponent } from './drag-sizer/drag-sizer.component';
import { LoadingInterceptor } from '@core/loading.interceptor';

@NgModule({
  declarations: [NavComponent, DragSizerComponent],
  imports: [CommonModule, CoreRoutingModule, MaterialModule, LayoutModule, SharedModule],
  exports: [HttpClientModule, RouterModule, NavComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
