import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';

import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import { RegisteComponent } from './registe/registe.component';

@NgModule({
  declarations: [DashboardComponent, LoginComponent, RegisteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    PagesRoutingModule,
    ThemeModule,
    NgxEchartsModule
  ]
})
export class PagesModule {}
