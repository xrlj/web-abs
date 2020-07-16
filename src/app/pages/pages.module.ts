import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PagesRoutingModule} from './pages-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './login/login.component';
import {ThemeModule} from '../theme/theme.module';
import {InitComponent} from './init/init.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  declarations: [DashboardComponent, NotFoundComponent, WelcomeComponent, LoginComponent, InitComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    NgxEchartsModule,
    ThemeModule
  ]
})
export class PagesModule {}
