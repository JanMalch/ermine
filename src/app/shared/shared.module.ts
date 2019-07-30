import { NgModule } from '@angular/core';
import { MaterialModule } from '@material/material.module';
import { NgxSendTemplatesModule } from 'ngx-send-templates';

@NgModule({
  exports: [NgxSendTemplatesModule, MaterialModule]
})
export class SharedModule {}
