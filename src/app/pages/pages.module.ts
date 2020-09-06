import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';

import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import { InitComponent } from './init/init.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {RegisterComponent} from './register/register.component';
import {NzBackTopModule, NzButtonModule, NzCardModule, NzDividerModule, NzFormModule, NzIconModule, NzInputModule, NzModalModule, NzResultModule, NzSelectModule, NzSpinModule, NzStepsModule, NzTableModule, NzUploadModule} from 'ng-zorro-antd';
import { VerifyComponent } from './verify/verify.component';
import { VerifyEtpComponent } from './verify/verify-etp/verify-etp.component';
import { VerifyPersonalComponent } from './verify/verify-personal/verify-personal.component';

@NgModule({
  declarations: [DashboardComponent, LoginComponent, InitComponent, NotFoundComponent, RegisterComponent, VerifyComponent, VerifyEtpComponent, VerifyPersonalComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PagesRoutingModule,
        ThemeModule,
        NgxEchartsModule,
        NzButtonModule,
        NzUploadModule,
        NzStepsModule,
        NzFormModule,
        NzResultModule,
        NzBackTopModule,
        NzCardModule,
        NzSpinModule,
        NzInputModule,
        NzTableModule,
        NzDividerModule,
        NzModalModule,
        NzIconModule,
        NzSelectModule
    ]
})
export class PagesModule {}
