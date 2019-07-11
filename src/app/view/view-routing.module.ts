import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '@view/view/view.component';
import { WellFormingGuard } from '@view/well-forming.guard';
import { RepositoryResolver } from '@view/repository.resolver';
import { RepositoryExistsGuard } from '@view/repository-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent,
    canActivate: [WellFormingGuard, RepositoryExistsGuard],
    resolve: { repository: RepositoryResolver }
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
export class ViewRoutingModule {}
