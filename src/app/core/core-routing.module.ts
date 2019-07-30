import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './../home/home.module#HomeModule'
  },
  {
    path: 'about',
    loadChildren: './../about/about.module#AboutModule'
  },
  {
    path: 'login',
    loadChildren: './../login/login.module#LoginModule'
  },
  {
    path: 'select',
    loadChildren: './../select/select.module#SelectModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'view',
    loadChildren: './../view/view.module#ViewModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
