import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { LoadingInterceptor } from '@core/loading.interceptor';
import { SharedModule } from '@shared/shared.module';

import { CoreRoutingModule } from './core-routing.module';
import { DragSizerComponent } from './drag-sizer/drag-sizer.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [NavComponent, DragSizerComponent],
  imports: [CommonModule, CoreRoutingModule, AuthModule.forRoot(), SharedModule, LayoutModule],
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
