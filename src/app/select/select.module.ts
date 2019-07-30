import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BranchSelectorComponent } from './branch-selector/branch-selector.component';
import { SelectFormComponent } from './select-form/select-form.component';

import { SelectRoutingModule } from './select-routing.module';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [SelectComponent, BranchSelectorComponent, SelectFormComponent],
  imports: [CommonModule, SelectRoutingModule, FormsModule, ReactiveFormsModule, SharedModule]
})
export class SelectModule {}
