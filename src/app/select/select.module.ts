import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectRoutingModule } from './select-routing.module';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { SharedModule } from '@shared/shared.module';
import { BranchSelectorComponent } from './branch-selector/branch-selector.component';
import { SelectFormComponent } from './select-form/select-form.component';

@NgModule({
  declarations: [SelectComponent, BranchSelectorComponent, SelectFormComponent],
  imports: [
    CommonModule,
    SelectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class SelectModule {}
