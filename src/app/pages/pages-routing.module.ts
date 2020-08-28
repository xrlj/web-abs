import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BlankComponent, DefaultComponent} from '../theme/layouts';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {InitComponent} from './init/init.component';
import {RegisterComponent} from './register/register.component';
import {VerifyComponent} from './verify/verify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'init', component: InitComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'register/:code', component: RegisterComponent }
    ]
  },
  {
    path: 'pages',
    component: DefaultComponent,
    children: [
      {
        path: '',
        loadChildren: () =>import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user-centre',
        loadChildren: () =>import('./user-centre/user-centre.module').then(m => m.UserCentreModule)
      }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
