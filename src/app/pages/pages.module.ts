import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';

import {NgZorroAntdModule} from 'ng-zorro-antd';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [DashboardComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NgZorroAntdModule,
    PagesRoutingModule,
    ThemeModule,
    NgxEchartsModule,
    NzInputModule
  ]
})
export class PagesModule {}
