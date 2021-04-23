import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEchartsModule} from 'ngx-echarts';

import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../theme/theme.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {InitComponent} from './init/init.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RegisterComponent} from './register/register.component';
import {VerifyComponent} from './verify/verify.component';
import {VerifyEtpComponent} from './verify/verify-etp/verify-etp.component';
import {VerifyPersonalComponent} from './verify/verify-personal/verify-personal.component';
import {DirectivesModule} from '../directives/directives.module';
import {VerifyHeaderComponent} from './verify/verify-header/verify-header.component';
import {ComponentsModule} from '../components/components.module';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzBackTopModule} from 'ng-zorro-antd/back-top';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [DashboardComponent, LoginComponent, InitComponent,
    NotFoundComponent, RegisterComponent, VerifyComponent,
    VerifyEtpComponent, VerifyPersonalComponent, VerifyHeaderComponent],
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
    NzSelectModule,
    NzAutocompleteModule,
    NzInputNumberModule,
    NzCheckboxModule,
    NzToolTipModule,
    DirectivesModule,
    ComponentsModule
  ]
})
export class PagesModule {}
