import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginChoiceComponent } from './login-choice/login-choice.component';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [LoginComponent, LoginChoiceComponent],
  imports: [CommonModule, LoginRoutingModule, MaterialModule, SharedModule]
})
export class LoginModule {}
