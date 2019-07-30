import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectComponent } from '@select/select/select.component';
import { RepositoryResolver } from '@view/repository.resolver';

const routes: Routes = [
  {
    path: '',
    component: SelectComponent,
    resolve: {
      repository: RepositoryResolver
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectRoutingModule {}
