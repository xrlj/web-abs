import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BlankComponent, DefaultComponent} from '../theme/layouts';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {InitComponent} from './init/init.component';
import {RegisterComponent} from './register/register.component';
import {VerifyComponent} from './verify/verify.component';
import {PdfShowComponent} from '../components/pdf-show/pdf-show.component';
import {LoginGuardGuard} from '../helpers/router/login-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'init', component: InitComponent },
      { path: 'verify', component: VerifyComponent },
      { path: 'register/:code', component: RegisterComponent },
      {
        path: 'pdf-show',
        component: PdfShowComponent,
        canActivate: [LoginGuardGuard]
      }
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
      },
      {
        path: 'business',
        loadChildren: () => import('./business/business.module').then(m => m.BusinessModule)
      },
      {
        path: 'etp-centre',
        loadChildren: () => import('./etp-centre/etp-centre.module').then(m => m.EtpCentreModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule)
      }
    ]
  },
  /*{
    path: '**',
    component: NotFoundComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
